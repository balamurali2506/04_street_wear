'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LOOKBOOK_IMAGES } from '@/data/products';
import { useStore } from '@/store/useStore';
import { Camera, ArrowRight } from 'lucide-react';

export const LookbookParallax: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const setCursor = useStore((state) => state.setCursor);
  const resetCursor = useStore((state) => state.resetCursor);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax offsets for columns
  const yOffset1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yOffset2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      ref={containerRef}
      className="py-28 px-4 sm:px-8 bg-[#0F0F0F] border-y border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Overhead Billboard */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF4D00] uppercase font-bold tracking-widest mb-2">
              <Camera className="w-4 h-4" />
              <span>EDITORIAL CAMPAIGN // ARCHIVE 2026</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white uppercase tracking-tight leading-none">
              SUBTERRANEAN LOOKBOOK
            </h2>
          </div>

          <Link
            href="/lookbook"
            onMouseEnter={() => setCursor('EXPLORE')}
            onMouseLeave={resetCursor}
            className="inline-flex items-center gap-2 font-mono text-xs text-[#FF4D00] hover:text-white uppercase tracking-widest transition-colors"
          >
            <span>FULL CAMPAIGN GALLERY</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Parallax Image Collage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-16">
          {/* Left Column (Parallax Offset 1) */}
          <motion.div style={{ y: yOffset1 }} className="flex flex-col gap-12">
            {LOOKBOOK_IMAGES.slice(0, 2).map((item, idx) => (
              <div
                key={item.id}
                onMouseEnter={() => setCursor('LOOKBOOK')}
                onMouseLeave={resetCursor}
                className="group relative overflow-hidden bg-neutral-950 border border-neutral-800"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                </div>

                <div className="absolute bottom-6 left-6 right-6 font-mono text-xs text-white">
                  <div className="flex items-center justify-between text-[#FF4D00] font-bold uppercase mb-1">
                    <span>{item.tag}</span>
                    <span>{item.location}</span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-xs mt-1 uppercase">
                    STYLING: {item.item}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right Column (Parallax Offset 2) */}
          <motion.div style={{ y: yOffset2 }} className="flex flex-col gap-12 md:pt-16">
            {LOOKBOOK_IMAGES.slice(2, 4).map((item, idx) => (
              <div
                key={item.id}
                onMouseEnter={() => setCursor('LOOKBOOK')}
                onMouseLeave={resetCursor}
                className="group relative overflow-hidden bg-neutral-950 border border-neutral-800"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                </div>

                <div className="absolute bottom-6 left-6 right-6 font-mono text-xs text-white">
                  <div className="flex items-center justify-between text-[#FF4D00] font-bold uppercase mb-1">
                    <span>{item.tag}</span>
                    <span>{item.location}</span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-xs mt-1 uppercase">
                    STYLING: {item.item}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
