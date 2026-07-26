'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';

const statusMessages = [
  { threshold: 0, text: "CALIBRATING HORIZON..." },
  { threshold: 30, text: "CHARTERING UNCHARTED WATERS..." },
  { threshold: 65, text: "ANCHORING SANCTUARY..." },
  { threshold: 90, text: "WELCOME TO WILDFERN" },
];

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Smooth 0 - 100 counter over ~2.4 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        // Organic step increments
        const next = prev + Math.floor(Math.random() * 4) + 2;
        return next > 100 ? 100 : next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Current status message based on progress
  const currentMessage =
    [...statusMessages].reverse().find((m) => progress >= m.threshold)?.text || statusMessages[0].text;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] bg-zinc-950 text-white flex flex-col justify-between p-8 sm:p-12 md:p-16 select-none overflow-hidden"
        >
          {/* Top Brand & Location Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <Compass className="w-5 h-5 text-emerald-400 animate-spin-slow" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.35em] uppercase text-white">
                Wildfern
              </span>
            </div>
            <span className="text-[11px] font-mono tracking-widest text-stone-400 uppercase hidden sm:inline">
              Vol. 01 &bull; Guanacaste
            </span>
          </div>

          {/* Center Counter & Editorial Copy */}
          <div className="my-auto text-center space-y-6 sm:space-y-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative inline-block"
            >
              {/* Massive Serif Number Counter */}
              <h1 className="font-serif text-7xl sm:text-9xl md:text-[12rem] lg:text-[14rem] font-black tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-stone-100 via-stone-200 to-stone-500">
                {String(progress).padStart(2, '0')}
                <span className="text-emerald-400 text-3xl sm:text-5xl md:text-7xl font-mono font-normal ml-2">
                  %
                </span>
              </h1>
            </motion.div>

            {/* Shifting Status Copy */}
            <div className="h-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentMessage}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs sm:text-sm font-mono tracking-[0.35em] uppercase text-emerald-400/90 font-medium"
                >
                  {currentMessage}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Progress Bar & Coordinates */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-300 to-emerald-400 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono tracking-widest text-stone-400 uppercase">
              <span>LAT 48° N &bull; LONG 2° E</span>
              <span>Expedition Status &bull; Active</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
