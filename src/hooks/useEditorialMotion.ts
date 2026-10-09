import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(useGSAP, ScrollTrigger);

/** One ticker; no pins. All content remains readable with motion disabled. */
export function useEditorialMotion(scope: RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      let alive = true;
      const media = gsap.matchMedia();
      const refresh = () => {
        if (alive) ScrollTrigger.refresh();
      };
      const scrollKey = `guarda:scroll:${location.pathname}${location.search}`;
      const navigation = performance.getEntriesByType("navigation")[0] as
        PerformanceNavigationTiming | undefined;
      let restored: number | null = null;
      try {
        const saved = sessionStorage.getItem(scrollKey);
        if (
          navigation?.type === "reload" &&
          saved !== null &&
          Number.isFinite(Number(saved))
        )
          restored = Number(saved);
      } catch {
        /* Native restoration remains available. */
      }
      const remember = () => {
        try {
          sessionStorage.setItem(scrollKey, String(scrollY));
        } catch {
          /* Optional storage. */
        }
      };
      window.addEventListener("pagehide", remember);
      const initialHash = location.hash;
      document.fonts.ready.then(() => {
        if (!alive) return;
        refresh();
        if (restored !== null)
          window.scrollTo({ top: restored, behavior: "instant" });
        else if (initialHash && location.hash === initialHash) {
          let id = initialHash.slice(1);
          try {
            id = decodeURIComponent(id);
          } catch {
            /* Literal fragment. */
          }
          const target = document.getElementById(id);
          if (target)
            window.scrollTo({
              top: target.getBoundingClientRect().top + scrollY - 92,
              behavior: "instant",
            });
        }
      });
      const images = [...root.querySelectorAll("img")];
      images.forEach((image) => image.addEventListener("load", refresh));
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) =>
          root
            .querySelector(".site-header")
            ?.classList.toggle("header-scrolled", self.scroll() > 24),
      });
      media.add(
        { motion: "(prefers-reduced-motion: no-preference)", all: "all" },
        (context) => {
          if (!context.conditions?.motion) {
            root.dataset.motion = "reduced";
            return;
          }
          const lenis = new Lenis({
            autoRaf: false,
            duration: 0.75,
            smoothWheel: true,
            syncTouch: false,
            anchors: { offset: -92 },
          });
          const tick = (time: number) => lenis.raf(time * 1000);
          const update = () => ScrollTrigger.update();
          lenis.on("scroll", update);
          gsap.ticker.add(tick);
          gsap.ticker.lagSmoothing(0);
          root.dataset.motion = "gsap-lenis";
          gsap
            .timeline({ defaults: { duration: 0.6, ease: "power3.out" } })
            .from(".hero-label", { y: 6, opacity: 0.5 }, 0)
            .from(".hero h1 > *", { y: 12, stagger: 0.06 }, 0.05)
            .from(
              ".hero-description, .hero-actions",
              { y: 8, stagger: 0.05 },
              0.15,
            );
          root
            .querySelectorAll('[data-reveal="text"]')
            .forEach((element) =>
              gsap.from(element, {
                y: 14,
                duration: 0.65,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 94%",
                  once: true,
                },
              }),
            );
          root
            .querySelectorAll(".service-rule")
            .forEach((element) =>
              gsap.from(element, {
                scaleX: 0.75,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element.parentElement,
                  start: "top 90%",
                  once: true,
                },
              }),
            );
          gsap.from(".service-commerce h3", {
            y: 8,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".service-commerce",
              start: "top 85%",
              once: true,
            },
          });
          root
            .querySelectorAll('[data-reveal="image"]')
            .forEach((element) =>
              gsap.from(element, {
                clipPath: "inset(0 0 12% 0 round 9px)",
                duration: 0.75,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 95%",
                  once: true,
                },
              }),
            );
          refresh();
          return () => {
            gsap.ticker.remove(tick);
            lenis.stop();
            lenis.off("scroll", update);
            lenis.destroy();
            delete root.dataset.motion;
          };
        },
      );
      return () => {
        alive = false;
        window.removeEventListener("pagehide", remember);
        images.forEach((image) => image.removeEventListener("load", refresh));
        media.revert();
        delete root.dataset.motion;
      };
    },
    { scope },
  );
}
