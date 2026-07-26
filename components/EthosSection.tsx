'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const statement = "Where the wild jungle surrenders to the tide. You are on ocean time now.";

export default function EthosSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      if (typeof window === 'undefined' || !containerRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const words = wordsRef.current.filter(Boolean);

      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'center 45%',
          scrub: 1,
        },
      }).to(words, {
        color: '#18181b', // zinc-900
        opacity: 1,
        stagger: 0.1,
        ease: 'power1.inOut',
      });
    },
    { scope: containerRef }
  );

  const wordsArray = statement.split(' ');

  return (
    <section
      id="ethos-section"
      ref={containerRef}
      className="relative min-h-screen bg-white text-zinc-900 flex flex-col items-center justify-center px-5 sm:px-8 py-20 md:py-32 z-20"
    >
      <div className="max-w-6xl mx-auto text-center space-y-8 sm:space-y-12">
        <span className="text-xs font-semibold font-mono uppercase tracking-[0.4em] text-zinc-500 block">
          01 &bull; The Ethos
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.35] sm:leading-[1.25] md:leading-[1.2] text-stone-300 select-none">
          {wordsArray.map((word, i) => (
            <span
              key={i}
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              className="inline-block mr-[0.2em] sm:mr-[0.28em] opacity-30 transition-colors duration-200"
            >
              {word}
            </span>
          ))}
        </h2>

        <div className="pt-8 flex flex-col items-center gap-3">
          <div className="w-14 h-[1px] bg-zinc-400/80" />
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-semibold font-mono">
            Wildfern Sanctuary &bull; Guanacaste Coast
          </p>
        </div>
      </div>
    </section>
  );
}
