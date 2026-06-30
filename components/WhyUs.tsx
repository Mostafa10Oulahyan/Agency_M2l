"use client";

import { Reveal, SplitHeading } from "./anim";
import { Zap, Award, Cpu, HeartHandshake, BadgeDollarSign, Infinity as Inf } from "lucide-react";

const REASONS = [
  { icon: Zap, title: "Fast Delivery", desc: "Concepts in hours, finished assets in days — not weeks.", span: "md:col-span-2" },
  { icon: Award, title: "Professional Results", desc: "Agency-grade craft on every single frame.", span: "" },
  { icon: Cpu, title: "Latest AI Models", desc: "We run the newest generative tools the moment they ship.", span: "" },
  { icon: HeartHandshake, title: "Human Quality", desc: "Real creative directors guide the machine, so it never looks synthetic.", span: "md:col-span-2" },
  { icon: BadgeDollarSign, title: "Affordable Pricing", desc: "Studio output without the studio invoice.", span: "" },
  { icon: Inf, title: "Unlimited Creativity", desc: "No format we can't make, no idea too ambitious.", span: "md:col-span-2" },
];

export default function WhyUs() {
  return (
    <section className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <span className="eyebrow text-gold">Why M²L</span>
          <SplitHeading className="display-hero mt-4 text-5xl md:text-7xl">
            Built different. On purpose.
          </SplitHeading>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.title} delay={(i % 3) * 0.06} blur={false} className={r.span}>
                <div
                  data-cursor="hover"
                  className="group relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-3xl border border-bone/8 bg-azure/15 p-8 transition-all duration-500 hover:border-martian/40 hover:bg-azure/30"
                >
                  <div
                    className="glow opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{ width: 200, height: 200, top: -40, right: -40, background: "radial-gradient(circle, rgba(153,204,51,0.25), transparent 70%)" }}
                  />
                  <Icon className="relative h-7 w-7 text-martian" />
                  <div className="relative">
                    <h3 className="font-display text-2xl font-medium">{r.title}</h3>
                    <p className="mt-2 max-w-md text-haze">{r.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
