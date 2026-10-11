'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check, Heart, Eye } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '@/data/products';
import { ProductCategory } from '@/types';
import { useStore } from '@/store/useStore';
import { formatPrice } from '@/utils/format';

export const ProductGridSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>('All');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const currency = useStore((state) => state.currency);
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isInWishlist = useStore((state) => state.isInWishlist);
  const setCursor = useStore((state) => state.setCursor);
  const resetCursor = useStore((state) => state.resetCursor);

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Hoodies',
    'Outerwear',
    'Pants',
    'Tees',
    'Accessories',
  ];

  const filtered = SAMPLE_PRODUCTS.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  const handleQuickAdd = (e: React.MouseEvent, product: typeof SAMPLE_PRODUCTS[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.colors[0].name, product.sizes[0], 1);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  const handleToggleWishlist = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
  };

  return (
    <section className="relative z-20 w-full bg-[#0A0A0A] py-24 px-4 sm:px-8 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#FF4D00] uppercase font-bold tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-[#FF4D00]" />
            <span>DROP 04 CATALOGUE</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl text-white uppercase tracking-tight leading-none">
            CORE SILHOUETTES
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 uppercase transition-all whitespace-nowrap border ${
                activeCategory === cat
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-10">
        {filtered.map((product) => {
          const isHovered = hoveredProduct === product.id;
          const isJustAdded = addedProductId === product.id;
          const wishlisted = isInWishlist(product.id);

          return (
            <div
              key={product.id}
              onMouseEnter={() => {
                setHoveredProduct(product.id);
                setCursor('VIEW');
              }}
              onMouseLeave={() => {
                setHoveredProduct(null);
                resetCursor();
              }}
              className="group relative flex flex-col bg-[#111111] border border-neutral-800 transition-all duration-300 hover:border-[#FF4D00] overflow-hidden"
            >
              {/* Product Image Stage */}
              <Link href={`/products/${product.slug}`} className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950 block">
                {/* Primary Image */}
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className={`object-cover transition-opacity duration-500 ${
                    isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                  }`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Secondary Hover Image (Swap) */}
                {product.images[1] && (
                  <Image
                    src={product.images[1]}
                    alt={`${product.name} secondary angle`}
                    fill
                    className={`object-cover transition-all duration-500 ${
                      isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                )}

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                  {product.isNewDrop ? (
                    <span className="font-mono text-[10px] font-black uppercase bg-[#FF4D00] text-black px-2 py-0.5">
                      NEW DROP
                    </span>
                  ) : product.stockCount <= 3 ? (
                    <span className="font-mono text-[10px] font-black uppercase bg-red-600 text-white px-2 py-0.5">
                      ONLY {product.stockCount} LEFT
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] font-bold uppercase bg-black/60 backdrop-blur-md text-neutral-300 px-2 py-0.5 border border-neutral-800">
                      {product.category}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => handleToggleWishlist(e, product.id)}
                    className="pointer-events-auto p-2 rounded-full bg-black/60 backdrop-blur-md border border-neutral-800 hover:border-white transition-colors"
                    aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        wishlisted ? 'fill-[#FF4D00] text-[#FF4D00]' : 'text-neutral-300'
                      }`}
                    />
                  </button>
                </div>

                {/* Bottom Quick-Add Action Bar (Animated In on Hover) */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <motion.button
                    onClick={(e) => handleQuickAdd(e, product)}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-2.5 font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-lg ${
                      isJustAdded
                        ? 'bg-[#C6FF00] text-black'
                        : 'bg-white hover:bg-[#FF4D00] text-black'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-4 h-4 animate-bounce" />
                        <span>ADDED TO CART</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>QUICK ADD ({product.sizes[0]})</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </Link>

              {/* Product Info Footer */}
              <div className="p-4 flex flex-col justify-between flex-1 font-mono">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 uppercase mb-1">
                    <span>{product.fabricSpecs.weight}</span>
                    <span className="text-[#FF4D00] font-bold">★ {product.rating}</span>
                  </div>
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-display text-xl text-white uppercase tracking-tight group-hover:text-[#FF4D00] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                    {product.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-neutral-900 text-xs">
                  <span className="text-white font-bold text-sm">
                    {formatPrice(product.priceINR, product.priceUSD, currency)}
                  </span>
                  {product.compareAtPriceINR && (
                    <span className="text-neutral-500 line-through text-[11px]">
                      {formatPrice(product.compareAtPriceINR, product.compareAtPriceUSD!, currency)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Shop CTA */}
      <div className="mt-16 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-neutral-700 hover:border-[#FF4D00] text-white hover:text-[#FF4D00] font-mono text-xs uppercase tracking-widest transition-all duration-300"
        >
          <span>VIEW COMPLETE ARCHIVE COLLECTION</span>
          <span className="text-[#FF4D00] font-black">→</span>
        </Link>
      </div>
      </div>
    </section>
  );
};
