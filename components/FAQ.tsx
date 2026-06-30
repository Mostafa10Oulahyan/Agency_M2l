"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { SplitHeading, Reveal } from "./anim";

const FAQS = [
  { q: "What exactly does M²L deliver?", a: "Anything visual: reels, ads, posters, AI product photography, commercial videos, branding, motion graphics, avatars, thumbnails, voiceovers and full campaigns — all production-ready for the platforms you choose." },
  { q: "How fast can I get my content?", a: "Most single assets land within 24–72 hours. Larger campaigns are scoped during discovery, but our AI-driven pipeline is dramatically faster than traditional studios." },
  { q: "Is the work really made with AI?", a: "Yes — we use the latest generative models, then a human creative director refines every output. The result is studio-quality work that never feels synthetic." },
  { q: "Do you offer revisions?", a: "Unlimited revisions are included until the work is undeniably right. We iterate at no extra cost." },
  { q: "How much does it cost?", a: "Far less than a traditional agency. Pricing depends on scope and volume — tell us your goal and we'll send a tailored quote within a day." },
  { q: "Can you match my brand identity?", a: "Absolutely. Share your guidelines, references or existing assets and we'll lock every output to your visual language." },
];

function Item({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  const body = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-bone/10">
      <button
        onClick={() => setOpen((v) => !v)}
        data-cursor="hover"
        className="flex w-full items-center justify-between gap-6 py-7 text-left"
      >
        <span className="flex items-baseline gap-5">
          <span className="font-display text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
          <span className="font-display text-xl font-medium md:text-2xl">{q}</span>
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bone/15 transition-all duration-500 ${
            open ? "rotate-45 bg-gold text-black" : "text-bone"
          }`}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <div
        ref={body}
        className="grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-7 pl-10 text-haze">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="eyebrow text-gold">FAQ</span>
          <SplitHeading className="display-hero mt-4 text-4xl md:text-6xl">
            Questions, answered.
          </SplitHeading>
          <p className="mt-6 max-w-xs text-haze">
            Still curious? Start a project and we&apos;ll walk you through everything.
          </p>
        </div>
        <Reveal blur={false}>
          <div>
            {FAQS.map((f, i) => (
              <Item key={f.q} {...f} i={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
