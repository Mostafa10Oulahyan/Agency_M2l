"use client";

import { useEffect, useRef, ElementType, ReactNode } from "react";
import { gsap, ScrollTrigger, splitText } from "@/lib/gsap";

/**
 * SplitHeading — masks each character and reveals them on scroll with a
 * staggered upward slide + slight rotation. The mask comes from .split-word
 * having overflow hidden.
 */
export function SplitHeading({
  children,
  as: Tag = "h2",
  className = "",
  stagger = 0.018,
  delay = 0,
}: {
  children: string;
  as?: ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { chars, revert } = splitText(el);
    gsap.set(chars, { yPercent: 115, rotate: 4 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () =>
        gsap.to(chars, {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger,
          delay,
        }),
    });

    return () => {
      st.kill();
      revert();
    };
  }, [children, stagger, delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/**
 * Reveal — fade + blur + rise for arbitrary blocks on scroll.
 */
export function Reveal({
  children,
  className = "",
  y = 40,
  delay = 0,
  blur = true,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  blur?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y, filter: blur ? "blur(12px)" : "none" });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () =>
        gsap.to(el, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          delay,
        }),
    });
    return () => st.kill();
  }, [y, delay, blur]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
