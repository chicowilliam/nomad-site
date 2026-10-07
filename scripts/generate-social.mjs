import { chromium } from "playwright";
import { readFile } from "node:fs/promises";
const font = (
  await readFile(
    "node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2",
  )
).toString("base64");
const photo = (await readFile("public/assets/gastronomy.webp")).toString(
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
await page.setContent(`<html><head><style>
@font-face{font-family:Display;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:400 700}*{box-sizing:border-box}body{margin:0;background:#fafaf8;font-family:Display;color:#101828}main{padding:45px 55px;width:1200px;height:630px;overflow:hidden;position:relative}.brand{font-size:30px;line-height:.87;letter-spacing:-1.5px}h1{font-size:87px;font-weight:450;line-height:1.02;letter-spacing:-5px;margin:74px 0 0;position:relative;z-index:2}em{font-style:normal;color:#2864db}img{position:absolute;width:440px;height:550px;object-fit:cover;right:25px;top:55px;transform:rotate(8deg)}.address{position:absolute;right:52px;bottom:81px;background:#2864db;color:#fff;padding:21px 31px;font-size:25px;transform:rotate(-5deg)}footer{position:absolute;bottom:29px;left:55px;right:55px;display:flex;justify-content:space-between;border-top:1px solid #cdd3dc;padding-top:16px;font-size:12px;letter-spacing:1px}
</style></head><body><main><div class="brand">guarda-<br>chuva®</div><img src="data:image/webp;base64,${photo}" alt=""><h1>SEU NEGÓCIO.<br><em>SEU DOMÍNIO.</em></h1><div class="address">TODOS OS CAMINHOS<br>LEVAM ATÉ VOCÊ.</div><footer><span>DOMÍNIO DIGITAL PARA GASTRONOMIA</span><span>BELO HORIZONTE → BRASIL</span></footer></main></body></html>`);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og-cover.png" });
await browser.close();
