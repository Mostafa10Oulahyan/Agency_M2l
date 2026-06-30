"use client";

import { scrollTo } from "./SmoothScroll";
import { ArrowUp } from "lucide-react";
import { FaInstagram, FaTiktok, FaYoutube, FaXTwitter, FaBehance } from "react-icons/fa6";

const SOCIALS = [
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaTiktok, label: "TikTok" },
  { icon: FaYoutube, label: "YouTube" },
  { icon: FaXTwitter, label: "X" },
  { icon: FaBehance, label: "Behance" },
];

const NAV = [
  { h: "Studio", links: ["About", "Work", "Process", "Careers"] },
  { h: "Services", links: ["AI Video", "Photography", "Branding", "Campaigns"] },
  { h: "Connect", links: ["Start a Project", "Contact", "Newsletter", "Press"] },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-pine/20 px-6 pb-10 pt-20 md:px-10">
      {/* gradient divider glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <button
              onClick={() => scrollTo(0)}
              className="font-display text-5xl font-semibold tracking-tight"
              data-cursor="hover"
            >
              M<sup className="text-gold">2</sup>L
            </button>
            <p className="mt-4 max-w-xs text-haze">
              Create Anything. Dominate Every Platform. Premium AI-generated
              content for brands that refuse to blend in.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    data-cursor="hover"
                    className="group flex h-11 w-11 items-center justify-center rounded-full border border-bone/12 transition-all duration-400 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-black"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {NAV.map((col) => (
            <div key={col.h}>
              <h4 className="eyebrow text-haze">{col.h}</h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      data-cursor="hover"
                      className="group inline-flex items-center text-bone/80 transition-colors hover:text-gold"
                    >
                      <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:mr-2 group-hover:w-4" />
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* oversized wordmark */}
        <div className="pointer-events-none mt-16 select-none">
          <span className="block text-center font-display text-[22vw] font-semibold leading-none text-bone/[0.04]">
            M²L
          </span>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-bone/10 pt-8 text-sm text-haze md:flex-row">
          <span>© {2026} M²L Studio. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" data-cursor="hover" className="hover:text-bone">Privacy</a>
            <a href="#" data-cursor="hover" className="hover:text-bone">Terms</a>
            <button
              onClick={() => scrollTo(0)}
              data-cursor="hover"
              className="group flex items-center gap-2 hover:text-gold"
            >
              Back to top
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-bone/15 transition-all group-hover:-translate-y-1 group-hover:border-gold">
                <ArrowUp className="h-3.5 w-3.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
