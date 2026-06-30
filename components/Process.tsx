"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SplitHeading } from "./anim";
import { IMG } from "@/lib/assets";

const STEPS = [
  { n: "01", title: "Discover", desc: "We dig into your brand, audience and goals to find the angle that wins.", img: IMG.agencyMeeting },
  { n: "02", title: "Strategy", desc: "A creative blueprint mapping every asset, platform and message.", img: IMG.creativeTeam },
  { n: "03", title: "AI Production", desc: "We generate visuals and video using the latest models — fast, at scale.", img: IMG.filmingSet },
  { n: "04", title: "Creative Direction", desc: "Human taste refines every frame to studio-quality polish.", img: IMG.editorStudio },
  { n: "05", title: "Delivery", desc: "Platform-ready files, optimized and packaged for launch day.", img: IMG.contentCreator },
  { n: "06", title: "Unlimited Revisions", desc: "We iterate until it's undeniably right. No extra cost.", img: IMG.womanCreative },
];

export default function Process() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proc-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".proc-list", start: "top 60%", end: "bottom 75%", scrub: true },
        }
      );
      gsap.utils.toArray<HTMLElement>(".proc-step").forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          y: 50,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 84%", once: true },
        });
        const dot = step.querySelector(".proc-dot");
        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          once: true,
          onEnter: () => gsap.to(dot, { backgroundColor: "#fdbf2d", scale: 1.5, duration: 0.4 }),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={root} className="relative bg-pine/15 px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 max-w-2xl">
          <span className="eyebrow text-gold">How it works</span>
          <SplitHeading className="statement mt-4 text-5xl md:text-7xl">
            From idea to impact in six moves.
          </SplitHeading>
        </div>

        <div className="proc-list relative pl-10 md:pl-0">
          <div className="absolute left-[7px] top-2 h-full w-px bg-bone/10 md:left-1/2">
            <div className="proc-line h-full w-full origin-top bg-gradient-to-b from-gold via-martian to-forest" />
          </div>

          <div className="flex flex-col gap-14 md:gap-24">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={`proc-step relative flex md:w-1/2 ${
                  i % 2 === 0 ? "md:self-start md:pr-14" : "md:self-end md:pl-14"
                }`}
              >
                <span
                  className={`proc-dot absolute top-2 h-3.5 w-3.5 rounded-full bg-bone/30 ${
                    i % 2 === 0
                      ? "-left-[34px] md:left-auto md:-right-[7px] md:translate-x-1/2"
                      : "-left-[34px] md:-left-[7px] md:-translate-x-1/2"
                  }`}
                />
                <div
                  className={`group flex w-full gap-5 ${i % 2 === 0 ? "md:flex-row-reverse md:text-right" : ""}`}
                >
                  <div
                    data-cursor="hover"
                    className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl border border-bone/10"
                  >
                    <img src={s.img} alt={s.title} className="cine-img h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-ink/30" />
                  </div>
                  <div>
                    <span className="font-display text-sm text-gold">{s.n}</span>
                    <h3 className="mt-1 font-display text-2xl font-medium md:text-4xl">{s.title}</h3>
                    <p className="mt-2 max-w-sm text-haze">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
