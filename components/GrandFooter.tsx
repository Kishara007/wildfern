'use client';

import React, { useRef } from 'react';
import { Compass, MoveRight, ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GrandFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined' || !footerRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      // Smooth subtle parallax reveal on footer heading
      gsap.fromTo(
        footerRef.current.querySelector('.footer-heading'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer
      id="grand-footer"
      ref={footerRef}
      className="relative min-h-[90vh] bg-zinc-950 text-white px-5 sm:px-10 py-16 sm:py-24 md:px-16 lg:px-24 flex flex-col justify-between z-30 overflow-hidden"
    >
      {/* Background Decorative Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/10 blur-[160px] rounded-full pointer-events-none" />

      {/* Top Header Row */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/10 pb-8">
        <div className="flex items-center gap-3">
          <Compass className="w-6 h-6 text-white animate-spin-slow" />
          <span className="text-sm font-semibold tracking-[0.3em] uppercase text-white">
            Wildfern
          </span>
        </div>
        <span className="text-xs font-mono tracking-widest text-stone-400 uppercase">
          Costa Rica &bull; LAT 48° N
        </span>
      </div>

      {/* Center Statement & Reservation CTA */}
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center my-auto py-12 sm:py-16 space-y-8 sm:space-y-10 footer-heading">
        <span className="text-xs font-mono uppercase tracking-[0.4em] text-emerald-400 block">
          Your Horizon Awaits
        </span>

        <h2 className="font-serif text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tight sm:tracking-tighter uppercase leading-tight sm:leading-none text-transparent bg-clip-text bg-gradient-to-b from-stone-100 via-stone-200 to-stone-500">
          Chase the Sun.
        </h2>

        {/* Balanced Centered Button Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-6 pt-4 w-full max-w-xs sm:max-w-xl mx-auto">
          <button className="w-full sm:w-auto flex items-center justify-center gap-2.5 sm:gap-3 px-5 py-4 sm:px-10 sm:py-5 rounded-full bg-white text-zinc-950 font-semibold text-[11px] sm:text-xs tracking-wider sm:tracking-widest uppercase hover:bg-stone-200 transition-all duration-300 hover:gap-5 shadow-2xl whitespace-nowrap">
            <span>Reserve Your Villa</span>
            <MoveRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-4 sm:px-8 sm:py-5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[11px] sm:text-xs font-medium tracking-wider sm:tracking-widest uppercase text-stone-200 hover:bg-white/20 hover:text-white transition-all duration-300 shadow-xl whitespace-nowrap"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Back To Top</span>
          </button>
        </div>
      </div>

      {/* Bottom Footer Navigation & Copyright */}
      <div className="max-w-7xl mx-auto w-full pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-stone-400 gap-6">
        <p>&copy; {new Date().getFullYear()} Wildfern Resort & Sanctuary. All rights reserved.</p>

        <div className="flex items-center gap-8 font-mono text-[11px] tracking-wider uppercase text-stone-400">
          <a href="#expedition" className="hover:text-white transition-colors">Sanctuaries</a>
          <a href="#experiences-hover-list" className="hover:text-white transition-colors">Experiences</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Coordinates</a>
        </div>
      </div>
    </footer>
  );
}
