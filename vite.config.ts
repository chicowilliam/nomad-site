import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { brand, seo, services } from "./src/data/site";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = env.VITE_SITE_URL || brand.canonicalUrl;
  const canonical = siteUrl ? new URL("/", siteUrl).href : null;
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "guarda-chuva-seo",
        transformIndexHtml() {
          const image = canonical
            ? new URL("/og-cover.png", canonical).href
            : "/og-cover.png";
          const data = {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: brand.displayName,
            ...(brand.whatsapp ? { telephone: `+${brand.whatsapp}` } : {}),
            description: seo.description,
            ...(canonical ? { url: canonical, image } : {}),
            address: {
              "@type": "PostalAddress",
              addressLocality: brand.city,
              addressRegion: "MG",
              addressCountry: "BR",
            },
            areaServed: "Brasil",
            knowsAbout: [
              "Criação de site para restaurante",
              "Site para bar e delivery",
              "Cardápio digital",
              "Sistemas para restaurantes",
              "Desenvolvimento web em Belo Horizonte",
              "Automação de operações gastronômicas",
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Domínio digital para gastronomia",
              itemListElement: services.map((service) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: service.label,
                  description: service.description,
                  areaServed: "Brasil",
                  provider: {
                    "@type": "ProfessionalService",
                    name: brand.displayName,
                  },
                },
              })),
            },
            ...(brand.email ? { email: brand.email } : {}),
          };
          return [
            {
              tag: "meta",
              attrs: { name: "description", content: seo.description },
            },
            {
              tag: "meta",
              attrs: { name: "robots", content: "index, follow" },
            },
            { tag: "meta", attrs: { property: "og:type", content: "website" } },
            { tag: "meta", attrs: { property: "og:locale", content: "pt_BR" } },
            {
              tag: "meta",
              attrs: { property: "og:site_name", content: brand.displayName },
            },
            {
              tag: "meta",
              attrs: { property: "og:title", content: seo.title },
            },
            {
              tag: "meta",
              attrs: { property: "og:description", content: seo.description },
            },
            { tag: "meta", attrs: { property: "og:image", content: image } },
            {
              tag: "meta",
              attrs: { property: "og:image:alt", content: seo.imageAlt },
            },
            {
              tag: "meta",
              attrs: { property: "og:image:width", content: "1200" },
            },
            {
              tag: "meta",
              attrs: { property: "og:image:height", content: "630" },
            },
            {
              tag: "meta",
              attrs: { name: "twitter:card", content: "summary_large_image" },
            },
            {
              tag: "meta",
              attrs: { name: "twitter:title", content: seo.title },
            },
            {
              tag: "meta",
              attrs: { name: "twitter:description", content: seo.description },
            },
            { tag: "meta", attrs: { name: "twitter:image", content: image } },
            {
              tag: "script",
              attrs: { type: "application/ld+json" },
              children: JSON.stringify(data),
            },
            ...(canonical
              ? [
                  { tag: "link", attrs: { rel: "canonical", href: canonical } },
                  {
                    tag: "meta",
                    attrs: { property: "og:url", content: canonical },
                  },
                ]
              : []),
          ].map((tag) => ({ ...tag, injectTo: "head" as const }));
        },
        generateBundle() {
          this.emitFile({
            type: "asset",
            fileName: "robots.txt",
            source: `User-agent: *\nAllow: /\n${canonical ? `Sitemap: ${canonical}sitemap.xml\n` : ""}`,
          });
          if (canonical)
            this.emitFile({
              type: "asset",
              fileName: "sitemap.xml",
              source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${canonical.replaceAll("&", "&amp;")}</loc></url></urlset>`,
            });
        },
      },
    ],
  };
});
