"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const WORDS = ["CREATE", "DESIGN", "ANIMATE", "LAUNCH", "DOMINATE"];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counterObj = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          // reveal transition
          gsap.to(root.current, {
            yPercent: -100,
            duration: 1.1,
            ease: "power4.inOut",
            onComplete: onDone,
          });
        },
      });

      // logo strokes in
      tl.from(logoRef.current, {
        scale: 0.7,
        opacity: 0,
        filter: "blur(20px)",
        duration: 1,
        ease: "power3.out",
      });

      // count up + word cycling
      tl.to(
        counterObj,
        {
          v: 100,
          duration: 3.4,
          ease: "power2.inOut",
          onUpdate: () => {
            const val = Math.round(counterObj.v);
            setProgress(val);
            if (counter.current)
              counter.current.textContent = String(val).padStart(3, "0");
            if (barRef.current)
              barRef.current.style.transform = `scaleX(${counterObj.v / 100})`;
          },
        },
        "-=0.5"
      );

      // word swap synced to progress
      WORDS.forEach((_, i) => {
        tl.to(
          wordRef.current,
          {
            yPercent: -100 * i,
            duration: 0.5,
            ease: "power3.inOut",
          },
          0.7 + i * 0.62
        );
      });

      // logo out before reveal
      tl.to(
        [logoRef.current, counter.current, ".pl-fade"],
        { opacity: 0, y: -20, duration: 0.5, ease: "power3.in" },
        "-=0.2"
      );
    }, root);

    return () => ctx.revert();
  }, [onDone]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
    >
      {/* ambient glow */}
      <div
        className="glow"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(0,49,82,0.6), transparent 70%)",
        }}
      />

      <div ref={logoRef} className="relative mb-10">
        <span className="font-display text-7xl font-semibold tracking-tight md:text-8xl">
          M<sup className="text-gradient-gold text-3xl md:text-4xl">2</sup>L
        </span>
      </div>

      <div className="pl-fade relative h-7 overflow-hidden">
        <div ref={wordRef}>
          {WORDS.map((w) => (
            <div
              key={w}
              className="flex h-7 items-center justify-center font-display text-sm font-medium uppercase tracking-[0.45em] text-haze"
            >
              {w}
            </div>
          ))}
        </div>
      </div>

      {/* progress bar */}
      <div className="pl-fade mt-10 h-px w-56 overflow-hidden bg-bone/10">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-gradient-to-r from-gold to-martian"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <div className="pl-fade absolute bottom-10 left-0 right-0 flex items-end justify-between px-6 md:px-12">
        <span className="eyebrow text-haze">M²L Studio</span>
        <span className="font-display text-5xl font-semibold tabular-nums text-bone/90 md:text-7xl">
          <span ref={counter}>000</span>
          <span className="text-gold">%</span>
        </span>
      </div>
    </div>
  );
}
