import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

// Run `npm run build && npm run preview -- --port 4173` first.
// BASE_URL, CHROMIUM_PATH and SCREENSHOTS=false can override the defaults.
const baseURL = process.env.BASE_URL || "http://127.0.0.1:4173";
const screenshots = process.env.SCREENSHOTS !== "false";
const reviewDirectory = fileURLToPath(
  new URL("../.impeccable/review/", import.meta.url),
);
const results = [];
const browserErrors = [];
const viewports = [
  [360, 800],
  [375, 812],
  [390, 844],
  [430, 932],
  [768, 1024],
  [1024, 768],
  [1440, 900],
  [1920, 1080],
];
const screenshotNames = new Map([
  [390, "mobile"],
  [430, "mobile-430"],
  [1440, "desktop"],
  [1920, "desktop-1920"],
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
  page.on("pageerror", (error) =>
    browserErrors.push(`${label}: ${error.message}`),
  );
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type()))
      browserErrors.push(`${label}: ${message.text()}`);
  });
  page.on("response", (response) => {
    if (response.status() >= 400)
      browserErrors.push(
        `${label}: HTTP ${response.status()} ${response.url()}`,
      );
  });
}

async function open(page) {
  const response = await page.goto(baseURL, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200, "The preview must return HTTP 200");
  await page.locator("h1").waitFor();
  await page.evaluate(() => document.fonts.ready);
}

async function revealPage(page) {
  await page.evaluate(async () => {
    const step = Math.round(innerHeight * 0.65);
    for (
      let position = 0;
      position < document.documentElement.scrollHeight;
      position += step
    ) {
      scrollTo({ top: position, behavior: "instant" });
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    // A broken reveal can leave a lazy image permanently outside the viewport;
    // decoding must not hang the gate before it can report the actual failure.
    await Promise.race([
      Promise.all(
        [...document.images].map((image) => image.decode().catch(() => {})),
      ),
      new Promise((resolve) => setTimeout(resolve, 4000)),
    ]);
    scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(1000);
}

await mkdir(reviewDirectory, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  for (const [width, height] of viewports) {
    const context = await browser.newContext({
      viewport: { width, height },
      reducedMotion: "reduce",
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    observeErrors(page, `${width}×${height}`);
    await check(
      `Layout, assets and semantics at ${width}×${height}`,
      async () => {
        await open(page);
        await revealPage(page);
        const audit = await page.evaluate(() => ({
          width: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          h1Count: document.querySelectorAll("h1").length,
          clippedHeroText: [
            ...document.querySelectorAll(
              ".hero h1 > span > span, .display [data-text-line]",
            ),
          ].flatMap((element) => {
            const range = document.createRange();
            range.selectNodeContents(element);
            return [...range.getClientRects()]
              .filter((rect) => rect.left < -1 || rect.right > innerWidth + 1)
              .map((rect) => ({
                text: element.textContent,
                left: rect.left,
                right: rect.right,
                viewport: innerWidth,
              }));
          }),
          lang: document.documentElement.lang,
          missingTargets: [...document.querySelectorAll('a[href^="#"]')]
            .map((anchor) => anchor.getAttribute("href"))
            .filter(
              (href) =>
                href.length < 2 ||
                !document.getElementById(decodeURIComponent(href.slice(1))),
            ),
          brokenImages: [...document.images]
            .filter((image) => !image.complete || !image.naturalWidth)
            .map((image) => image.src),
          hiddenReducedMotionContent: [
            ...document.querySelectorAll("[data-reveal]"),
          ]
            .filter((element) => {
              const style = getComputedStyle(element);
              return (
                Number(style.opacity) < 0.9 ||
                style.visibility !== "visible" ||
                /100%/.test(style.clipPath)
              );
            })
            .map((element) => element.id || element.className),
        }));
        assert.ok(
          audit.scrollWidth <= audit.width + 1,
          `Horizontal overflow: ${audit.scrollWidth}px > ${audit.width}px`,
        );
        assert.equal(audit.h1Count, 1, "Exactly one h1 is required");
        assert.deepEqual(
          audit.clippedHeroText,
          [],
          "Hero headline glyphs must remain within the viewport, even inside clipped containers",
        );
        assert.ok(
          audit.lang.startsWith("pt"),
          "The language must be Portuguese",
        );
        assert.deepEqual(
          audit.missingTargets,
          [],
          "Every local link must have a target",
        );
        assert.deepEqual(audit.brokenImages, [], "All images must load");
        assert.deepEqual(
          audit.hiddenReducedMotionContent,
          [],
          "Reduced motion must preserve all content",
        );
        return {
          width: audit.width,
          scrollWidth: audit.scrollWidth,
          imagesLoaded: await page.locator("img").count(),
        };
      },
    );
    const filename = screenshotNames.get(width);
    if (screenshots && filename) {
      await check(`Screenshots ${filename}`, async () => {
        await page.screenshot({
          path: `${reviewDirectory}${filename}.png`,
          fullPage: true,
          animations: "disabled",
        });
        await page.screenshot({
          path: `${reviewDirectory}${filename}-hero.png`,
          animations: "disabled",
        });
        if (width === 390 || width === 1440) {
          await page.locator(".ecosystem").screenshot({
            path: `${reviewDirectory}${filename}-ecosystem.png`,
            animations: "disabled",
          });
        }
      });
    }
    await context.close();
  }

  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const mobile = await mobileContext.newPage();
  observeErrors(mobile, "Mobile interactions");
  await open(mobile);
  await check(
    "Mobile menu: keyboard open, focus trap, Escape and focus return",
    async () => {
      const trigger = mobile.getByRole("button", { name: "Abrir menu" });
      await trigger.focus();
      await mobile.keyboard.press("Enter");
      await mobile.waitForFunction(
        () => document.querySelector("#mobile-menu").open,
      );
      assert.equal(await trigger.getAttribute("aria-expanded"), "true");
      for (let index = 0; index < 12; index++) {
        await mobile.keyboard.press("Tab");
        assert.ok(
          await mobile.evaluate(() =>
            document
              .querySelector("#mobile-menu")
              .contains(document.activeElement),
          ),
          "Focus must stay inside the modal menu",
        );
      }
      for (let index = 0; index < 7; index++) {
        await mobile.keyboard.press("Shift+Tab");
        assert.ok(
          await mobile.evaluate(() =>
            document
              .querySelector("#mobile-menu")
              .contains(document.activeElement),
          ),
          "Reverse focus must stay inside the modal menu",
        );
      }
      await mobile.keyboard.press("Escape");
      await mobile.waitForFunction(
        () => !document.querySelector("#mobile-menu").open,
      );
      assert.equal(await trigger.getAttribute("aria-expanded"), "false");
      assert.ok(
        await trigger.evaluate((element) => element === document.activeElement),
        "Focus must return to the menu trigger",
      );
    },
  );
  await check("Mobile menu: section navigation closes the dialog", async () => {
    await mobile.getByRole("button", { name: "Abrir menu" }).click();
    await mobile
      .locator("#mobile-menu")
      .getByRole("link", { name: /Soluções/ })
      .click();
    await mobile.waitForFunction(
      () => !document.querySelector("#mobile-menu").open,
    );
    assert.equal(new URL(mobile.url()).hash, "#solucoes");
    assert.ok(
      await mobile.evaluate(
        () =>
          Math.abs(
            document.querySelector("#solucoes").getBoundingClientRect().top,
          ) < 120,
      ),
    );
  });

  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
    acceptDownloads: true,
  });
  const page = await desktopContext.newPage();
  observeErrors(page, "Desktop interactions");
  await open(page);
  await check(
    "All six solution disclosures support Enter and Space",
    async () => {
      const buttons = page.locator(".service-trigger");
      assert.equal(await buttons.count(), 6);
      for (const button of await buttons.all()) {
        if ((await button.getAttribute("aria-expanded")) === "true")
          await button.click();
        await button.focus();
        await page.keyboard.press("Enter");
        assert.equal(await button.getAttribute("aria-expanded"), "true");
        const id = await button.getAttribute("aria-controls");
        assert.ok(await page.locator(`#${id}`).isVisible());
        await page.keyboard.press("Space");
        assert.equal(await button.getAttribute("aria-expanded"), "false");
        assert.equal(await page.locator(`#${id}`).isVisible(), false);
      }
    },
  );
  await check(
    "Only the implemented self-project appears as evidence",
    async () => {
      assert.equal(await page.locator(".work-case").count(), 1);
      assert.match(
        await page.locator("#projetos").textContent(),
        /PROJETO PRÓPRIO/,
      );
      assert.equal(
        await page.locator(".work-visual img").getAttribute("src"),
        "/assets/project-guarda.webp",
      );
    },
  );
  await check(
    "WhatsApp uses the confirmed number and a working direct conversation link",
    async () => {
      const links = page.locator('a[href^="https://wa.me/"]');
      assert.ok((await links.count()) >= 5);
      for (const link of await links.all()) {
        const url = new URL(await link.getAttribute("href"));
        assert.equal(url.pathname, "/5531994649759");
        assert.equal(await link.getAttribute("target"), "_blank");
        assert.match(await link.getAttribute("rel"), /noreferrer/);
      }
      await desktopContext.route("https://wa.me/**", (route) =>
        route.fulfill({
          status: 200,
          contentType: "text/html",
          body: "WhatsApp navigation verified locally",
        }),
      );
      const popupPromise = page.waitForEvent("popup");
      await page.locator(".contact-button").click();
      const popup = await popupPromise;
      await popup.waitForLoadState();
      assert.equal(new URL(popup.url()).pathname, "/5531994649759");
      assert.ok(new URL(popup.url()).searchParams.get("text"));
      await popup.close();
    },
  );
  await mobileContext.close();
  await desktopContext.close();

  const motionContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  const motionPage = await motionContext.newPage();
  observeErrors(motionPage, "Scroll motion");
  await check(
    "Normal motion reveals every section after scrolling",
    async () => {
      await open(motionPage);
      await revealPage(motionPage);
      const hidden = await motionPage
        .locator("[data-text-line]")
        .evaluateAll((elements) =>
          elements
            .filter((element) => {
              const transform = getComputedStyle(element).transform;
              return (
                transform !== "none" &&
                Math.abs(new DOMMatrix(transform).m42) > 1
              );
            })
            .map((element) => element.textContent),
        );
      assert.deepEqual(
        hidden,
        [],
        "Scroll reveals must not strand content offscreen",
      );
      const masked = await motionPage
        .locator('[data-reveal="image"]')
        .evaluateAll((elements) =>
          elements
            .filter((element) => {
              const values =
                getComputedStyle(element).clipPath.match(/-?\d+(?:\.\d+)?/g) ||
                [];
              return values.some((value) => Math.abs(Number(value)) > 0.1);
            })
            .map((element) => element.className),
        );
      assert.deepEqual(
        masked,
        [],
        "Image masks must fully reveal after scrolling",
      );
      const brokenImages = await motionPage
        .locator("img")
        .evaluateAll((images) =>
          images
            .filter((image) => !image.complete || !image.naturalWidth)
            .map((image) => image.src),
        );
      assert.deepEqual(
        brokenImages,
        [],
        "Motion must not prevent lazy images from loading",
      );
    },
  );
  await check(
    "Lenis and ScrollTrigger: one scroll owner, active connections and desktop pin",
    async () => {
      assert.equal(
        await motionPage.locator("[data-motion]").getAttribute("data-motion"),
        "gsap-lenis",
      );
      assert.ok(
        await motionPage
          .locator("html")
          .evaluate((el) => el.classList.contains("lenis")),
      );
      assert.equal(await motionPage.locator(".pin-spacer").count(), 1);
      // Changing disclosure height must refresh downstream scroll geometry.
      await motionPage.locator('[aria-controls="service-automacoes"]').click();
      await motionPage.locator(".eco-client").scrollIntoViewIfNeeded();
      await motionPage.mouse.wheel(0, 400);
      await motionPage.waitForTimeout(1000);
      const offsets = await motionPage
        .locator(".connection-path")
        .evaluateAll((paths) =>
          paths.map((path) =>
            parseFloat(getComputedStyle(path).strokeDashoffset),
          ),
        );
      assert.ok(
        offsets.every((value) => Math.abs(value) < 1),
        "Channels must converge after scrolling through the ecosystem",
      );
      await motionPage.locator('[aria-controls="service-site"]').click();
      await motionPage.mouse.wheel(0, 300);
      await motionPage.waitForTimeout(1100);
      assert.ok(
        await motionPage.evaluate(
          () =>
            Number(
              document
                .querySelector("[data-motion]")
                .style.getPropertyValue("--scroll-progress"),
            ) > 0,
        ),
      );
    },
  );
  await check(
    "Resize and live reduced-motion changes clean up pins and smooth scrolling",
    async () => {
      await motionPage.setViewportSize({ width: 390, height: 844 });
      await motionPage.waitForTimeout(500);
      assert.equal(await motionPage.locator(".pin-spacer").count(), 0);
      await motionPage.getByRole("button", { name: "Abrir menu" }).click();
      assert.ok(
        await motionPage
          .locator("html")
          .evaluate((el) => el.classList.contains("lenis-stopped")),
        "The modal must stop smooth scrolling behind it",
      );
      await motionPage.keyboard.press("Escape");
      assert.equal(
        await motionPage
          .locator("html")
          .evaluate((el) => el.classList.contains("lenis-stopped")),
        false,
      );
      assert.ok(
        await motionPage.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      await motionPage.emulateMedia({ reducedMotion: "reduce" });
      await motionPage.waitForTimeout(300);
      assert.equal(
        await motionPage.locator("[data-motion]").getAttribute("data-motion"),
        "reduced",
      );
      assert.equal(
        await motionPage
          .locator("html")
          .evaluate((el) => el.classList.contains("lenis")),
        false,
      );
      assert.equal(await motionPage.locator(".pin-spacer").count(), 0);
      await motionPage.emulateMedia({ reducedMotion: "no-preference" });
      await motionPage.setViewportSize({ width: 1440, height: 900 });
      await motionPage.waitForTimeout(500);
      assert.equal(await motionPage.locator(".pin-spacer").count(), 1);
    },
  );
  await check(
    "Refreshing mid-page preserves readable content and a single pin",
    async () => {
      await motionPage.goto(`${baseURL}/#projetos`, {
        waitUntil: "networkidle",
      });
      await motionPage.reload({ waitUntil: "networkidle" });
      await motionPage.waitForTimeout(1200);
      assert.equal(await motionPage.locator(".pin-spacer").count(), 1);
      const top = await motionPage
        .locator("#projetos")
        .evaluate((el) => el.getBoundingClientRect().top);
      assert.ok(
        Math.abs(top) < 180,
        `Anchor restoration moved the target: ${top}`,
      );
      assert.ok(await motionPage.locator("#projetos h2").isVisible());
    },
  );
  await check(
    "Reload without a fragment restores the exact scroll position",
    async () => {
      await motionPage.evaluate(() =>
        history.replaceState(null, "", location.pathname),
      );
      await motionPage.locator("#projetos").scrollIntoViewIfNeeded();
      await motionPage.waitForTimeout(700);
      const previous = await motionPage.evaluate(() => scrollY);
      await motionPage.reload({ waitUntil: "networkidle" });
      await motionPage.waitForTimeout(1100);
      const restored = await motionPage.evaluate(() => scrollY);
      assert.ok(
        Math.abs(restored - previous) < 5,
        `Scroll moved from ${previous} to ${restored}`,
      );
    },
  );
  await motionContext.close();
  await check(
    "No browser console errors, page errors or failed HTTP assets",
    () => assert.deepEqual([...new Set(browserErrors)], []),
  );
} finally {
  await browser.close();
  const report = {
    baseURL,
    date: new Date().toISOString(),
    results,
    browserErrors,
    passed: results.every((result) => result.passed),
  };
  await writeFile(
    `${reviewDirectory}validation.json`,
    JSON.stringify(report, null, 2),
  );
  const failed = results.filter((result) => !result.passed);
  console.log(
    `\n${results.length - failed.length}/${results.length} checks passed. Report: ${reviewDirectory}validation.json`,
  );
  if (failed.length) process.exitCode = 1;
}
