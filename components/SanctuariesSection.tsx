'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const sanctuaries = [
  {
    id: '01',
    title: 'Oceanfront Villa',
    subtitle: 'Private Infinity Horizon & Basalt Stone Showers',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop',
    specs: '4,200 sq ft • 3 Bedrooms • Direct Reef Access',
  },
  {
    id: '02',
    title: 'Canopy Suite',
    subtitle: 'Suspended Amidst Old-Growth Palms Facing Sunset Breakers',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop',
    specs: '2,800 sq ft • 2 Bedrooms • Private Plunge Pool',
  },
  {
    id: '03',
    title: 'Private Cove Sanctuary',
    subtitle: 'Secluded Volcanic Peninsula Villa With Private Yacht Mooring',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop',
    specs: '5,600 sq ft • 4 Bedrooms • Private Helipad & Dock',
  },
];

export default function SanctuariesSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined' || !containerRef.current || !targetRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const getScrollAmount = () => {
        if (!containerRef.current) return 0;
        return -(containerRef.current.scrollWidth - window.innerWidth + 48);
      };

      // Pinned horizontal scroll animation with zero trailing whitespace
      gsap.to(containerRef.current, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: targetRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${Math.abs(getScrollAmount())}`,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: targetRef }
  );

  return (
    <section
      id="sanctuaries-horizontal-scroll"
      ref={targetRef}
      className="relative h-screen bg-white overflow-hidden z-20"
    >
      {/* Section Header Fixed Overlay */}
      <div className="absolute top-12 left-8 md:left-16 z-30 pointer-events-none">
        <span className="text-xs font-semibold font-mono uppercase tracking-[0.4em] text-zinc-500 block mb-2">
          02 &bull; Sanctuaries
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-zinc-900">
          Private Living
        </h2>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={containerRef}
        className="flex w-max h-full items-center pl-8 md:pl-16 pr-16 md:pr-24 gap-12 md:gap-20 pt-20"
      >
        {sanctuaries.map((item) => (
          <div
            key={item.id}
            className="w-[85vw] sm:w-[75vw] md:w-[70vw] lg:w-[60vw] h-[75vh] md:h-[72vh] flex-shrink-0 flex flex-col justify-between group cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative w-full h-[60%] sm:h-[70%] md:h-[78%] overflow-hidden rounded-2xl bg-stone-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority
                sizes="(max-width: 768px) 85vw, 60vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300 shadow-lg">
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* Content & Typography */}
            <div className="space-y-1.5 md:space-y-2 pt-3 md:pt-4 border-t border-zinc-200">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-zinc-900 tracking-tight">
                  <span className="text-zinc-400 font-mono text-base sm:text-2xl mr-3 sm:mr-4">{item.id}</span>
                  {item.title}
                </h3>
              </div>
              <p className="text-xs sm:text-base text-zinc-500 font-light leading-relaxed max-w-2xl">
                {item.subtitle}
              </p>
              <p className="text-xs sm:text-sm font-semibold font-mono tracking-widest text-zinc-600 uppercase">
                {item.specs}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
