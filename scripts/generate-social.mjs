import { chromium } from "playwright";
import { readFile } from "node:fs/promises";
const font = (
  await readFile(
    "node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  )
).toString("base64");
const object = (await readFile("public/assets/structure.webp")).toString(
  "base64",
);
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.setContent(
  `<html><head><style>@font-face{font-family:Display;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:300 700}*{box-sizing:border-box}body{margin:0;background:#f2f2f0;font-family:Display;color:#0a0a0a}main{padding:45px 55px;width:1200px;height:630px;overflow:hidden;position:relative}small{font-size:15px;letter-spacing:1px}h1{font-weight:400;font-size:105px;line-height:.96;letter-spacing:-6px;position:relative;margin:64px 0 0}img{position:absolute;width:700px;right:-90px;top:90px;mix-blend-mode:multiply}.brand{font-size:38px;letter-spacing:-2px}.intro{font-size:19px;margin-top:18px;position:relative}footer{position:absolute;left:55px;right:55px;bottom:35px;display:flex;justify-content:space-between;border-top:1px solid #babbb6;padding-top:15px;font-size:12px}</style></head><body><main><div class="brand">nomad</div><img src="data:image/webp;base64,${object}"><h1>ESTRUTURA<br>PARA<br>ESCALAR.</h1><footer><span>SITES. SISTEMAS. AUTOMAÇÃO.</span><span>ESTÚDIO DIGITAL / BH — BRASIL</span></footer></main></body></html>`,
);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og-cover.png" });
await browser.close();
