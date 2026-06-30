"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ASSET, IMG, VIDEO } from "@/lib/assets";

type Panel = {
  n: string;
  title: string;
  feeling: string;
  desc: string;
  media: string;
  video?: boolean;
};

const PANELS: Panel[] = [
  { n: "01", title: "Instagram", feeling: "Feeling Seen", desc: "Posts, reels & story sets engineered for the algorithm.", media: ASSET.socialGlow },
  { n: "02", title: "TikTok", feeling: "Feeling Viral", desc: "Native short-form built to be shared, not skipped.", media: VIDEO.reelSocial, video: true },
  { n: "03", title: "YouTube", feeling: "Feeling Watched", desc: "Shorts, ads & thumbnails tuned for watch-time.", media: IMG.creatorPhone },
  { n: "04", title: "AI Photography", feeling: "Feeling Premium", desc: "Studio-grade product imagery, no studio required.", media: IMG.productLux },
  { n: "05", title: "Branding", feeling: "Feeling Iconic", desc: "Identity systems with cinematic, editorial depth.", media: ASSET.poster },
  { n: "06", title: "Campaigns", feeling: "Feeling Unmissable", desc: "Full-funnel creative from hook to conversion.", media: ASSET.billboard },
];

export default function Services() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const t = track.current;
    if (!el || !t) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const distance = () => t.scrollWidth - window.innerWidth;
        const tween = gsap.to(t, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>(".sv-media").forEach((m) => {
          gsap.fromTo(
            m,
            { scale: 1.3, xPercent: -8 },
            {
              scale: 1.05,
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: m.closest(".sv-panel"),
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={root} className="relative overflow-hidden">
      <div ref={track} className="flex h-[100svh] w-max">
        {/* intro panel */}
        <div className="sv-panel relative flex h-full w-[88vw] shrink-0 flex-col justify-center px-6 sm:w-[46vw] md:px-12">
          <span className="eyebrow text-gold">What we make</span>
          <h2 className="statement mt-5 text-6xl leading-[0.9] md:text-7xl">
            Every<br />platform.<br /><span className="text-outline">Mastered.</span>
          </h2>
          <p className="mt-6 max-w-xs text-haze">
            Drag through six disciplines — each one a different way to make your
            audience feel something. Scroll to travel →
          </p>
        </div>

        {PANELS.map((p) => (
          <article
            key={p.n}
            className="sv-panel group relative flex h-full w-[88vw] shrink-0 items-end overflow-hidden sm:w-[52vw] md:w-[40vw]"
          >
            <div className="sv-media absolute inset-0 will-change-transform">
              {p.video ? (
                <video className="h-full w-full object-cover" src={p.media} muted loop autoPlay playsInline preload="none" />
              ) : (
                <img src={p.media} alt={p.title} className="cine-img h-full w-full object-cover" loading="lazy" />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
            <div className="absolute inset-0 border-r border-bone/10" />

            <div className="relative z-10 p-7 md:p-10">
              <span className="font-display text-sm text-gold">{p.n}</span>
              <div className="mt-3 overflow-hidden">
                <span className="block text-xs uppercase tracking-[0.3em] text-mist">{p.feeling}</span>
              </div>
              <h3 className="statement mt-2 text-4xl md:text-6xl">{p.title}</h3>
              <p className="mt-3 max-w-xs text-sm text-haze opacity-0 transition-all duration-500 group-hover:opacity-100">
                {p.desc}
              </p>
              <div className="mt-5 h-px w-0 bg-gold transition-all duration-700 group-hover:w-24" />
            </div>
          </article>
        ))}

        {/* outro panel */}
        <div className="sv-panel relative flex h-full w-[88vw] shrink-0 flex-col items-center justify-center bg-azure/20 px-6 text-center sm:w-[40vw]">
          <span className="statement text-7xl text-gradient-gold">+11</span>
          <p className="mt-4 max-w-[16rem] text-haze">
            more services — motion design, avatars, voiceovers, presentations &
            creative strategy.
          </p>
        </div>
      </div>
    </section>
  );
}
