'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUp, Instagram, MessageSquare, Shield, Globe } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const Footer: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const wordmarkRef = useRef<HTMLDivElement>(null);

  const setCursor = useStore((state) => state.setCursor);
  const resetCursor = useStore((state) => state.resetCursor);
  const currency = useStore((state) => state.currency);
  const setCurrency = useStore((state) => state.setCurrency);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wordmarkRef.current) return;
    const rect = wordmarkRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070707] border-t border-neutral-900 text-neutral-400 font-mono text-xs pt-16 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Navigation & Info Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-16 border-b border-neutral-900">
          {/* Column 1: Brand Spec */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 text-white font-display text-2xl tracking-tight mb-2">
              <span>04 STREET WEAR</span>
              <span className="w-2 h-2 rounded-full bg-[#FF4D00]" />
            </div>
            <p className="text-neutral-500 text-xs max-w-sm uppercase leading-relaxed mt-2">
              Independent underground garment design studio operating between Tokyo and Mumbai.
              Architectural silhouettes, raw textures, heavyweight textiles. Zero mass reproduction.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://instagram.com/04_street_wear"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-[#FF4D00] transition-colors flex items-center gap-1.5"
              >
                <Instagram className="w-4 h-4" />
                <span>@04_street_wear</span>
              </a>
              <span>•</span>
              <a
                href="https://wa.me/919999040404"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* Column 2: Index */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4">ARCHIVE INDEX</h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/shop" className="hover:text-white transition-colors">ALL SILHOUETTES</Link></li>
              <li><Link href="/shop?cat=Hoodies" className="hover:text-white transition-colors">HEAVYWEIGHT HOODIES</Link></li>
              <li><Link href="/shop?cat=Outerwear" className="hover:text-white transition-colors">TACTICAL OUTERWEAR</Link></li>
              <li><Link href="/shop?cat=Pants" className="hover:text-white transition-colors">CARGO & DENIM PANTS</Link></li>
              <li><Link href="/shop?cat=Accessories" className="hover:text-white transition-colors">STEEL & BALACLAVAS</Link></li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4">PLATFORM</h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/drops" className="hover:text-[#FF4D00] transition-colors">DROP COUNTDOWN</Link></li>
              <li><Link href="/lookbook" className="hover:text-white transition-colors">SEASON LOOKBOOK</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">BRAND MANIFESTO</Link></li>
              <li><Link href="/account" className="hover:text-white transition-colors">WISHLIST & ORDERS</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">SHOPPING CART</Link></li>
            </ul>
          </div>

          {/* Column 4: Client Services */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4">CLIENT CARE</h4>
            <ul className="flex flex-col gap-2.5">
              <li><span className="text-neutral-500">AUTHENTICITY GUARANTEE</span></li>
              <li><span className="text-neutral-500">7-DAY SIZE EXCHANGE</span></li>
              <li><span className="text-neutral-500">WORLDWIDE EXPRESS AIR</span></li>
              <li><span className="text-neutral-500">UPI / STRIPE TEST MODE</span></li>
              <li><span className="text-neutral-500">ORDERS@04STREETWEAR.COM</span></li>
            </ul>
          </div>
        </div>

        {/* Giant Cursor-Reactive Wordmark */}
        <div
          ref={wordmarkRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => setCursor('04')}
          onClick={scrollToTop}
          className="relative py-12 md:py-16 text-center select-none cursor-pointer overflow-hidden group"
        >
          <div
            style={{
              transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
              transition: 'transform 0.1s ease-out',
            }}
            className="font-display text-[15vw] leading-[0.8] text-neutral-900 group-hover:text-white transition-colors duration-500 uppercase tracking-tighter"
          >
            04 STREET WEAR
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="bg-[#FF4D00] text-black font-mono font-black text-xs px-4 py-1.5 uppercase tracking-widest">
              CLICK TO RETURN TO TOP ↑
            </span>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-900 text-[11px] text-neutral-600 uppercase">
          <div>
            © 2026 04 STREET WEAR // ALL ARCHIVE RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-neutral-500" />
              <span>REGION: INDIA // ALL PRICING IN INR (₹)</span>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
