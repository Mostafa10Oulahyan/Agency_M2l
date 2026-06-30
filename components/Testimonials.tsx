"use client";

import { SplitHeading, Reveal } from "./anim";
import { VIDEO, IMG } from "@/lib/assets";

const QUOTES = [
  { name: "Sara Lindqvist", role: "Founder, Aurora", text: "M²L produced a launch film that out-performed our agency work at a tenth of the cost.", img: IMG.founderPortrait },
  { name: "Marcus Bell", role: "CMO, Nova Energy", text: "We briefed on Monday and were running ads by Thursday. The speed is unreal.", img: IMG.contentCreator },
  { name: "Yuki Tanaka", role: "Brand Lead, Velou", text: "Every frame looked premium. Nobody could tell it was AI-assisted.", img: IMG.womanCreative },
  { name: "Diego Ramos", role: "Owner, Café Lumière", text: "Our reels finally look like a brand we're proud of. Bookings doubled.", img: IMG.creatorPhone },
  { name: "Hana Kovač", role: "Director, Atlas", text: "Product photography that would've cost a fortune — delivered overnight.", img: IMG.neonPortrait },
];

function Row({ data, reverse }: { data: typeof QUOTES; reverse?: boolean }) {
  return (
    <div className="group flex w-max gap-5">
      <div
        className={`flex w-max gap-5 ${reverse ? "animate-[scrollR_46s_linear_infinite]" : "animate-[scrollL_46s_linear_infinite]"} group-hover:[animation-play-state:paused]`}
      >
        {[...data, ...data].map((q, i) => (
          <figure key={i} data-cursor="hover" className="glass flex w-[330px] shrink-0 flex-col justify-between rounded-2xl p-6">
            <blockquote className="text-[15px] leading-relaxed text-bone/90">“{q.text}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <img src={q.img} alt={q.name} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
              <div>
                <div className="text-sm font-medium">{q.name}</div>
                <div className="text-xs text-haze">{q.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto mb-16 grid max-w-7xl items-end gap-10 px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <span className="eyebrow text-gold">Loved by clients</span>
          <SplitHeading className="statement mt-4 text-5xl md:text-7xl" stagger={0.01}>
            Don&apos;t take our word for it.
          </SplitHeading>
        </div>
        {/* featured reel */}
        <Reveal blur={false} className="justify-self-end">
          <div
            data-cursor="view"
            data-cursor-text="Play"
            className="relative aspect-[16/10] w-full max-w-sm overflow-hidden rounded-2xl border border-bone/12"
          >
            <video className="h-full w-full object-cover" src={VIDEO.reelTestimonial} autoPlay muted loop playsInline preload="none" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            <span className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.25em] text-bone/90">Client stories</span>
          </div>
        </Reveal>
      </div>

      <div className="flex flex-col gap-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <Row data={QUOTES} />
        <Row data={[...QUOTES].reverse()} reverse />
      </div>

      <style>{`
        @keyframes scrollL { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes scrollR { from { transform: translateX(-50%) } to { transform: translateX(0) } }
      `}</style>
    </section>
  );
}
