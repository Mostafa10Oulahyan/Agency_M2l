"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SplitHeading } from "./anim";

const STATS = [
  { value: 2400, suffix: "+", label: "Projects Delivered" },
  { value: 380, suffix: "+", label: "Happy Clients" },
  { value: 42, suffix: "", label: "Countries" },
  { value: 6800, suffix: "+", label: "Videos Produced" },
  { value: 920, suffix: "+", label: "Campaigns Launched" },
  { value: 1.2, suffix: "B", label: "Views Generated", decimals: 1 },
];

function format(n: number, decimals = 0) {
  if (n >= 1000 && decimals === 0) return Math.round(n).toLocaleString("en-US");
  return n.toFixed(decimals);
}

export default function Trust() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = parseFloat(el.dataset.target || "0");
        const decimals = parseInt(el.dataset.decimals || "0");
        const suffix = el.dataset.suffix || "";
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              v: target,
              duration: 2.2,
              ease: "power2.out",
              onUpdate: () => (el.textContent = format(obj.v, decimals) + suffix),
            }),
        });
      });
      gsap.from(".stat-cell", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".stat-grid", start: "top 82%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative px-6 py-28 md:py-40">
      <div
        className="glow"
        style={{ width: 520, height: 520, left: "-6%", top: "20%", background: "radial-gradient(circle, rgba(0,51,51,0.6), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl">
        {/* impact statement */}
        <SplitHeading className="statement max-w-5xl text-5xl leading-[0.95] md:text-8xl">
          Views generated. Brands built. Platforms dominated.
        </SplitHeading>

        <div className="stat-grid mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-bone/8 bg-bone/5 md:grid-cols-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              data-cursor="hover"
              className="stat-cell group relative bg-ink p-8 transition-colors duration-500 hover:bg-azure/30 md:p-10"
            >
              <span
                className="stat-num font-display text-5xl font-semibold tabular-nums text-bone md:text-6xl"
                data-target={s.value}
                data-suffix={s.suffix}
                data-decimals={s.decimals ?? 0}
              >
                0{s.suffix}
              </span>
              <span className="mt-3 block text-sm text-haze">{s.label}</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
