'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Compass, ArrowDown, Menu, X } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const bigShipRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined' || !heroContainerRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
          invalidateOnRefresh: true,
        },
      });

      // Unified smooth leftward sailing motion across all screen sizes (mobile & desktop)
      tl.to(bgLayerRef.current, { y: '8%', ease: 'power1.out' }, 0)
        .to(heroTextRef.current, { y: '-70%', opacity: 0, ease: 'sine.inOut' }, 0)
        .to(bigShipRef.current, { x: '-55%', y: '-22%', ease: 'sine.inOut' }, 0);
    },
    { scope: heroContainerRef }
  );

  return (
    <motion.section
      ref={heroContainerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="relative w-full h-screen overflow-hidden bg-black select-none"
    >
      {/* Top Header Dark Gradient Overlay for Maximum Contrast - z-45 */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none z-45" />

      {/* Editorial Navigation Overlay - z-50 */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 sm:px-10 py-6 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3 bg-black/50 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full shadow-2xl">
          <Compass className="w-5 h-5 text-white animate-spin-slow" />
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-white">
            Wildfern
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-[0.25em] uppercase text-stone-200 bg-black/55 backdrop-blur-md border border-white/15 px-7 py-3 rounded-full shadow-2xl">
          <a href="#ethos-section" className="hover:text-emerald-400 transition-colors duration-300">
            Ethos
          </a>
          <a href="#sanctuaries-horizontal-scroll" className="hover:text-emerald-400 transition-colors duration-300">
            Sanctuaries
          </a>
          <a href="#experiences-hover-list" className="hover:text-emerald-400 transition-colors duration-300">
            Experiences
          </a>
        </div>

        {/* Mobile Navigation Toggle Button */}
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="md:hidden flex items-center justify-center p-2.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-white shadow-2xl focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Glassmorphic Dropdown Overlay */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-20 left-6 right-6 z-50 md:hidden bg-zinc-950/90 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-6"
          >
            <a
              href="#ethos-section"
              onClick={() => setIsMobileNavOpen(false)}
              className="text-sm font-semibold tracking-[0.3em] uppercase text-stone-200 hover:text-emerald-400 py-2 transition-colors"
            >
              Ethos
            </a>
            <div className="w-12 h-[1px] bg-white/10" />
            <a
              href="#sanctuaries-horizontal-scroll"
              onClick={() => setIsMobileNavOpen(false)}
              className="text-sm font-semibold tracking-[0.3em] uppercase text-stone-200 hover:text-emerald-400 py-2 transition-colors"
            >
              Sanctuaries
            </a>
            <div className="w-12 h-[1px] bg-white/10" />
            <a
              href="#experiences-hover-list"
              onClick={() => setIsMobileNavOpen(false)}
              className="text-sm font-semibold tracking-[0.3em] uppercase text-stone-200 hover:text-emerald-400 py-2 transition-colors"
            >
              Experiences
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layer 1: Background Layer (z-index: 10) */}
      <div
        id="bg-layer"
        ref={bgLayerRef}
        className="absolute inset-0 w-full h-full z-[10] pointer-events-none"
      >
        <Image
          src="/background-layer.jpg"
          alt="Wildfern Scenery Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-left 2xl:object-center w-full h-full scale-105"
        />
        {/* Deep contrast atmospheric overlay for text popping */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/70 mix-blend-multiply" />
      </div>

      {/* Layer 3: Hero Typography (z-index: 30) */}
      <div
        id="hero-text"
        ref={heroTextRef}
        className="absolute inset-0 w-full h-full z-[30] flex items-center justify-center pointer-events-none px-4"
      >
        <motion.div
          initial={{ y: 50, opacity: 0, filter: 'blur(16px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-center transform -translate-y-8"
        >
          <h1 className="font-serif text-[18vw] sm:text-[16vw] lg:text-[15vw] font-black tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-stone-100 via-stone-200 to-stone-400 drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Wildfern
          </h1>
        </motion.div>
      </div>

      {/* Layer 4: Big Ship Cutout (z-index: 40) - Positioned higher on mobile so sails overlap WILDFERN */}
      <div
        id="big-ship"
        ref={bigShipRef}
        className="absolute inset-0 w-full h-full z-[40] pointer-events-none flex items-center justify-center -translate-x-6 sm:-translate-x-20 md:-translate-x-28 -translate-y-4 sm:translate-y-20 md:translate-y-48"
      >
        <Image
          src="/big-ship.png"
          alt="Foreground Big Ship"
          fill
          priority
          sizes="100vw"
          className="object-contain object-center scale-[1.05] sm:scale-[0.70] md:scale-[0.65] transition-all duration-300 drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
        />
      </div>

      {/* Hero Footer Controls & Scroll Prompt - z-50 */}
      <div className="absolute bottom-10 left-0 w-full z-50 px-8 flex items-end justify-between pointer-events-auto">
        <div className="hidden lg:block text-xs tracking-widest text-stone-400 font-mono">
          <p className="text-stone-200 font-bold">LAT 48° 51' N</p>
          <p className="text-stone-400/70">LONG 2° 21' E</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="flex flex-col items-center gap-2 cursor-pointer mx-auto lg:mx-0"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth',
            });
          }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-stone-300">
            Scroll To Discover
          </span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm bg-white/5">
            <ArrowDown className="w-3.5 h-3.5 text-white" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
