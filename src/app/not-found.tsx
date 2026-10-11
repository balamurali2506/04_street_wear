'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass, AlertTriangle } from 'lucide-react';
import { BrandLogo } from '@/components/brand/BrandLogo';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F2F0EB] flex flex-col items-center justify-center p-6 text-center font-mono selection:bg-[#FF4D00] selection:text-black">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        {/* Brand Monogram */}
        <BrandLogo variant="symbol" className="w-16 h-16 mb-8 text-[#FF4D00]" />

        <div className="inline-flex items-center gap-2 text-xs text-[#FF4D00] bg-[#FF4D00]/10 border border-[#FF4D00]/30 px-3 py-1 mb-4 uppercase font-bold">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>COORDINATE ERROR // PROTOCOL VOID</span>
        </div>

        {/* Giant Glitch 404 */}
        <h1 className="font-display text-8xl sm:text-[12rem] text-white uppercase tracking-tighter leading-none select-none glitch-hover">
          404
        </h1>

        <h2 className="font-display text-3xl sm:text-4xl text-neutral-200 uppercase tracking-tight mt-2">
          SECTOR DOES NOT EXIST
        </h2>

        <p className="text-xs sm:text-sm text-neutral-400 mt-4 leading-relaxed uppercase max-w-md">
          You wandered into an unregistered subterranean alleyway.
          This drop piece was either seized by the archive or never minted.
        </p>

        {/* Return Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="px-8 py-4 bg-[#FF4D00] hover:bg-white text-black font-black text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO RUNWAY</span>
          </Link>

          <Link
            href="/shop"
            className="px-8 py-4 border border-neutral-800 bg-neutral-900 hover:border-white text-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>BROWSE ARCHIVE CATALOG</span>
          </Link>
        </div>

        <div className="mt-12 text-[10px] text-neutral-600 uppercase">
          ERROR TRACE: 04_SUBTERRANEAN_NULL_REFERENCE // SHIBUYA • BANDRA
        </div>
      </div>
    </main>
  );
}
