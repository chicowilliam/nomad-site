import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
const baseURL = process.env.BASE_URL || "http://127.0.0.1:4173";
const directory = ".impeccable/review/dark";
await mkdir(directory, { recursive: true });
const results = [],
  errors = [];
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
async function check(name, action) {
  try {
    await action();
    results.push({ name, passed: true });
    console.log(`PASS ${name}`);
  } catch (error) {
    results.push({ name, passed: false, error: error.message });
    console.error(`FAIL ${name}: ${error.message}`);
  }
}
function observe(page) {
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type()))
      errors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
}
async function open(page) {
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
}
async function scrollPage(page) {
  await page.evaluate(async () => {
    for (
      let y = 0;
      y < document.documentElement.scrollHeight;
      y += innerHeight * 0.7
    ) {
      scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 60));
    }
    await Promise.all([...document.images].map((image) => image.decode()));
    scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(800);
}
try {
  for (const [width, height] of [
    [360, 800],
    [390, 844],
    [430, 932],
    [768, 1024],
    [1440, 900],
    [1920, 1080],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    observe(page);
    await check(
      `Responsive layout, content, assets and fonts ${width}×${height}`,
      async () => {
        await open(page);
        await scrollPage(page);
        const audit = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth,
          h1: document.querySelectorAll("h1").length,
          headline: document.querySelector("h1").textContent,
          font: getComputedStyle(document.querySelector("h1")).fontFamily,
          fontsReady:
            document.fonts.check('16px "Instrument Serif"') &&
            document.fonts.check('italic 16px "Instrument Serif"'),
          broken: [...document.images]
            .filter((i) => !i.complete || !i.naturalWidth)
            .map((i) => i.src),
          badLinks: [...document.querySelectorAll('a[href^="#"]')]
            .filter(
              (a) => !document.getElementById(a.getAttribute("href").slice(1)),
            )
            .map((a) => a.getAttribute("href")),
          clipped: [
            ...document.querySelectorAll("h1,h2,h3,.header-contact"),
          ].flatMap((e) => {
            const r = document.createRange();
            r.selectNodeContents(e);
            return [...r.getClientRects()]
              .filter((rect) => rect.left < -1 || rect.right > innerWidth + 1)
              .map(() => e.textContent);
          }),
        }));
        assert.equal(audit.overflow, false);
        assert.equal(audit.h1, 1);
        assert.match(
          audit.headline,
          /Sites, sistemas.*lojas virtuais.*sob medida/,
        );
        assert.match(audit.font, /Instrument Serif/);
        assert.equal(audit.fontsReady, true);
        assert.deepEqual(audit.broken, []);
        assert.deepEqual(audit.badLinks, []);
        assert.deepEqual(audit.clipped, []);
        assert.equal(await page.locator(".service-row").count(), 5);
        assert.ok(await page.locator("#lojas-virtuais p").isVisible());
        assert.match(
          await page.locator("#lojas-virtuais h3").textContent(),
          /Lojas.*virtuais/,
        );
        assert.equal(await page.locator(".pin-spacer").count(), 0);
      },
    );
    if (process.env.SCREENSHOTS !== "false" && width !== 360) {
      await page.screenshot({
        path: `${directory}/${width}-full.png`,
        fullPage: true,
      });
      await page.screenshot({ path: `${directory}/${width}-hero.png` });
      if (width === 390 || width === 1440)
        for (const section of ["about", "services", "work", "contact"])
          await page
            .locator(`.${section}`)
            .screenshot({
              path: `${directory}/${width}-${section}.png`,
              style: ".site-header,.skip-link{visibility:hidden}",
            });
    }
    await context.close();
  }
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  observe(page);
  await open(page);
  await check(
    "Compact mobile header, accessible keyboard and direct WhatsApp",
    async () => {
      assert.equal(await page.locator(".header-inner>nav").isVisible(), false);
      assert.ok(await page.locator(".header-contact").isVisible());
      await page.keyboard.press("Tab");
      assert.equal(
        await page
          .locator(".skip-link")
          .evaluate((e) => e === document.activeElement),
        true,
      );
      await page.keyboard.press("Enter");
      assert.equal(new URL(page.url()).hash, "#conteudo");
      const links = page.locator('a[href^="https://wa.me/"]');
      assert.ok((await links.count()) >= 4);
      for (const link of await links.all()) {
        assert.equal(
          new URL(await link.getAttribute("href")).pathname,
          "/5531994649759",
        );
        assert.equal(await link.getAttribute("target"), "_blank");
        assert.match(await link.getAttribute("rel"), /noreferrer/);
      }
      await context.route("https://wa.me/**", (route) =>
        route.fulfill({
          status: 200,
          contentType: "text/html",
          body: "Navigation verified locally; no message sent.",
        }),
      );
      const popupPromise = page.waitForEvent("popup");
      await page.locator(".hero .button-primary").click();
      const popup = await popupPromise;
      await popup.waitForLoadState();
      assert.ok(new URL(popup.url()).searchParams.get("text"));
      await popup.close();
    },
  );
  await check("Services always readable and honest self-project", async () => {
    assert.equal(await page.locator(".service-row button").count(), 0);
    assert.match(
      await page.locator(".project-category").textContent(),
      /SITE INSTITUCIONAL.*PROJETO PRÓPRIO/,
    );
    assert.equal(await page.locator(".project-case").count(), 1);
    await page.locator(".hero .button-ghost").click();
    await page.waitForTimeout(100);
    assert.equal(new URL(page.url()).hash, "#trabalho");
    assert.ok(
      Math.abs(
        await page
          .locator("#trabalho")
          .evaluate((e) => e.getBoundingClientRect().top),
      ) < 120,
    );
  });
  await context.close();
  const motionContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const motion = await motionContext.newPage();
  observe(motion);
  await open(motion);
  await check(
    "Lenis and ScrollTrigger reveal content without pins",
    async () => {
      await motion.waitForFunction(
        () =>
          document.querySelector("[data-motion]")?.dataset.motion ===
          "gsap-lenis",
      );
      await scrollPage(motion);
      assert.ok(
        await motion
          .locator("html")
          .evaluate((e) => e.classList.contains("lenis")),
      );
      assert.equal(await motion.locator(".pin-spacer").count(), 0);
      const moved = await motion
        .locator('[data-reveal="text"]')
        .evaluateAll((elements) =>
          elements
            .filter(
              (e) =>
                Math.abs(new DOMMatrix(getComputedStyle(e).transform).m42) > 1,
            )
            .map((e) => e.textContent),
        );
      assert.deepEqual(moved, []);
      const clip = await motion
        .locator(".project-image")
        .evaluate((e) => getComputedStyle(e).clipPath);
      assert.ok(
        clip === "inset(0px round 9px)" ||
          clip === "inset(0px)" ||
          clip === "none" ||
          !clip.includes("12%"),
      );
    },
  );
  await check(
    "Resize, reduced-motion cleanup and native scrolling",
    async () => {
      await motion.setViewportSize({ width: 430, height: 932 });
      await motion.emulateMedia({ reducedMotion: "reduce" });
      await motion.waitForTimeout(300);
      assert.equal(
        await motion.locator("[data-motion]").getAttribute("data-motion"),
        "reduced",
      );
      assert.equal(
        await motion
          .locator("html")
          .evaluate((e) => e.classList.contains("lenis")),
        false,
      );
      assert.ok(
        await motion.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      await motion.emulateMedia({ reducedMotion: "no-preference" });
      await motion.setViewportSize({ width: 1440, height: 900 });
      await motion.waitForTimeout(300);
      assert.equal(
        await motion.locator("[data-motion]").getAttribute("data-motion"),
        "gsap-lenis",
      );
    },
  );
  await check(
    "Refresh restores scroll position and links target real sections",
    async () => {
      await motion.goto(`${baseURL}/#trabalho`, { waitUntil: "networkidle" });
      await motion.waitForTimeout(800);
      await motion.evaluate(() =>
        history.replaceState(null, "", location.pathname),
      );
      const before = await motion.evaluate(() => scrollY);
      await motion.reload({ waitUntil: "networkidle" });
      await motion.waitForTimeout(800);
      assert.ok(Math.abs((await motion.evaluate(() => scrollY)) - before) < 5);
      assert.equal(await motion.locator(".pin-spacer").count(), 0);
    },
  );
  await motionContext.close();
  await check("No console errors, warnings or failed assets", () =>
    assert.deepEqual([...new Set(errors)], []),
  );
} finally {
  await browser.close();
  await writeFile(
    `${directory}/validation.json`,
    JSON.stringify(
      { date: new Date().toISOString(), results, errors },
      null,
      2,
    ),
  );
  const failed = results.filter((r) => !r.passed);
  console.log(
    `${results.length - failed.length}/${results.length} checks passed`,
  );
  if (failed.length) process.exitCode = 1;
}
