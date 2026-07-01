"use client";

import { useEffect, useState } from "react";
import { scrollTo } from "./SmoothScroll";

/**
 * Back-to-top control. Fades in after the user scrolls past the hero and
 * draws a gold progress ring tracking how far down the page they are.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setProgress(scrollable > 0 ? Math.min(1, y / scrollable) : 0);
      setVisible(y > 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const R = 21;
  const C = 2 * Math.PI * R;

  return (
    <button
      onClick={() => scrollTo(0)}
      data-cursor="hover"
      aria-label="Back to top"
      className={`group fixed bottom-6 right-6 z-[100] flex h-12 w-12 items-center justify-center rounded-full bg-ink/60 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:bottom-8 md:right-8 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {/* progress ring */}
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="rgba(244,241,234,0.12)"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
          className="transition-[stroke-dashoffset] duration-150 ease-linear"
        />
      </svg>

      {/* arrow */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className="relative text-bone transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-gold"
      >
        <path
          d="M12 19V5M12 5l-6 6M12 5l6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
