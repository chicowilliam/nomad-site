import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

// Run `npm run build && npm run preview -- --port 4173` first.
// BASE_URL, CHROMIUM_PATH and SCREENSHOTS=false can override the defaults.
const baseURL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const screenshots = process.env.SCREENSHOTS !== 'false';
const reviewDirectory = fileURLToPath(new URL('../.impeccable/review/', import.meta.url));
const results = [];
const browserErrors = [];
const viewports = [
  [360, 640], [375, 812], [390, 844], [430, 932],
  [768, 1024], [1024, 768], [1440, 900], [1920, 1080],
];
const screenshotNames = new Map([
  [390, 'mobile'], [430, 'mobile-430'], [1440, 'desktop'], [1920, 'desktop-1920'],
]);

async function check(name, run) {
  try {
    const details = await run();
    results.push({ name, passed: true, ...(details ? { details } : {}) });
    console.log(`PASS ${name}`);
  } catch (error) {
    results.push({ name, passed: false, error: error.message });
    console.error(`FAIL ${name}: ${error.message}`);
  }
}

function observeErrors(page, label) {
  page.on('pageerror', error => browserErrors.push(`${label}: ${error.message}`));
  page.on('console', message => {
    if (message.type() === 'error') browserErrors.push(`${label}: ${message.text()}`);
  });
  page.on('response', response => {
    if (response.status() >= 400) browserErrors.push(`${label}: HTTP ${response.status()} ${response.url()}`);
  });
}

async function open(page) {
  const response = await page.goto(baseURL, { waitUntil: 'networkidle' });
  assert.equal(response.status(), 200, 'The preview must return HTTP 200');
  await page.locator('h1').waitFor();
  await page.evaluate(() => document.fonts.ready);
}

async function revealPage(page) {
  await page.evaluate(async () => {
    const step = Math.round(innerHeight * 0.65);
    for (let position = 0; position < document.documentElement.scrollHeight; position += step) {
      scrollTo({ top: position, behavior: 'instant' });
      await new Promise(resolve => setTimeout(resolve, 60));
    }
    // A broken reveal can leave a lazy image permanently outside the viewport;
    // decoding must not hang the gate before it can report the actual failure.
    await Promise.race([
      Promise.all([...document.images].map(image => image.decode().catch(() => {}))),
      new Promise(resolve => setTimeout(resolve, 4000)),
    ]);
    scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
}

await mkdir(reviewDirectory, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

try {
  for (const [width, height] of viewports) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
    const page = await context.newPage();
    observeErrors(page, `${width}×${height}`);
    await check(`Layout, assets and semantics at ${width}×${height}`, async () => {
      await open(page);
      await revealPage(page);
      const audit = await page.evaluate(() => ({
        width: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        h1Count: document.querySelectorAll('h1').length,
        clippedHeroText: [...document.querySelectorAll('.hero h1 > span')].flatMap(element => {
          const range = document.createRange();
          range.selectNodeContents(element);
          return [...range.getClientRects()]
            .filter(rect => rect.left < -1 || rect.right > innerWidth + 1)
            .map(rect => ({ text: element.textContent, left: rect.left, right: rect.right, viewport: innerWidth }));
        }),
        lang: document.documentElement.lang,
        missingTargets: [...document.querySelectorAll('a[href^="#"]')]
          .map(anchor => anchor.getAttribute('href'))
          .filter(href => href.length < 2 || !document.getElementById(decodeURIComponent(href.slice(1)))),
        brokenImages: [...document.images].filter(image => !image.complete || !image.naturalWidth).map(image => image.src),
        hiddenReducedMotionContent: [...document.querySelectorAll('[data-reveal]')]
          .filter(element => {
            const style = getComputedStyle(element);
            return Number(style.opacity) < 0.9 || style.visibility !== 'visible' || /100%/.test(style.clipPath);
          }).map(element => element.id || element.className),
      }));
      assert.ok(audit.scrollWidth <= audit.width + 1, `Horizontal overflow: ${audit.scrollWidth}px > ${audit.width}px`);
      assert.equal(audit.h1Count, 1, 'Exactly one h1 is required');
      assert.deepEqual(audit.clippedHeroText, [], 'Hero headline glyphs must remain within the viewport, even inside clipped containers');
      assert.ok(audit.lang.startsWith('pt'), 'The language must be Portuguese');
      assert.deepEqual(audit.missingTargets, [], 'Every local link must have a target');
      assert.deepEqual(audit.brokenImages, [], 'All images must load');
      assert.deepEqual(audit.hiddenReducedMotionContent, [], 'Reduced motion must preserve all content');
      return { width: audit.width, scrollWidth: audit.scrollWidth, imagesLoaded: await page.locator('img').count() };
    });
    const filename = screenshotNames.get(width);
    if (screenshots && filename) {
      await check(`Screenshots ${filename}`, async () => {
        await page.screenshot({ path: `${reviewDirectory}${filename}.png`, fullPage: true, animations: 'disabled' });
        await page.screenshot({ path: `${reviewDirectory}${filename}-hero.png`, animations: 'disabled' });
        if (width === 390 || width === 1440) {
          await page.locator('.testimonials').screenshot({ path: `${reviewDirectory}${filename}-testimonial-empty.png`, animations: 'disabled' });
        }
      });
    }
    await context.close();
  }

  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const mobile = await mobileContext.newPage();
  observeErrors(mobile, 'Mobile interactions');
  await open(mobile);
  await check('Mobile menu: keyboard open, focus trap, Escape and focus return', async () => {
    const trigger = mobile.getByRole('button', { name: 'Abrir menu' });
    await trigger.focus();
    await mobile.keyboard.press('Enter');
    await mobile.waitForFunction(() => document.querySelector('#mobile-menu').open);
    assert.equal(await trigger.getAttribute('aria-expanded'), 'true');
    for (let index = 0; index < 12; index++) {
      await mobile.keyboard.press('Tab');
      assert.ok(await mobile.evaluate(() => document.querySelector('#mobile-menu').contains(document.activeElement)), 'Focus must stay inside the modal menu');
    }
    for (let index = 0; index < 7; index++) {
      await mobile.keyboard.press('Shift+Tab');
      assert.ok(await mobile.evaluate(() => document.querySelector('#mobile-menu').contains(document.activeElement)), 'Reverse focus must stay inside the modal menu');
    }
    await mobile.keyboard.press('Escape');
    await mobile.waitForFunction(() => !document.querySelector('#mobile-menu').open);
    assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
    assert.ok(await trigger.evaluate(element => element === document.activeElement), 'Focus must return to the menu trigger');
  });
  await check('Mobile menu: section navigation closes the dialog', async () => {
    await mobile.getByRole('button', { name: 'Abrir menu' }).click();
    await mobile.locator('#mobile-menu').getByRole('link', { name: /Soluções/ }).click();
    await mobile.waitForFunction(() => !document.querySelector('#mobile-menu').open);
    assert.equal(new URL(mobile.url()).hash, '#solucoes');
    assert.ok(await mobile.evaluate(() => Math.abs(document.querySelector('#solucoes').getBoundingClientRect().top) < 100));
  });

  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce', acceptDownloads: true });
  const page = await desktopContext.newPage();
  observeErrors(page, 'Desktop interactions');
  await open(page);
  await check('All four solution disclosures support Enter and Space', async () => {
    const buttons = page.locator('.service-trigger');
    assert.equal(await buttons.count(), 4);
    for (const button of await buttons.all()) {
      if (await button.getAttribute('aria-expanded') === 'true') await button.click();
      await button.focus();
      await page.keyboard.press('Enter');
      assert.equal(await button.getAttribute('aria-expanded'), 'true');
      const id = await button.getAttribute('aria-controls');
      assert.ok(await page.locator(`#${id}`).isVisible());
      await page.keyboard.press('Space');
      assert.equal(await button.getAttribute('aria-expanded'), 'false');
      assert.equal(await page.locator(`#${id}`).isVisible(), false);
    }
  });
  await check('Order demo progresses through all four steps and can run again', async () => {
    await page.getByRole('button', { name: 'Simular um pedido' }).click();
    assert.equal(await page.locator('.demo-button').isDisabled(), true);
    for (let completed = 1; completed <= 4; completed++) {
      await page.waitForFunction(count => [...document.querySelectorAll('.flow-state')]
        .filter(state => state.textContent === 'CONCLUÍDO').length >= count, completed);
    }
    assert.equal(await page.locator('.flow-active').count(), 4);
    assert.equal(await page.locator('.operation-foot [role="status"]').textContent(), 'MENOS TRABALHO MANUAL.');
    const retry = page.getByRole('button', { name: 'Simular novamente' });
    assert.ok(await retry.isEnabled());
    await retry.click();
    await page.waitForFunction(() => document.querySelectorAll('.flow-active').length === 1);
    await page.getByRole('button', { name: 'Simular novamente' }).waitFor();
  });
  await check('Three case studies disclose objectives and concept disclaimer by keyboard', async () => {
    const details = page.locator('.case-details');
    assert.equal(await details.count(), 3);
    for (const detail of await details.all()) {
      await detail.locator('summary').focus();
      await page.keyboard.press('Enter');
      assert.ok(await detail.getAttribute('open') !== null);
      assert.ok(await detail.locator('.case-disclaimer').isVisible());
      assert.match(await detail.textContent(), /Não representa um cliente ou resultado real/);
      await page.keyboard.press('Enter');
      assert.equal(await detail.getAttribute('open'), null);
    }
  });
  await check('Contact CTA opens the briefing and moves keyboard focus into it', async () => {
    const cta = page.getByRole('button', { name: 'Começar um projeto' });
    assert.equal(await page.locator('#briefing').isVisible(), false);
    await cta.click();
    await page.waitForFunction(() => document.activeElement?.getAttribute('name') === 'name');
    assert.equal(await cta.getAttribute('aria-expanded'), 'true');
    assert.ok(await page.locator('#briefing').isVisible());
  });
  await check('Briefing validates required fields and e-mail, then downloads an honest TXT without sending data', async () => {
    const form = page.locator('#briefing form');
    const submit = form.getByRole('button', { name: 'Salvar briefing' });
    await submit.click();
    assert.equal(await form.evaluate(element => element.checkValidity()), false);
    assert.equal(await form.locator(':invalid').count(), 3);
    await form.locator('[name="name"]').fill('Pessoa de Teste');
    await form.locator('[name="company"]').fill('Empresa Demonstração');
    await form.locator('[name="email"]').fill('email-invalido');
    await form.locator('[name="challenge"]').fill('Centralizar pedidos e reduzir trabalho manual.');
    assert.equal(await form.locator('[name="email"]').evaluate(element => element.validity.typeMismatch), true);
    await form.locator('[name="email"]').fill('teste@example.com');
    await form.locator('[name="service"]').selectOption('operacao');
    assert.equal(await form.evaluate(element => element.checkValidity()), true);
    const submissions = [];
    const onRequest = request => { if (request.method() === 'POST') submissions.push(request.url()); };
    page.on('request', onRequest);
    const downloadPromise = page.waitForEvent('download');
    await submit.click();
    const download = await downloadPromise;
    assert.equal(download.suggestedFilename(), 'nomad-briefing.txt');
    const content = await readFile(await download.path(), 'utf8');
    assert.match(content, /Nome: Pessoa de Teste/);
    assert.match(content, /E-mail: teste@example.com/);
    assert.match(content, /Solução: Sistemas sob medida/);
    assert.match(content, /Centralizar pedidos e reduzir trabalho manual/);
    assert.match(await form.locator('[role="status"]').textContent(), /Nenhum dado foi enviado/);
    assert.deepEqual(submissions, [], 'Download fallback must not send private briefing data');
    page.off('request', onRequest);
  });
  await mobileContext.close();
  await desktopContext.close();

  const motionContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
  const motionPage = await motionContext.newPage();
  observeErrors(motionPage, 'Scroll motion');
  await check('Normal motion reveals every section after scrolling', async () => {
    await open(motionPage);
    await revealPage(motionPage);
    const hidden = await motionPage.locator('[data-reveal].will-reveal:not(.is-visible)').evaluateAll(elements => elements.map(element => element.id || element.className));
    assert.deepEqual(hidden, [], 'Scroll reveals must not strand content offscreen');
    const brokenImages = await motionPage.locator('img').evaluateAll(images => images.filter(image => !image.complete || !image.naturalWidth).map(image => image.src));
    assert.deepEqual(brokenImages, [], 'Motion must not prevent lazy images from loading');
  });
  await motionContext.close();
  await check('No browser console errors, page errors or failed HTTP assets', () => assert.deepEqual([...new Set(browserErrors)], []));
} finally {
  await browser.close();
  const report = { baseURL, date: new Date().toISOString(), results, browserErrors, passed: results.every(result => result.passed) };
  await writeFile(`${reviewDirectory}validation.json`, JSON.stringify(report, null, 2));
  const failed = results.filter(result => !result.passed);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed. Report: ${reviewDirectory}validation.json`);
  if (failed.length) process.exitCode = 1;
}
