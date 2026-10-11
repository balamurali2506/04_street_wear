'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandLogo } from '@/components/brand/BrandLogo';

export const Preloader: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const quotes = [
    "WE DON'T FOLLOW SEASONS. WE CREATE CULTURES.",
    'BORN IN THE CONCRETE • ENGINEERED FOR THE NIGHT',
    'LIMITED TO 50 SILHOUETTES • ZERO DEADSTOCK',
    'SHIBUYA SUBTERRANEAN × MUMBAI STREET BRUTALISM',
    'AUTHENTICATED ARCHIVE // WELCOME TO 04'
  ];

  useEffect(() => {
    let current = 0;
    // Slower, hypnotic chronograph countdown (takes ~5 seconds)
    const interval = setInterval(() => {
      current += 1;

      if (current >= 100) {
        current = 100;
        setCount(100);
        setCurrentQuoteIndex(quotes.length - 1);
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
        }, 900);
      } else {
        setCount(current);
        // Switch quotes every 20%
        if (current >= 85) setCurrentQuoteIndex(4);
        else if (current >= 65) setCurrentQuoteIndex(3);
        else if (current >= 45) setCurrentQuoteIndex(2);
        else if (current >= 25) setCurrentQuoteIndex(1);
        else setCurrentQuoteIndex(0);
      }
    }, 50); // Steady 50ms per unit = 5.0s countdown

    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    setIsLoaded(true);
  };

  return (
    <AnimatePresence mode="wait">
      {!isLoaded && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -30,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          onClick={handleSkip}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-between bg-[#0A0A0A] p-8 md:p-12 text-[#F2F0EB] cursor-pointer select-none"
        >
          {/* Top Info */}
          <div className="w-full flex items-center justify-between text-xs font-mono tracking-widest text-neutral-500 uppercase">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-ping" />
              SYSTEM PROTOCOL 04
            </span>
            <span className="hidden sm:inline">AUTHENTICATING ARCHIVE CAPSULE</span>
            <span className="hover:text-white transition-colors text-[10px] sm:text-xs">
              [ CLICK ANYWHERE TO SKIP ]
            </span>
          </div>

          {/* Center Brand Mask Reveal */}
          <div className="flex flex-col items-center text-center my-auto max-w-3xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <BrandLogo variant="symbol" className="w-16 h-16 md:w-20 md:h-20" />
            </motion.div>

            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                className="font-display text-5xl md:text-8xl tracking-tight uppercase"
              >
                04 STREET WEAR
              </motion.h1>
            </div>

            {/* Streetwear Quote Transition */}
            <motion.p
              key={currentQuoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="font-mono text-xs md:text-sm tracking-widest text-[#FF4D00] uppercase font-bold text-center px-4"
            >
              &ldquo;{quotes[currentQuoteIndex]}&rdquo;
            </motion.p>
          </div>

          {/* Bottom Counter Bar */}
          <div className="w-full flex items-end justify-between font-mono">
            <div className="text-xs text-neutral-500">
              <span>PROGRESS [</span>
              <span className="text-[#FF4D00] font-bold">{count}%</span>
              <span>]</span>
            </div>

            <div className="font-display text-6xl md:text-8xl text-neutral-100 tabular-nums leading-none">
              {String(count).padStart(3, '0')}
            </div>
          </div>

          {/* Progress Bottom Bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-[#FF4D00]"
            style={{ width: `${count}%` }}
            transition={{ ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
