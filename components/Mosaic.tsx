"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, splitText } from "@/lib/gsap";
import { ASSET, IMG } from "@/lib/assets";

// target grid positions (col-span / row layout via CSS), scatter defined per tile
const TILES = [
  { src: IMG.creatorPhone, cls: "col-start-1 row-start-1", sx: -60, sy: -40, r: -14 },
  { src: ASSET.socialNight, cls: "col-start-2 row-start-1", sx: 30, sy: -70, r: 10 },
  { src: IMG.fashionCampaign, cls: "col-start-3 row-start-1 row-span-2", sx: 80, sy: -30, r: 12 },
  { src: IMG.neonPortrait, cls: "col-start-4 row-start-1", sx: 70, sy: -50, r: -8 },
  { src: ASSET.appContent, cls: "col-start-1 row-start-2", sx: -80, sy: 50, r: 12 },
  { src: IMG.contentCreator, cls: "col-start-2 row-start-2", sx: -20, sy: 70, r: -10 },
  { src: IMG.productLux, cls: "col-start-4 row-start-2", sx: 90, sy: 60, r: 14 },
];

export default function Mosaic() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>(".ms-tile");

      // initial scatter
      tiles.forEach((t) => {
        gsap.set(t, {
          xPercent: parseFloat(t.dataset.sx || "0"),
          yPercent: parseFloat(t.dataset.sy || "0"),
          rotate: parseFloat(t.dataset.r || "0"),
          scale: 0.7,
          opacity: 0.25,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 0.7,
        },
      });

      tl.to(tiles, {
        xPercent: 0,
        yPercent: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        ease: "power2.inOut",
        stagger: 0.04,
        duration: 1,
      });

      // headline reveal as they assemble
      const head = el.querySelector<HTMLElement>(".ms-head");
      if (head) {
        const { chars } = splitText(head);
        gsap.set(chars, { yPercent: 110 });
        tl.to(chars, { yPercent: 0, ease: "power3.out", stagger: 0.02, duration: 0.8 }, 0.4);
      }
      tl.fromTo(".ms-sub", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.7);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden px-6 py-20 md:px-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* center caption layer */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center text-center">
          <h2 className="ms-head statement overflow-hidden text-5xl text-bone md:text-8xl">
            One studio. Every format.
          </h2>
          <p className="ms-sub mt-5 max-w-md text-balance text-haze">
            Reels, ads, photography, posters, branding — produced under one
            cinematic roof and tuned for the platform that matters.
          </p>
        </div>

        {/* assembling grid */}
        <div className="relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:grid-rows-2 md:gap-4">
          {TILES.map((t, i) => (
            <div
              key={i}
              data-sx={t.sx}
              data-sy={t.sy}
              data-r={t.r}
              data-cursor="hover"
              className={`ms-tile relative aspect-[3/4] overflow-hidden rounded-2xl border border-bone/10 ${t.cls}`}
            >
              <img src={t.src} alt="" className="cine-img h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-ink/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
