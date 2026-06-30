"use client";

import { useState, useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Mosaic from "@/components/Mosaic";
import Trust from "@/components/Trust";
import Services from "@/components/Services";
import Showcase from "@/components/Showcase";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // lock scroll while preloader runs
  useEffect(() => {
    document.documentElement.style.overflow = loading ? "hidden" : "";
    if (!loading) {
      // recalc all triggers once content is revealed
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [loading]);

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <Cursor />
      <SmoothScroll>
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Manifesto />
          <Mosaic />
          <Services />
          <Showcase />
          <Trust />
          <Process />
          <WhyUs />
          <Testimonials />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
