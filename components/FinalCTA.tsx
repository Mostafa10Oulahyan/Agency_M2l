"use client";

import { useEffect, useRef } from "react";
import { gsap, splitText } from "@/lib/gsap";
import { scrollTo } from "./SmoothScroll";
import MagneticButton from "./MagneticButton";
import VideoBg from "./VideoBg";
import { VIDEO } from "@/lib/assets";
import { ArrowUpRight } from "lucide-react";

export default function FinalCTA() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".cta-line");
      const chars: HTMLElement[] = [];
      lines.forEach((l) => chars.push(...splitText(l).chars));
      gsap.set(chars, { yPercent: 120, opacity: 0 });
      gsap.to(chars, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.02,
        scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
      });
      gsap.to(".cta-glow", { scale: 1.15, opacity: 0.9, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.from(".cta-mark", {
        opacity: 0,
        scale: 1.3,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 60%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={root}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center"
    >
      <VideoBg src={VIDEO.tech} opacity={0.22} />
      <div
        className="cta-glow glow"
        style={{ width: 700, height: 700, background: "radial-gradient(circle, rgba(0,49,82,0.85) 0%, rgba(153,204,51,0.12) 50%, transparent 72%)" }}
      />

      {/* giant wordmark behind */}
      <span className="cta-mark pointer-events-none absolute select-none font-display text-[40vw] font-semibold leading-none text-bone/[0.04]">
        M²L
      </span>

      <span className="eyebrow relative mb-8 text-gold">Let&apos;s create</span>
      <h2 className="statement relative text-[12vw] leading-[0.9] md:text-[8rem]">
        <span className="cta-line block overflow-hidden">Ready to make</span>
        <span className="cta-line block overflow-hidden">
          something <span className="text-gradient-gold">unforgettable?</span>
        </span>
      </h2>

      <p className="relative mt-8 max-w-lg text-balance text-haze md:text-lg">
        Let&apos;s build your next viral campaign. One brief is all it takes to
        start dominating every platform.
      </p>

      <div className="relative mt-12">
        <MagneticButton
          onClick={() => scrollTo(document.body.scrollHeight)}
          strength={0.5}
          cursorText="Go"
          className="group flex items-center gap-3 rounded-full bg-gold px-12 py-6 text-lg font-semibold text-black shadow-[0_0_60px_-10px_rgba(253,191,45,0.6)] transition-colors hover:bg-citron"
        >
          Start Your Project
          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </MagneticButton>
      </div>

      <p className="relative mt-8 text-sm text-haze">
        or email <span className="text-bone underline decoration-gold underline-offset-4">hello@m2l.studio</span>
      </p>
    </section>
  );
}
