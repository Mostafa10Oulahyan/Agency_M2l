"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, splitText } from "@/lib/gsap";
import { ASSET, IMG } from "@/lib/assets";

const WORK = [
  { client: "From This Island", cat: "Skincare · OOH Campaign", outcome: "+312%", metric: "brand reach", media: ASSET.billboard },
  { client: "Genesys", cat: "Creative Production · Multi-format", outcome: "3-in-1", metric: "formats, one shoot", media: ASSET.poster },
  { client: "Velou", cat: "Fashion · AI Film", outcome: "1.4M", metric: "views in 72 hours", media: IMG.fashionCampaign },
  { client: "Atlas", cat: "Product · AI Photography", outcome: "+38%", metric: "add-to-cart rate", media: IMG.productLux },
];

export default function Showcase() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // intro heading
      const head = el.querySelector<HTMLElement>(".wk-head");
      if (head) {
        const { chars } = splitText(head);
        gsap.set(chars, { yPercent: 110 });
        ScrollTrigger.create({
          trigger: head,
          start: "top 80%",
          once: true,
          onEnter: () => gsap.to(chars, { yPercent: 0, ease: "power4.out", stagger: 0.02, duration: 1 }),
        });
      }

      // per-panel reveal of text + scale of media
      gsap.utils.toArray<HTMLElement>(".wk-panel").forEach((panel) => {
        const media = panel.querySelector(".wk-media");
        gsap.fromTo(
          media,
          { scale: 1.18 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: panel, start: "top bottom", end: "top top", scrub: true },
          }
        );
        gsap.from(panel.querySelectorAll(".wk-rise"), {
          yPercent: 120,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: panel, start: "top 55%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={root} className="relative px-4 md:px-6">
      <div className="mx-auto max-w-7xl py-24 md:py-32">
        <div className="flex items-end justify-between">
          <div>
            <span className="eyebrow text-gold">Selected work</span>
            <h2 className="wk-head statement mt-4 overflow-hidden text-5xl md:text-8xl">
              Campaigns<br />that convert.
            </h2>
          </div>
          <span className="hidden max-w-[180px] text-right text-sm text-haze md:block">
            Real outcomes for real brands.
          </span>
        </div>
      </div>

      {/* sticky-stacked reveals */}
      <div className="relative">
        {WORK.map((w, i) => (
          <div
            key={w.client}
            className="wk-panel sticky top-0 flex h-[100svh] items-center justify-center"
            style={{ zIndex: i + 1 }}
          >
            <article
              data-cursor="view"
              data-cursor-text="View"
              className="relative h-[82svh] w-full max-w-7xl overflow-hidden rounded-3xl border border-bone/10"
            >
              <div className="wk-media absolute inset-0 will-change-transform">
                <img src={w.media} alt={w.client} className="cine-img h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

              {/* top meta */}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-7 md:p-10">
                <span className="font-display text-sm text-bone/80">{String(i + 1).padStart(2, "0")} / {String(WORK.length).padStart(2, "0")}</span>
                <span className="rounded-full border border-bone/20 bg-ink/30 px-4 py-1.5 text-[11px] text-bone/80 backdrop-blur">
                  {w.cat}
                </span>
              </div>

              {/* bottom content */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-6 p-7 md:flex-row md:items-end md:p-10">
                <h3 className="overflow-hidden">
                  <span className="wk-rise statement block text-5xl md:text-8xl">{w.client}</span>
                </h3>
                <div className="overflow-hidden text-right">
                  <span className="wk-rise block font-display text-5xl font-semibold text-gradient-gold md:text-7xl">
                    {w.outcome}
                  </span>
                  <span className="wk-rise mt-1 block text-sm text-haze">{w.metric}</span>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
