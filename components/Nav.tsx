"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { scrollTo } from "./SmoothScroll";
import MagneticButton from "./MagneticButton";

const LINKS = [
  { label: "Work", target: "#work", id: "work" },
  { label: "Services", target: "#services", id: "services" },
  { label: "Process", target: "#process", id: "process" },
  { label: "FAQ", target: "#faq", id: "faq" },
];

export default function Nav() {
  const bar = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(0);
  // index the sliding pill should sit under (hover wins, else active)
  const [hovered, setHovered] = useState<number | null>(null);
  const [pill, setPill] = useState({ x: 0, w: 0, ready: false });

  // entrance + scroll state
  useEffect(() => {
    gsap.fromTo(
      bar.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // scroll-spy — highlight the section currently in view
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    ) as HTMLElement[];
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const i = LINKS.findIndex((l) => l.id === visible.target.id);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // measure the sliding indicator against the active / hovered item.
  // Uses offsetLeft/offsetWidth (relative to the nav) so it's immune to any
  // transform on ancestor elements — no getBoundingClientRect drift.
  const measure = (i: number) => {
    const el = itemRefs.current[i];
    if (!el) return;
    setPill({ x: el.offsetLeft, w: el.offsetWidth, ready: true });
  };

  useLayoutEffect(() => {
    const i = hovered ?? active;
    measure(i);
    const onResize = () => measure(hovered ?? active);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, hovered]);

  // re-measure once fonts settle so the pill lands precisely under the label
  useEffect(() => {
    const t = setTimeout(() => measure(active), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (t: string | number) => {
    setOpen(false);
    scrollTo(t);
  };

  return (
    <>
    <header
      ref={bar}
      className="fixed left-0 right-0 top-0 z-[90] flex items-center justify-between px-6 py-5 md:px-10"
    >
      <button
        onClick={() => go(0)}
        data-cursor="hover"
        className="relative z-[2] font-display text-2xl font-semibold tracking-tight"
      >
        M<sup className="text-gold">2</sup>L
      </button>

      {/* desktop pill — always legible glass, intensifies on scroll */}
      <nav
        ref={navRef}
        onMouseLeave={() => setHovered(null)}
        className={`relative hidden items-center gap-1 rounded-full p-1.5 transition-all duration-500 md:flex ${
          scrolled
            ? "glass shadow-[0_8px_40px_-12px_rgba(0,0,0,0.65)]"
            : "border border-bone/10 bg-ink/40 backdrop-blur-md"
        }`}
      >
        {/* sliding indicator — left/width only, inset-y handles vertical */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-1.5 rounded-full bg-gold/12 ring-1 ring-gold/30 transition-[left,width,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            left: pill.x,
            width: pill.w,
            opacity: pill.ready ? 1 : 0,
          }}
        />
        {LINKS.map((l, i) => {
          const isActive = i === active;
          return (
            <button
              key={l.label}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              onClick={() => go(l.target)}
              onMouseEnter={() => setHovered(i)}
              data-cursor="hover"
              className={`relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                isActive ? "text-gold" : "text-bone/75 hover:text-bone"
              }`}
            >
              {l.label}
            </button>
          );
        })}
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

      {/* mobile toggle (hidden while the sheet is open — sheet has its own X) */}
      <button
        onClick={() => setOpen(true)}
        className={`relative z-[2] flex h-10 w-10 flex-col items-center justify-center gap-1.5 transition-opacity md:hidden ${
          open ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-label="Open menu"
      >
        <span className="h-px w-6 bg-bone" />
        <span className="h-px w-6 bg-bone" />
      </button>
    </header>

    {/* ── Mobile menu — top-level overlay so it's never clamped by the
        header's stacking context. Dedicated solid backdrop div behind. ── */}
    <div
      className={`fixed inset-0 z-[105] md:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* solid backdrop div behind the menu */}
      <div
        className={`absolute inset-0 bg-ink transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* faint brand glow for depth */}
      <div
        className={`pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl transition-opacity duration-700 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* content */}
      <div className="relative flex h-full flex-col px-6 pb-10 pt-5">
        {/* header row: logo + close */}
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl font-semibold tracking-tight">
            M<sup className="text-gold">2</sup>L
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            data-cursor="hover"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/15 text-bone transition-colors hover:border-gold/50 hover:text-gold"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center gap-3">
          {LINKS.map((l, i) => (
            <button
              key={l.label}
              onClick={() => go(l.target)}
              data-cursor="hover"
              style={{ transitionDelay: open ? `${140 + i * 70}ms` : "0ms" }}
              className={`group flex items-baseline gap-4 border-b border-bone/10 pb-3 text-left font-display text-4xl font-medium transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              } ${i === active ? "text-gold" : "text-bone"}`}
            >
              <span className="font-sans text-xs tracking-widest text-haze">
                0{i + 1}
              </span>
              {l.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => go("#contact")}
          data-cursor="view"
          data-cursor-text="Go"
          style={{
            transitionDelay: open ? `${140 + LINKS.length * 70}ms` : "0ms",
          }}
          className={`mt-6 w-full rounded-full bg-gold py-4 text-center font-semibold text-black transition-all duration-500 ${
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Start Project
        </button>
      </div>
    </div>
    </>
  );
}
