"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Dual-layer cursor: a precise dot + a lagging ring. Grows and labels itself
 * over interactive elements tagged with [data-cursor].
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    document.body.classList.add("has-cursor");

    const xTo = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });
    const dxTo = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dyTo = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dxTo(e.clientX);
      dyTo(e.clientY);
    };

    const setState = (state: string | null, text = "") => {
      if (!ring.current || !label.current) return;
      label.current.textContent = text;
      gsap.to(ring.current, {
        scale: state === "view" ? 2.6 : state === "hover" ? 1.8 : 1,
        backgroundColor:
          state === "view"
            ? "rgba(253,191,45,1)"
            : state === "hover"
            ? "rgba(173,223,241,0.12)"
            : "rgba(173,223,241,0)",
        borderColor:
          state === "view" ? "rgba(253,191,45,0)" : "rgba(173,223,241,0.5)",
        duration: 0.4,
        ease: "power3",
      });
      gsap.to(dot.current, { scale: state ? 0 : 1, duration: 0.3 });
    };

    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("[data-cursor]");
      if (t) {
        const type = t.getAttribute("data-cursor");
        setState(type, t.getAttribute("data-cursor-text") || "");
      }
    };
    const out = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("[data-cursor]");
      if (t) setState(null);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={ring}
        className="absolute -left-5 -top-5 flex h-10 w-10 items-center justify-center rounded-full border"
        style={{ borderColor: "rgba(173,223,241,0.5)" }}
      >
        <span
          ref={label}
          className="font-display text-[9px] font-semibold uppercase tracking-widest text-black"
        />
      </div>
      <div
        ref={dot}
        className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-gold"
      />
    </div>
  );
}
