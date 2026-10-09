import { chromium } from "playwright";
import { readFile } from "node:fs/promises";
const normal = (
  await readFile(
    "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2",
  )
).toString("base64");
const italic = (
  await readFile(
    "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2",
  )
).toString("base64");
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(
  `<style>@font-face{font-family:Display;src:url(data:font/woff2;base64,${normal})}@font-face{font-family:Display;src:url(data:font/woff2;base64,${italic});font-style:italic}*{box-sizing:border-box}body{margin:0;background:#08080b;color:#f4f0e8;padding:45px 65px}header{font:700 23px/.95 Arial;letter-spacing:-1px}h1{font:400 108px/.98 Display;margin:58px 0 0;letter-spacing:-2px}em{color:#659fff}footer{font:12px Arial;letter-spacing:2px;border-top:1px solid #ffffff20;margin-top:44px;padding-top:22px;color:#a6a3a0}</style><header>GUARDA<br>CHUVA.</header><h1>Sites, sistemas<br>e lojas virtuais <em>sob medida.</em></h1><footer>DESIGN + DESENVOLVIMENTO · BELO HORIZONTE → BRASIL</footer>`,
);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og-cover.png" });
await browser.close();
