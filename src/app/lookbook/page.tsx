'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, ArrowRight, ShoppingBag, MapPin, Eye } from 'lucide-react';
import { LOOKBOOK_IMAGES, SAMPLE_PRODUCTS } from '@/data/products';
import { useStore } from '@/store/useStore';
import { formatPrice } from '@/utils/format';

export default function LookbookPage() {
  const setCursor = useStore((state) => state.setCursor);
  const resetCursor = useStore((state) => state.resetCursor);
  const addToCart = useStore((state) => state.addToCart);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F2F0EB] pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Billboard Header */}
        <div className="pb-12 border-b border-neutral-800">
          <div className="flex items-center gap-2 font-mono text-xs text-[#FF4D00] uppercase font-bold tracking-widest mb-2">
            <Camera className="w-4 h-4" />
            <span>SEASON EDITORIAL // CAMPAIGN ARCHIVE</span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl text-white uppercase tracking-tight leading-none">
            DROP 04: MONOLITH
          </h1>
          <p className="font-mono text-xs sm:text-sm text-neutral-400 max-w-2xl mt-4 uppercase leading-relaxed">
            Documented across industrial corridors in Shibuya and the concrete sprawl of Mumbai.
            Raw silhouettes, heavy terry draping, reflective weather barriers.
          </p>
        </div>

        {/* Editorial Feed */}
        <div className="flex flex-col gap-24 pt-16">
          {LOOKBOOK_IMAGES.map((look, idx) => {
            // Find a matching product for shoppable hotspot
            const matchingProduct = SAMPLE_PRODUCTS[idx % SAMPLE_PRODUCTS.length];

            return (
              <div
                key={look.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-neutral-900 pb-20"
              >
                {/* Lookbook Full-bleed Image */}
                <div
                  onMouseEnter={() => setCursor('EXPAND')}
                  onMouseLeave={resetCursor}
                  className={`relative aspect-[4/5] w-full bg-neutral-950 overflow-hidden border border-neutral-800 ${
                    idx % 2 === 0 ? 'lg:col-span-8' : 'lg:col-span-8 lg:order-2'
                  }`}
                >
                  <Image
                    src={look.image}
                    alt={look.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                  {/* Hotspot Floating Tag */}
                  <div className="absolute top-6 left-6 font-mono text-[11px] bg-black/80 backdrop-blur-md px-3 py-1.5 border border-neutral-800 text-white uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-ping" />
                    <span>LOOK 0{idx + 1}</span>
                  </div>

                  <div className="absolute bottom-6 left-6 font-mono text-xs text-neutral-300 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#FF4D00]" />
                    <span className="uppercase">{look.location}</span>
                  </div>
                </div>

                {/* Shoppable Outfit Blueprint */}
                <div
                  className={`flex flex-col justify-between font-mono text-xs ${
                    idx % 2 === 0 ? 'lg:col-span-4' : 'lg:col-span-4 lg:order-1'
                  }`}
                >
                  <div>
                    <span className="text-[#FF4D00] font-black uppercase tracking-widest text-[11px]">
                      {look.tag} // ARCHIVE SPEC
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl text-white uppercase tracking-tight mt-2 mb-4 leading-none">
                      {look.title}
                    </h2>
                    <p className="text-neutral-400 uppercase leading-relaxed mb-6">
                      Engineered layering formula pairing the {matchingProduct.name} with our custom tactical bottom architecture.
                    </p>

                    {/* Featured Item Preview Card */}
                    <div className="p-4 bg-neutral-950 border border-neutral-800 flex gap-4 items-center">
                      <div className="relative w-16 h-20 bg-neutral-900 shrink-0 border border-neutral-800">
                        <Image
                          src={matchingProduct.images[0]}
                          alt={matchingProduct.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-[#FF4D00] uppercase font-bold">
                          FEATURED SILHOUETTE
                        </span>
                        <h4 className="font-display text-lg text-white uppercase truncate">
                          {matchingProduct.name}
                        </h4>
                        <div className="text-white font-bold text-xs mt-0.5">
                          {formatPrice(matchingProduct.priceINR)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex flex-col gap-3">
                    <button
                      onClick={() => addToCart(matchingProduct, matchingProduct.colors[0].name, matchingProduct.sizes[0], 1)}
                      className="w-full py-3 bg-[#FF4D00] hover:bg-white text-black font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>SHOP THIS LOOK ({matchingProduct.sizes[0]})</span>
                    </button>

                    <Link
                      href={`/products/${matchingProduct.slug}`}
                      className="w-full py-3 border border-neutral-800 hover:border-white text-neutral-300 hover:text-white uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <span>VIEW PRODUCT SPEC</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
