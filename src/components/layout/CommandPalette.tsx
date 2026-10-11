'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, ShoppingBag, Eye } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { SAMPLE_PRODUCTS } from '@/data/products';
import { formatPrice } from '@/utils/format';

export const CommandPalette: React.FC = () => {
  const isSearchOpen = useStore((state) => state.isSearchOpen);
  const setSearchOpen = useStore((state) => state.setSearchOpen);
  const currency = useStore((state) => state.currency);
  const addToCart = useStore((state) => state.addToCart);

  const [query, setQuery] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    if (isSearchOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen, setSearchOpen]);

  // Debounced/instant filtered products
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return SAMPLE_PRODUCTS.slice(0, 5); // featured/recent
    const q = query.toLowerCase();
    return SAMPLE_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md">
        {/* Backdrop click to close */}
        <div
          className="absolute inset-0"
          onClick={() => setSearchOpen(false)}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[#121212] border border-neutral-800 shadow-2xl rounded-sm overflow-hidden z-10"
        >
          {/* Search Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-neutral-800 bg-[#161616]">
            <Search className="w-5 h-5 text-neutral-400 mr-3 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH DROP 04 ARCHIVE (E.G. HOODIE, BOMBER, CARGO)..."
              className="w-full bg-transparent text-sm sm:text-base font-mono text-white placeholder-neutral-500 focus:outline-none uppercase tracking-wider"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-neutral-500 hover:text-white mr-2 text-xs font-mono"
              >
                CLEAR
              </button>
            )}
            <button
              onClick={() => setSearchOpen(false)}
              className="p-1 text-neutral-400 hover:text-white"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Categories Bar */}
          <div className="px-4 py-2 bg-neutral-900 border-b border-neutral-800 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-mono">
            <span className="text-neutral-500 uppercase shrink-0">FILTER:</span>
            {['All', 'Hoodies', 'Outerwear', 'Pants', 'Tees', 'Accessories'].map((cat) => (
              <button
                key={cat}
                onClick={() => setQuery(cat === 'All' ? '' : cat)}
                className="px-2.5 py-0.5 rounded-xs bg-neutral-800 hover:bg-[#FF4D00] hover:text-black transition-colors text-neutral-300 shrink-0"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto divide-y divide-neutral-900/60 p-2">
            {filteredProducts.length === 0 ? (
              <div className="py-12 text-center">
                <p className="font-mono text-sm text-neutral-500 uppercase">
                  NO RESULTS FOR &quot;{query}&quot;
                </p>
                <p className="font-mono text-xs text-neutral-600 mt-1">
                  Try searching for hoodies, bombers, cargos, or accessories.
                </p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 hover:bg-neutral-900/70 transition-colors group rounded-xs"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-4 flex-1 min-w-0"
                  >
                    <div className="relative w-14 h-16 bg-neutral-950 shrink-0 overflow-hidden border border-neutral-800">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="60px"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#FF4D00] uppercase font-bold">
                          {product.category}
                        </span>
                        {product.stockCount <= 3 && (
                          <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-1 py-0.2 font-mono">
                            LOW STOCK
                          </span>
                        )}
                      </div>
                      <h4 className="font-display text-lg text-white group-hover:text-[#FF4D00] transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="font-mono text-xs text-neutral-400">
                        {formatPrice(product.priceINR, product.priceUSD, currency)}
                      </p>
                    </div>
                  </Link>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <button
                      onClick={() => {
                        addToCart(product, product.colors[0].name, product.sizes[0], 1);
                        setSearchOpen(false);
                      }}
                      className="px-3 py-1.5 bg-[#FF4D00] text-black text-xs font-mono font-black uppercase hover:bg-white transition-colors flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">QUICK ADD</span>
                    </button>
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="p-1.5 text-neutral-400 hover:text-white"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer status */}
          <div className="px-4 py-2 bg-[#0A0A0A] border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>PRESS ESC TO CLOSE</span>
            <span>{filteredProducts.length} PRODUCTS FOUND</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
