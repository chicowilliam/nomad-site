import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** One ticker owns scroll and animation. Contexts revert all triggers and pins. */
export function useEditorialMotion(scope: RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const media = gsap.matchMedia();
      let alive = true;
      const header = root.querySelector(".site-header");
      const refresh = () => {
        if (alive) ScrollTrigger.refresh();
      };
      const initialHash = window.location.hash;
      const scrollKey = `guarda:scroll:${window.location.pathname}${window.location.search}`;
      const navigation = performance.getEntriesByType("navigation")[0] as
        PerformanceNavigationTiming | undefined;
      let restoredScroll: number | null = null;
      try {
        const saved = sessionStorage.getItem(scrollKey);
        if (
          navigation?.type === "reload" &&
          saved !== null &&
          Number.isFinite(Number(saved))
        )
          restoredScroll = Number(saved);
      } catch {
        /* Native restoration remains available when storage is blocked. */
      }
      const rememberScroll = () => {
        try {
          sessionStorage.setItem(scrollKey, String(window.scrollY));
        } catch {
          /* Storage is optional. */
        }
      };
      window.addEventListener("pagehide", rememberScroll);
      document.fonts.ready.then(() => {
        if (!alive) return;
        refresh();
        // Restore reloads after the desktop pin has recreated its spacing.
        if (restoredScroll !== null) {
          window.scrollTo({ top: restoredScroll, behavior: "instant" });
          return;
        }
        // React mounts after the browser's initial fragment lookup. Restore the
        // requested section after fonts and pin spacing have settled.
        if (initialHash && window.location.hash === initialHash) {
          let id = initialHash.slice(1);
          try {
            id = decodeURIComponent(id);
          } catch {
            /* Keep the literal id. */
          }
          const target = document.getElementById(id);
          if (target)
            window.scrollTo({
              top: target.getBoundingClientRect().top + window.scrollY - 104,
              behavior: "instant",
            });
        }
      });
      const images = [...root.querySelectorAll("img")];
      images.forEach((image) => image.addEventListener("load", refresh));
      root.querySelectorAll('[data-theme="blue"]').forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 80px",
          end: "bottom 80px",
          onToggle: (self) =>
            header?.classList.toggle("header-inverse", self.isActive),
        });
      });
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          root.style.setProperty("--scroll-progress", String(self.progress));
          header?.classList.toggle("header-scrolled", self.scroll() > 30);
        },
      });
      media.add(
        {
          all: "all",
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 1024px)",
          horizontal: "(min-width: 768px)",
        },
        (context) => {
          if (!context.conditions?.motion) {
            root.dataset.motion = "reduced";
            return;
          }
          const desktop = Boolean(context.conditions.desktop);
          const lenis = new Lenis({
            autoRaf: false,
            duration: 0.85,
            smoothWheel: true,
            syncTouch: false,
            anchors: { offset: -96 },
            prevent: (node) => node.hasAttribute("data-lenis-prevent"),
          });
          const tick = (time: number) => lenis.raf(time * 1000);
          const update = () => ScrollTrigger.update();
          lenis.on("scroll", update);
          gsap.ticker.add(tick);
          gsap.ticker.lagSmoothing(0);
          root.dataset.motion = "gsap-lenis";
          const toggleMenu = (event: Event) => {
            if ((event as CustomEvent<boolean>).detail) lenis.stop();
            else lenis.start();
          };
          window.addEventListener("guarda:menu", toggleMenu);
          const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
          intro
            .from(".domain-photo", { rotation: -2, y: 12, duration: 1 }, 0)
            .from(".domain-address", { y: 18, duration: 0.9 }, 0.1);
          root
            .querySelectorAll<SVGPathElement>(".hero-connections path")
            .forEach((path) => {
              const length = path.getTotalLength();
              intro.fromTo(
                path,
                { strokeDasharray: length, strokeDashoffset: length },
                { strokeDashoffset: 0, duration: 1.2 },
                0.2,
              );
            });
          root
            .querySelectorAll<HTMLElement>('[data-reveal="heading"]')
            .forEach((heading) => {
              gsap.from(heading.querySelectorAll("[data-text-line]"), {
                yPercent: 105,
                duration: 0.85,
                stagger: 0.075,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: heading,
                  start: "top 92%",
                  once: true,
                },
              });
            });
          root
            .querySelectorAll<HTMLElement>('[data-reveal="image"]')
            .forEach((element) => {
              gsap.from(element, {
                clipPath: "inset(0 100% 0 0)",
                duration: 0.95,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element.parentElement,
                  start: "top 84%",
                  once: true,
                },
              });
            });
          gsap.from(".fragment", {
            x: (index) => (index % 2 ? 18 : -18),
            stagger: 0.09,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".fragment-list",
              start: "top 85%",
              once: true,
            },
          });
          const connection = gsap.timeline({
            scrollTrigger: {
              trigger: ".ecosystem-scene",
              start: "top 78%",
              end: "bottom 55%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
          root
            .querySelectorAll<SVGPathElement>(
              ".connection-path, .connection-output",
            )
            .forEach((path, index) => {
              const length = path.getTotalLength();
              connection.fromTo(
                path,
                { strokeDasharray: length, strokeDashoffset: length },
                { strokeDashoffset: 0, duration: 1, ease: "none" },
                index * 0.07,
              );
            });
          connection.from(
            ".ecosystem-node",
            {
              x: (index) => (index % 2 ? -16 : 16),
              stagger: 0.05,
              duration: 0.65,
              ease: "none",
            },
            0,
          );
          connection.from(
            ".ecosystem-center",
            { scale: 0.96, duration: 0.6, ease: "none" },
            0.35,
          );
          connection.from(
            ".ecosystem-destination",
            { y: 12, duration: 0.5, ease: "none" },
            1,
          );
          const journey = gsap.timeline({
            scrollTrigger: {
              trigger: ".journey-stage",
              start: desktop ? "top 100px" : "top 65%",
              end: desktop ? "+=420" : "bottom 60%",
              pin: desktop,
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          });
          const progressAxis = context.conditions?.horizontal
            ? "scaleX"
            : "scaleY";
          journey.fromTo(
            ".journey-line span",
            { [progressAxis]: 0 },
            { [progressAxis]: 1, duration: 5, ease: "none" },
            0,
          );
          journey.to(
            ".journey-step",
            { color: "#1f5ed6", stagger: 1, duration: 0.5, ease: "none" },
            0,
          );
          journey.fromTo(
            ".journey-step i",
            { scale: 0.6, backgroundColor: "#a5b4c9" },
            {
              scale: 1,
              backgroundColor: "#1f5ed6",
              stagger: 1,
              duration: 0.5,
              ease: "none",
            },
            0,
          );
          if (desktop)
            gsap.to(".domain-photo img", {
              y: 16,
              ease: "none",
              scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 0.7,
              },
            });
          refresh();
          return () => {
            window.removeEventListener("guarda:menu", toggleMenu);
            gsap.ticker.remove(tick);
            // Settle native scroll state before destroy so a pending velocity
            // timeout cannot restore Lenis classes after reduced motion is on.
            lenis.stop();
            lenis.off("scroll", update);
            lenis.destroy();
            delete root.dataset.motion;
          };
        },
      );
      return () => {
        alive = false;
        window.removeEventListener("pagehide", rememberScroll);
        images.forEach((image) => image.removeEventListener("load", refresh));
        media.revert();
        delete root.dataset.motion;
      };
    },
    { scope },
  );
}
