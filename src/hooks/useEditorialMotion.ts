import { useEffect } from "react";

export function useEditorialMotion() {
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    // Observe the unmasked layout parent. A fully clipped element has no
    // intersection area and cannot reliably trigger its own reveal.
    const regions = new Map<Element, Element[]>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          regions.get(entry.target)?.forEach((node) => node.classList.add("is-visible"));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -35px 0px" },
    );
    if (!media.matches) {
      document.querySelectorAll("[data-reveal]").forEach((node) => {
        const region = node.parentElement;
        if (!region) return;
        node.classList.add("will-reveal");
        regions.set(region, [...(regions.get(region) ?? []), node]);
      });
      regions.forEach((_nodes, region) => observer.observe(region));
    }
    const header = document.querySelector<HTMLElement>(".site-header");
    const hero = document.querySelector(".hero");
    let frame = 0;
    const update = () => {
      const heroHeight = hero?.clientHeight ?? 760;
      const progress = document.documentElement.scrollHeight - innerHeight;
      header?.classList.toggle("header-dark", window.scrollY > heroHeight - 80);
      document.documentElement.style.setProperty("--scroll-progress", `${progress ? scrollY / progress : 0}`);
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
}
