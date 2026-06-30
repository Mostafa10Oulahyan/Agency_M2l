"use client";

import { useEffect, useRef } from "react";
import { gsap, splitText } from "@/lib/gsap";
import { scrollTo } from "./SmoothScroll";
import MagneticButton from "./MagneticButton";
import VideoBg from "./VideoBg";
import { VIDEO, ASSET } from "@/lib/assets";
import { ArrowUpRight, Play } from "lucide-react";

const HOOK = ["ATTENTION", "EMOTION", "OBSESSION"];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const headings = gsap.utils.toArray<HTMLElement>(".hero-line");
      const allChars: HTMLElement[] = [];
      headings.forEach((h) => allChars.push(...splitText(h).chars));
      gsap.set(allChars, { yPercent: 120 });
      gsap.set(".hero-fade", { opacity: 0, y: 24 });
      gsap.set(".hero-frame", { opacity: 0, scale: 0.85, rotateY: -18 });

      const tl = gsap.timeline({ delay: 0.3 });
      tl.to(allChars, { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.012 });
      tl.to(".hero-frame", { opacity: 1, scale: 1, rotateY: 0, duration: 1.3, ease: "power3.out" }, "-=0.9");
      tl.to(".hero-fade", { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1 }, "-=0.9");

      // rotating hook word
      const hook = el.querySelector<HTMLElement>(".hook-word");
      let i = 0;
      const cycle = () => {
        i = (i + 1) % HOOK.length;
        gsap.to(hook, {
          yPercent: -100,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            if (hook) hook.textContent = HOOK[i];
            gsap.fromTo(
              hook,
              { yPercent: 100, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
            );
          },
        });
      };
      const interval = window.setInterval(cycle, 2200);

      // mouse parallax
      const move = (e: MouseEvent) => {
        const cx = (e.clientX / window.innerWidth - 0.5) * 2;
        const cy = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((node) => {
          const d = parseFloat(node.dataset.depth || "0");
          gsap.to(node, { x: cx * 90 * d, y: cy * 90 * d, duration: 1, ease: "power3" });
        });
      };
      window.addEventListener("mousemove", move);

      // scroll fade
      gsap.to(".hero-content", {
        yPercent: -14,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-frame-wrap", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });

      return () => {
        window.removeEventListener("mousemove", move);
        window.clearInterval(interval);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-28 md:px-10"
    >
      <VideoBg src={VIDEO.tech} opacity={0.42} />
      <div
        data-depth="0.1"
        className="glow"
        style={{ width: 520, height: 520, top: "6%", left: "2%", background: "radial-gradient(circle, rgba(0,49,82,0.8), transparent 70%)" }}
      />
      <div
        data-depth="0.06"
        className="glow"
        style={{ width: 420, height: 420, bottom: "8%", right: "6%", background: "radial-gradient(circle, rgba(153,204,51,0.18), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
        {/* left — type */}
        <div className="hero-content">
          <div className="hero-fade mb-7 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-martian opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-martian" />
            </span>
            <span className="eyebrow text-bone/80">AI Creative Agency · Worldwide</span>
          </div>

          <h1 className="display-hero text-[14vw] leading-[0.85] sm:text-[11vw] lg:text-[7.5rem]">
            <span className="hero-line block overflow-hidden">We turn scrolls</span>
            <span className="hero-line block overflow-hidden">into</span>
            <span className="block overflow-hidden">
              <span className="inline-flex overflow-hidden align-bottom">
                <span className="hook-word text-gradient-gold inline-block">ATTENTION</span>
              </span>
              <span className="hero-line inline-block">.</span>
            </span>
          </h1>

          <p className="hero-fade mt-8 max-w-lg text-balance text-base text-haze md:text-lg">
            M²L produces studio-grade videos, posters, photography and campaigns
            with AI — built to stop the scroll and grow your brand on every platform.
          </p>

          <div className="hero-fade mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <MagneticButton
              onClick={() => scrollTo("#contact")}
              cursorText="Go"
              className="group flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-semibold text-black transition-colors hover:bg-citron"
            >
              Start Your Project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollTo("#work")}
              cursorText="Play"
              className="group flex items-center gap-2 rounded-full border border-bone/15 px-8 py-4 font-medium text-bone transition-colors hover:border-mist/40 hover:text-mist"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              See Our Work
            </MagneticButton>
          </div>
        </div>

        {/* right — real reel in a device frame */}
        <div className="hero-frame-wrap relative hidden justify-center lg:flex">
          <div data-depth="0.14" className="hero-frame relative" style={{ transformStyle: "preserve-3d" }}>
            <div className="relative aspect-[9/18] w-[230px] overflow-hidden rounded-[2.2rem] border border-bone/15 bg-black p-1.5 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)]">
              <div className="absolute left-1/2 top-3 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-bone/20" />
              <video
                className="h-full w-full rounded-[1.8rem] object-cover"
                src={VIDEO.reelSocial}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
            {/* floating still */}
            <div
              data-depth="0.2"
              className="absolute -left-20 top-10 hidden h-28 w-20 rotate-[-8deg] overflow-hidden rounded-xl border border-bone/15 shadow-2xl xl:block"
            >
              <img src={ASSET.socialGlow} alt="" className="h-full w-full object-cover" />
            </div>
            <div
              data-depth="0.18"
              className="absolute -right-16 bottom-12 hidden h-24 w-24 rotate-[7deg] overflow-hidden rounded-xl border border-bone/15 shadow-2xl xl:block"
            >
              <img src={ASSET.appContent} alt="" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="hero-fade absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-haze">Scroll</span>
        <div className="h-10 w-px overflow-hidden bg-bone/10">
          <div className="h-1/2 w-full animate-[scrollcue_1.8s_ease-in-out_infinite] bg-gold" />
        </div>
      </div>

      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}
