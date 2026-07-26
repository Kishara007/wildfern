'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useSpring } from 'framer-motion';

const experiences = [
  {
    id: 'surf',
    label: 'SURF',
    subtitle: 'Outer reef break expeditions & private coaching.',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'sail',
    label: 'SAIL',
    subtitle: 'Sunset catamaran voyages across uncharted inlets.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'soak',
    label: 'SOAK',
    subtitle: 'Thermal volcanic spring baths & ritual hydrotherapy.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'savor',
    label: 'SAVOR',
    subtitle: 'Fire-roasted coastal gastronomy & biodynamic vintages.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop',
  },
];

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ExperiencesSection() {
  const [activeExperience, setActiveExperience] = useState<typeof experiences[0] | null>(null);
  const [scrollActiveExperience, setScrollActiveExperience] = useState<typeof experiences[0]>(experiences[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  // Smooth springs for mouse cursor tracking
  const springConfig = { damping: 25, stiffness: 200 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useGSAP(
    () => {
      if (typeof window === 'undefined' || !containerRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const items = itemRefs.current.filter(Boolean);

      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0.25, color: '#a1a1aa' },
          {
            opacity: 1,
            color: '#18181b',
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              end: 'bottom 45%',
              scrub: 1,
              onEnter: () => setScrollActiveExperience(experiences[index]),
              onEnterBack: () => setScrollActiveExperience(experiences[index]),
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const currentBgImage = activeExperience ? activeExperience.image : scrollActiveExperience.image;

  return (
    <section
      id="experiences-hover-list"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActiveExperience(null)}
      className="relative min-h-screen bg-white text-zinc-900 flex flex-col justify-center px-5 sm:px-6 py-24 md:py-36 z-20 overflow-hidden select-none"
    >
      {/* Pro Soft-Focus Atmospheric Background Image Cross-Fade Reveal */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBgImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.18, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentBgImage}
              alt="Resort Atmosphere Background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center filter blur-[6px]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Mouse-Tracking Image Container */}
      <AnimatePresence mode="wait">
        {activeExperience && (
          <motion.div
            key={activeExperience.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              x: mouseX,
              y: mouseY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            className="pointer-events-none fixed z-30 w-72 h-96 md:w-80 md:h-[440px] rounded-2xl overflow-hidden shadow-2xl border border-white/20 hidden md:block"
          >
            <Image
              src={activeExperience.image}
              alt={activeExperience.label}
              fill
              priority
              sizes="320px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-6 flex items-end">
              <p className="text-white text-xs font-mono tracking-widest uppercase">
                {activeExperience.subtitle}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-zinc-200/80 pb-6">
          <span className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-500 font-semibold">
            03 &bull; Experiences
          </span>
          <span className="hidden sm:inline text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 font-semibold">
            Ocean &bull; Jungle &bull; Fire &bull; Water
          </span>
        </div>

        {/* Massive Hover Word List with Generous Negative Space */}
        <div className="flex flex-col items-center justify-center space-y-8 sm:space-y-12 md:space-y-16">
          {experiences.map((exp, index) => {
            const isHovered = activeExperience?.id === exp.id;

            return (
              <motion.div
                key={exp.id}
                onMouseEnter={() => setActiveExperience(exp)}
                animate={{
                  x: isHovered ? 12 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="group relative cursor-pointer text-center w-full py-2"
              >
                <h2
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="font-serif text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-black tracking-tight sm:tracking-tighter uppercase leading-none transition-colors duration-300"
                >
                  {exp.label}
                </h2>
                <p className="md:hidden text-xs text-zinc-600 font-mono tracking-wider mt-3 uppercase font-medium">
                  {exp.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
