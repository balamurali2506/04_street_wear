'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Sparkles, Compass, Flame, ArrowRight } from 'lucide-react';
import { BrandLogo } from '@/components/brand/BrandLogo';

export default function AboutPage() {
  const timeline = [
    {
      year: '2023',
      title: 'GENESIS // WAREHOUSE 01',
      desc: 'Founded as an underground print lab in Shibuya back-alleys, crafting 100-piece numbered hoodies for club residents.',
    },
    {
      year: '2024',
      title: 'DROP 02 // DUAL AXIS (TOKYO × MUMBAI)',
      desc: 'Established dual studio operations in Bandra, merging Indian raw heavyweight mill heritage with Tokyo brutalist tailoring.',
    },
    {
      year: '2025',
      title: 'DROP 03 // BALLISTIC CORDURA',
      desc: 'Integrated tactical mil-spec hardware and modular fidlock buckles into architectural everyday silhouettes.',
    },
    {
      year: '2026',
      title: 'DROP 04 // MONOLITH (ACTIVE)',
      desc: 'Complete 12-silhouette archive launch. Pushing custom 500 GSM loopback terry and sculpted vibram-soled footwear prototypes.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F2F0EB] pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Overhead Billboard */}
        <div className="pb-16 border-b border-neutral-800">
          <div className="flex items-center gap-2 font-mono text-xs text-[#FF4D00] uppercase font-bold tracking-widest mb-3">
            <Compass className="w-4 h-4" />
            <span>STUDIO MANIFESTO // 04 ARCHIVE DEPT</span>
          </div>
          <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl text-white uppercase tracking-tight leading-[0.88]">
            RAW. UNFILTERED. ARCHITECTURAL.
          </h1>
        </div>

        {/* Brand Story & Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 items-start font-mono text-xs">
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="p-8 bg-neutral-950 border border-neutral-800">
              <BrandLogo variant="symbol" className="w-12 h-12 mb-6" />
              <h3 className="font-display text-3xl text-white uppercase tracking-tight mb-3">
                UNDERGROUND MEETS LUXURY
              </h3>
              <p className="text-neutral-400 uppercase leading-relaxed">
                04 Street Wear exists in opposition to seasonal fast fashion cycles.
                Every garment is treated as an architectural sculpture: cut boxy, weighted heavily, and released in limited runs of 50 units.
              </p>
            </div>

            <div className="p-8 bg-neutral-900/40 border border-neutral-800">
              <span className="text-[#FF4D00] font-black uppercase tracking-wider block mb-2">
                TEXTILE SPECIFICATION 04
              </span>
              <ul className="flex flex-col gap-3 text-neutral-300">
                <li>• 500 GSM custom-milled loopback French terry</li>
                <li>• 14.5oz shuttle-loom Japanese selvedge denim</li>
                <li>• Mil-spec 1000D Cordura® ballistic nylon</li>
                <li>• German Fidlock® magnetic quick-release hardware</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative aspect-[16/10] w-full bg-neutral-900 border border-neutral-800 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85"
                alt="04 Street Wear Studio Lookbook"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 font-mono text-xs text-white uppercase">
                <span className="text-[#FF4D00] font-bold block mb-1">LOOKBOOK ARCHIVE</span>
                <span>DOCUMENTED ON 35MM GRAIN FILM IN TOKYO</span>
              </div>
            </div>

            <div className="p-6 bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[#C6FF00] font-bold uppercase block">ZERO DEADSTOCK COMMITMENT</span>
                <span className="text-neutral-400 text-[11px] uppercase">
                  We mill textiles strictly for exact drop allocations. Zero landfill waste.
                </span>
              </div>
              <Link
                href="/shop"
                className="px-5 py-2.5 bg-[#FF4D00] hover:bg-white text-black font-black uppercase text-xs transition-colors shrink-0 text-center"
              >
                EXPLORE PIECES
              </Link>
            </div>
          </div>
        </div>

        {/* Archive Timeline */}
        <div className="mt-28 pt-16 border-t border-neutral-800 font-mono">
          <div className="flex items-center gap-2 text-xs text-[#FF4D00] uppercase font-bold tracking-widest mb-2">
            <Flame className="w-4 h-4" />
            <span>HISTORICAL CHRONOLOGY</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl text-white uppercase tracking-tight mb-12">
            ARCHIVE TIMELINE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item) => (
              <div
                key={item.year}
                className="p-6 bg-[#111111] border border-neutral-800 flex flex-col justify-between"
              >
                <div>
                  <span className="font-display text-4xl text-[#FF4D00]">{item.year}</span>
                  <h4 className="font-display text-xl text-white uppercase tracking-tight mt-2 mb-3">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-400 uppercase leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-900 text-[10px] text-neutral-600 uppercase">
                  VERIFIED CHAPTER
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
