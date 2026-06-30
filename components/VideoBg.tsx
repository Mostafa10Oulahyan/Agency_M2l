"use client";

import { useEffect, useRef } from "react";

/**
 * Self-hosted looping video layer. Plays only while near the viewport
 * (IntersectionObserver) to protect performance, muted + inline for autoplay.
 */
export default function VideoBg({
  src,
  poster,
  className = "",
  overlay = true,
  opacity = 0.5,
}: {
  src: string;
  poster?: string;
  className?: string;
  overlay?: boolean;
  opacity?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.05 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={ref}
        className="h-full w-full object-cover"
        style={{ opacity }}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink" />
      )}
    </div>
  );
}
