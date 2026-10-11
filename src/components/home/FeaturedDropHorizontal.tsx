'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Flame, ShieldAlert } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '@/data/products';
import { useStore } from '@/store/useStore';
import { formatPrice } from '@/utils/format';

gsap.registerPlugin(ScrollTrigger);

export const FeaturedDropHorizontal: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currency = useStore((state) => state.currency);
  const setCursor = useStore((state) => state.setCursor);
  const resetCursor = useStore((state) => state.resetCursor);

  // Take top featured drop products
  const featured = SAMPLE_PRODUCTS.filter((p) => p.isNewDrop).slice(0, 5);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const section = sectionRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const getDistance = () => {
        if (!track) return 0;
        return Math.max(0, track.scrollWidth - window.innerWidth + 120);
      };

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          invalidateOnRefresh: true,
        },
      });

      // Refresh ScrollTrigger after DOM layout settles
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);

      return () => clearTimeout(timer);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full h-screen bg-[#0A0A0A] overflow-hidden flex flex-col justify-between py-8 px-4 sm:px-8 border-b border-neutral-900"
    >
      {/* Overhead Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-xs z-10">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#FF4D00]" />
          <span className="text-white font-bold uppercase">FEATURED DROP // 04 MONOLITH</span>
          <span className="bg-[#FF4D00]/15 text-[#FF4D00] border border-[#FF4D00]/40 px-2 py-0.5 text-[10px] font-black uppercase">
            PINNED RUNWAY
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-neutral-500 uppercase">
          <span>[ SCROLL DOWN TO HORIZONTALLY TRAVERSE ]</span>
        </div>
      </div>

      {/* Horizontal Sliding Track */}
      <div
        ref={trackRef}
        className="flex items-center gap-8 md:gap-12 pl-4 sm:pl-12 will-change-transform my-auto"
        style={{ width: 'fit-content' }}
      >
        {/* Intro Billboard */}
        <div className="w-[320px] sm:w-[420px] shrink-0 flex flex-col justify-center">
          <div className="font-mono text-xs text-[#FF4D00] uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-full" />
            <span>EXCLUSIVES / CAPSULE 04</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl text-white uppercase tracking-tight leading-[0.9]">
            ENGINEERED TO OUTLAST CITIES
          </h2>
          <p className="font-mono text-xs text-neutral-400 mt-4 leading-relaxed uppercase">
            Custom developed Japanese selvedge, 500 GSM loopback cotton, and German Fidlock hardware.
            Explore each hero piece of the collection.
          </p>
          <div className="mt-6 flex items-center gap-2 font-mono text-xs text-[#FF4D00]">
            <ShieldAlert className="w-4 h-4" />
            <span>STRICT LIMIT: 1 PIECE PER CUSTOMER</span>
          </div>
        </div>

        {/* Featured Product Cards */}
        {featured.map((product, idx) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            onMouseEnter={() => setCursor('VIEW PIECE')}
            onMouseLeave={resetCursor}
            className="group relative w-[300px] sm:w-[380px] h-[520px] sm:h-[580px] bg-[#121212] border border-neutral-800 shrink-0 flex flex-col justify-between overflow-hidden p-6 transition-all duration-300 hover:border-[#FF4D00]"
          >
            {/* Card Overhead */}
            <div className="flex items-start justify-between z-10">
              <span className="font-mono text-xs text-neutral-500 uppercase">
                0{idx + 1} // {product.category}
              </span>
              <span className="font-mono text-xs font-black text-black bg-[#FF4D00] px-2 py-0.5 uppercase">
                {product.stockCount <= 3 ? `ONLY ${product.stockCount} LEFT` : 'IN STOCK'}
              </span>
            </div>

            {/* Central High-Res Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                sizes="(max-width: 768px) 320px, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
            </div>

            {/* Card Footer Info */}
            <div className="relative z-10 flex flex-col gap-2 mt-auto">
              <span className="font-mono text-[11px] text-[#FF4D00] uppercase font-bold tracking-wider">
                {product.subtitle}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-tight group-hover:text-[#FF4D00] transition-colors leading-none">
                {product.name}
              </h3>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80 font-mono text-xs">
                <span className="text-white font-bold text-sm">
                  {formatPrice(product.priceINR, product.priceUSD, currency)}
                </span>
                <span className="flex items-center gap-1 text-neutral-400 group-hover:text-white transition-colors">
                  <span>DISCOVER</span>
                  <ArrowUpRight className="w-4 h-4 text-[#FF4D00]" />
                </span>
              </div>
            </div>
          </Link>
        ))}

        {/* Explore All Shop Finisher Card */}
        <div className="w-[300px] sm:w-[340px] h-[520px] sm:h-[580px] bg-[#161616] border border-dashed border-neutral-700 shrink-0 flex flex-col items-center justify-center text-center p-8">
          <span className="font-display text-4xl text-[#FF4D00]">04</span>
          <h3 className="font-display text-3xl text-white uppercase tracking-tight mt-2">
            COMPLETE ARCHIVE
          </h3>
          <p className="font-mono text-xs text-neutral-400 mt-2 max-w-xs">
            View all 12 silhouettes across Hoodies, Cargos, Jackets, Tees and Accessories.
          </p>
          <Link
            href="/shop"
            className="mt-6 px-6 py-3 bg-white hover:bg-[#FF4D00] text-black font-mono font-bold text-xs uppercase tracking-widest transition-colors"
          >
            BROWSE ALL SHOP
          </Link>
        </div>
      </div>

      {/* Footer Track Meta */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[11px] text-neutral-600 uppercase z-10 border-t border-neutral-900 pt-3">
        <span>ARCHIVE BATCH 04/2026</span>
        <span>GSAP PINNED HORIZONTAL ENGINE</span>
      </div>
    </section>
  );
};
