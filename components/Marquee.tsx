"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const ITEMS = [
  "Instagram Reels",
  "TikTok Videos",
  "AI Product Photography",
  "YouTube Ads",
  "Motion Graphics",
  "Branding",
  "AI Avatars",
  "Commercial Videos",
  "Thumbnails",
  "Marketing Campaigns",
];

/**
 * Velocity-aware infinite marquee — base auto-scroll, scroll velocity skews
 * the speed and direction for a tactile feel.
 */
export default function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const half = el.scrollWidth / 2;
      const x = gsap.to(el, {
        x: -half,
        duration: 24,
        ease: "none",
        repeat: -1,
        modifiers: { x: (v) => `${(parseFloat(v) % half)}px` },
      });

      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity();
          const skew = gsap.utils.clamp(-30, 30, v / 60);
          gsap.to(el, { skewX: skew * 0.15, duration: 0.4, overwrite: true });
          x.timeScale(1 + Math.abs(v) / 1200);
          if (v < 0) x.timeScale(-(1 + Math.abs(v) / 1200));
        },
        onScrubComplete: () => x.timeScale(1),
      });
    }, track);
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative overflow-hidden border-y border-bone/8 bg-pine/20 py-6">
      <div ref={track} className="flex w-max gap-8 whitespace-nowrap will-change-transform">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-2xl font-medium text-bone/80 md:text-4xl">
              {item}
            </span>
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
