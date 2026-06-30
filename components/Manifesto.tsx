"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { VIDEO } from "@/lib/assets";

const TEXT =
  "We don't just make content. We engineer moments that stop the scroll, spark emotion, and make your brand impossible to forget.";

const HIGHLIGHT = new Set(["stop", "emotion,", "forget."]);

export default function Manifesto() {
  const root = useRef<HTMLDivElement>(null);
  const sphere = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".mf-word");

      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          const lit = Math.floor(p * (words.length + 4));
          words.forEach((w, idx) => {
            const on = idx < lit;
            const hl = w.dataset.hl === "1";
            w.style.color = on
              ? hl
                ? "var(--color-gold)"
                : "rgba(244,241,234,0.95)"
              : "rgba(244,241,234,0.14)";
          });
        },
      });

      // floating sphere drifts + parallax with scroll
      gsap.to(sphere.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "+=180%", scrub: true },
      });

      const v = sphere.current;
      if (v) {
        const io = new IntersectionObserver(([e]) =>
          e.isIntersecting ? v.play().catch(() => {}) : v.pause()
        );
        io.observe(v);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-pine/15 px-6 md:px-10"
    >
      {/* floating object */}
      <video
        ref={sphere}
        className="pointer-events-none absolute -right-20 top-1/2 z-0 hidden h-[60vh] -translate-y-1/2 opacity-70 mix-blend-screen md:block"
        src={VIDEO.sphere}
        muted
        loop
        playsInline
        preload="none"
      />
      <div
        className="glow"
        style={{ width: 600, height: 600, left: "10%", top: "20%", background: "radial-gradient(circle, rgba(0,49,82,0.5), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <span className="eyebrow mb-10 block text-gold">The M²L belief</span>
        <p className="statement flex flex-wrap gap-x-[0.28em] gap-y-1 text-[8.5vw] leading-[1.04] sm:text-[6vw] lg:text-6xl">
          {TEXT.split(" ").map((w, i) => (
            <span
              key={i}
              className="mf-word"
              data-hl={HIGHLIGHT.has(w.toLowerCase()) ? "1" : "0"}
              style={{ color: "rgba(244,241,234,0.14)" }}
            >
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
