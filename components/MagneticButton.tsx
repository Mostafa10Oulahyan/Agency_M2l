"use client";

import { useRef, ReactNode, MouseEvent } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
  cursorText?: string;
};

/**
 * Magnetic hover — the element eases toward the pointer, then snaps back with
 * an elastic release. Inner content is translated at a softer ratio for depth.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.4,
  onClick,
  as = "button",
  href,
  cursorText,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.6, ease: "power3" });
    gsap.to(inner.current, {
      x: x * strength * 0.4,
      y: y * strength * 0.4,
      duration: 0.6,
      ease: "power3",
    });
  };

  const onLeave = () => {
    gsap.to([ref.current, inner.current], {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const common = {
    ref: ref as never,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
    className,
    "data-cursor": "hover",
    "data-cursor-text": cursorText,
  };

  const content = (
    <span ref={inner} className="relative inline-flex items-center gap-2">
      {children}
    </span>
  );

  if (as === "a") {
    return (
      <a href={href} {...common}>
        {content}
      </a>
    );
  }
  return <button {...common}>{content}</button>;
}
