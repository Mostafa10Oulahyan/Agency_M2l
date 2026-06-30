"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { scrollTo } from "./SmoothScroll";
import MagneticButton from "./MagneticButton";

const LINKS = [
  { label: "Work", target: "#work" },
  { label: "Services", target: "#services" },
  { label: "Process", target: "#process" },
  { label: "FAQ", target: "#faq" },
];

export default function Nav() {
  const bar = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      bar.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (t: string | number) => {
    setOpen(false);
    scrollTo(t);
  };

  return (
    <header
      ref={bar}
      className="fixed left-0 right-0 top-0 z-[90] flex items-center justify-between px-6 py-5 md:px-10"
    >
      <button
        onClick={() => go(0)}
        data-cursor="hover"
        className="font-display text-2xl font-semibold tracking-tight"
      >
        M<sup className="text-gold">2</sup>L
      </button>

      {/* desktop pill */}
      <nav
        className={`hidden items-center gap-1 rounded-full px-2 py-2 transition-all duration-500 md:flex ${
          scrolled ? "glass" : "bg-transparent"
        }`}
      >
        {LINKS.map((l) => (
          <button
            key={l.label}
            onClick={() => go(l.target)}
            data-cursor="hover"
            className="group relative rounded-full px-4 py-2 text-sm text-bone/70 transition-colors hover:text-bone"
          >
            <span className="relative z-10">{l.label}</span>
            <span className="absolute inset-0 scale-90 rounded-full bg-azure/0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:bg-azure/60 group-hover:opacity-100" />
          </button>
        ))}
      </nav>

      <div className="hidden md:block">
        <MagneticButton
          onClick={() => go("#contact")}
          cursorText="Go"
          className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-citron"
        >
          Start Project
        </MagneticButton>
      </div>

      {/* mobile toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        aria-label="Menu"
      >
        <span
          className={`h-px w-6 bg-bone transition-all duration-300 ${
            open ? "translate-y-[3px] rotate-45" : ""
          }`}
        />
        <span
          className={`h-px w-6 bg-bone transition-all duration-300 ${
            open ? "-translate-y-[3px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* mobile sheet */}
      <div
        className={`fixed inset-0 z-[-1] flex flex-col items-center justify-center gap-2 bg-ink/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {LINKS.map((l) => (
          <button
            key={l.label}
            onClick={() => go(l.target)}
            className="font-display text-4xl font-medium text-bone"
          >
            {l.label}
          </button>
        ))}
        <button
          onClick={() => go("#contact")}
          className="mt-6 rounded-full bg-gold px-8 py-4 font-semibold text-black"
        >
          Start Project
        </button>
      </div>
    </header>
  );
}
