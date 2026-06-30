"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
}

export { gsap, ScrollTrigger };

/**
 * Lightweight text splitter — wraps each word and character in spans so we can
 * animate them individually (a dependency-free stand-in for SplitText).
 * Returns flat arrays of the generated elements for GSAP targeting.
 */
export function splitText(el: HTMLElement): {
  chars: HTMLElement[];
  words: HTMLElement[];
  revert: () => void;
} {
  const original = el.innerHTML;
  const source = el.textContent ?? "";
  const words = source.split(/(\s+)/); // keep whitespace tokens
  el.innerHTML = "";

  const wordEls: HTMLElement[] = [];
  const charEls: HTMLElement[] = [];

  words.forEach((token) => {
    if (token.trim() === "") {
      el.appendChild(document.createTextNode(token));
      return;
    }
    const wordSpan = document.createElement("span");
    wordSpan.className = "split-word";
    wordSpan.style.display = "inline-block";
    wordSpan.style.overflow = "hidden";
    wordSpan.style.verticalAlign = "top";

    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";

    token.split("").forEach((ch) => {
      const c = document.createElement("span");
      c.className = "split-char";
      c.style.display = "inline-block";
      c.style.willChange = "transform";
      c.textContent = ch;
      inner.appendChild(c);
      charEls.push(c);
    });

    wordSpan.appendChild(inner);
    el.appendChild(wordSpan);
    wordEls.push(inner);
  });

  return {
    chars: charEls,
    words: wordEls,
    revert: () => {
      el.innerHTML = original;
    },
  };
}
