'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, ArrowUpDown, LayoutGrid, Grid, Check, ShoppingBag, Heart, X } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '@/data/products';
import { ProductCategory, ProductSize } from '@/types';
import { useStore } from '@/store/useStore';
import { formatPrice } from '@/utils/format';

export default function ShopPage() {
  const currency = useStore((state) => state.currency);
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isInWishlist = useStore((state) => state.isInWishlist);
  const setCursor = useStore((state) => state.setCursor);
  const resetCursor = useStore((state) => state.resetCursor);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>([]);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlySale, setOnlySale] = useState(false);
  const [gridCols, setGridCols] = useState<'normal' | 'dense'>('normal');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Hoodies',
    'Outerwear',
    'Pants',
    'Tees',
    'Accessories',
  ];

  const sizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Toggle size filter
  const toggleSize = (size: ProductSize) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Filtered and Sorted products
  const products = useMemo(() => {
    let result = [...SAMPLE_PRODUCTS];

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => selectedSizes.includes(s))
      );
    }

    if (onlyNew) {
      result = result.filter((p) => p.isNewDrop);
    }

    if (onlySale) {
      result = result.filter((p) => p.compareAtPriceINR || p.compareAtPriceUSD);
    }

    // Sort (Pure INR)
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.priceINR - b.priceINR);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.priceINR - a.priceINR);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, selectedSizes, onlyNew, onlySale, sortBy, currency]);

  const handleQuickAdd = (product: typeof SAMPLE_PRODUCTS[0]) => {
    addToCart(product, product.colors[0].name, product.sizes[0], 1);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSizes([]);
    setOnlyNew(false);
    setOnlySale(false);
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedSizes.length > 0 ||
    onlyNew ||
    onlySale;

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F2F0EB] pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Overhead Billboard */}
        <div className="pb-8 border-b border-neutral-800">
          <div className="flex items-center gap-2 font-mono text-xs text-[#FF4D00] uppercase font-bold tracking-widest mb-2">
            <span>[ ARCHIVE CATALOG ]</span>
            <span>•</span>
            <span>{SAMPLE_PRODUCTS.length} TOTAL SILHOUETTES</span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white uppercase tracking-tight leading-none">
            DROP 04 COLLECTION
          </h1>
          <p className="font-mono text-xs sm:text-sm text-neutral-400 max-w-2xl mt-4 uppercase leading-relaxed">
            Architectural silhouettes cut from custom 500 GSM loopback cotton, Japanese selvedge denim, and ballistic cordura. Limited production batches.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="py-6 border-b border-neutral-800/80 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          {/* Categories Tab Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 uppercase transition-all whitespace-nowrap border ${
                  selectedCategory === cat
                    ? 'bg-[#FF4D00] text-black border-[#FF4D00] font-black'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right Action Bar: Filter Drawer Trigger + Sort + View */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-neutral-300"
            >
              <Filter className="w-3.5 h-3.5 text-[#FF4D00]" />
              <span>FILTERS {hasActiveFilters && '(ACTIVE)'}</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white font-mono text-xs uppercase focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-neutral-900 text-white">SORT: FEATURED</option>
                <option value="price-asc" className="bg-neutral-900 text-white">PRICE: LOW TO HIGH</option>
                <option value="price-desc" className="bg-neutral-900 text-white">PRICE: HIGH TO LOW</option>
                <option value="rating" className="bg-neutral-900 text-white">TOP RATED</option>
              </select>
            </div>

            {/* Grid density toggle */}
            <div className="hidden sm:flex items-center bg-neutral-900 border border-neutral-800 p-0.5">
              <button
                onClick={() => setGridCols('normal')}
                className={`p-1 transition-colors ${gridCols === 'normal' ? 'bg-[#FF4D00] text-black' : 'text-neutral-400'}`}
                aria-label="Normal grid"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols('dense')}
                className={`p-1 transition-colors ${gridCols === 'dense' ? 'bg-[#FF4D00] text-black' : 'text-neutral-400'}`}
                aria-label="Dense grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout (Sidebar Filters + Products Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* Desktop Left Filter Sidebar */}
          <div className="hidden lg:flex flex-col gap-8 font-mono text-xs pr-4 border-r border-neutral-900">
            {/* Sizes Filter */}
            <div>
              <div className="text-white font-bold uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>SIZE MATRIX</span>
                {selectedSizes.length > 0 && (
                  <button onClick={() => setSelectedSizes([])} className="text-[#FF4D00] text-[10px]">
                    CLEAR
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`py-2 text-center uppercase border transition-colors ${
                        isSelected
                          ? 'border-[#FF4D00] bg-[#FF4D00] text-black font-black'
                          : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-600 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Badges Filter */}
            <div className="pt-6 border-t border-neutral-900 flex flex-col gap-3">
              <span className="text-white font-bold uppercase tracking-wider">AVAILABILITY & DROP</span>
              <label className="flex items-center gap-2.5 cursor-pointer text-neutral-400 hover:text-white">
                <input
                  type="checkbox"
                  checked={onlyNew}
                  onChange={(e) => setOnlyNew(e.target.checked)}
                  className="accent-[#FF4D00]"
                />
                <span>ONLY NEW DROPS (DROP 04)</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-neutral-400 hover:text-white">
                <input
                  type="checkbox"
                  checked={onlySale}
                  onChange={(e) => setOnlySale(e.target.checked)}
                  className="accent-[#FF4D00]"
                />
                <span>SALE & ARCHIVE DISCOUNTS</span>
              </label>
            </div>

            {/* Reset All */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="w-full py-2.5 mt-4 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-black uppercase font-bold text-xs transition-colors"
              >
                RESET ALL FILTERS
              </button>
            )}

            {/* Archive Assurance Badge */}
            <div className="mt-auto p-4 bg-neutral-950 border border-neutral-900 text-neutral-500 leading-relaxed uppercase text-[10px]">
              <p className="text-white font-bold mb-1">ARCHIVE SPEC GUARANTEE</p>
              Every garment inspected by hand. Milled with premium organic heavyweight fibres. Free returns within 7 days.
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {products.length === 0 ? (
              <div className="py-24 text-center border border-dashed border-neutral-800 p-8">
                <span className="font-display text-4xl text-neutral-600">04</span>
                <h3 className="font-display text-3xl text-white uppercase mt-2">NO PRODUCTS MATCH CRITERIA</h3>
                <p className="font-mono text-xs text-neutral-500 mt-2">
                  Try clearing your filters or selecting a different category.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 px-6 py-2.5 bg-[#FF4D00] text-black font-mono font-bold text-xs uppercase"
                >
                  CLEAR FILTERS
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  gridCols === 'dense'
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {products.map((product) => {
                  const isJustAdded = addedProductId === product.id;
                  const wishlisted = isInWishlist(product.id);

                  return (
                    <div
                      key={product.id}
                      onMouseEnter={() => setCursor('VIEW')}
                      onMouseLeave={resetCursor}
                      className="group flex flex-col bg-[#111111] border border-neutral-800 hover:border-[#FF4D00] transition-all duration-300 overflow-hidden"
                    >
                      {/* Product Media Card */}
                      <Link
                        href={`/products/${product.slug}`}
                        className="relative aspect-[3/4] w-full bg-neutral-950 overflow-hidden block"
                      >
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 1024px) 50vw, 33vw"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                          {product.isNewDrop ? (
                            <span className="font-mono text-[10px] font-black uppercase bg-[#FF4D00] text-black px-2 py-0.5">
                              NEW DROP
                            </span>
                          ) : (
                            <span className="font-mono text-[10px] uppercase bg-black/60 backdrop-blur-md text-neutral-300 px-2 py-0.5 border border-neutral-800">
                              {product.category}
                            </span>
                          )}

                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleWishlist(product.id);
                            }}
                            className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-neutral-800 hover:border-white transition-colors"
                            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                          >
                            <Heart
                              className={`w-3.5 h-3.5 ${
                                wishlisted ? 'fill-[#FF4D00] text-[#FF4D00]' : 'text-neutral-300'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Quick Add Button */}
                        <div className="absolute bottom-3 left-3 right-3 z-10">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleQuickAdd(product);
                            }}
                            className={`w-full py-2.5 font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 ${
                              isJustAdded
                                ? 'bg-[#C6FF00] text-black'
                                : 'bg-white hover:bg-[#FF4D00] text-black'
                            }`}
                          >
                            {isJustAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>ADDED</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>QUICK ADD ({product.sizes[0]})</span>
                              </>
                            )}
                          </button>
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="p-4 flex flex-col justify-between flex-1 font-mono">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-neutral-500 uppercase mb-1">
                            <span>{product.fabricSpecs.fit.split(' ')[0]} FIT</span>
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
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom-Sheet Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[110] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto bg-[#121212] border-t border-neutral-800 p-6 flex flex-col gap-6 font-mono text-xs rounded-t-xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <span className="font-display text-2xl text-white uppercase">FILTER SILHOUETTES</span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <span className="text-white font-bold uppercase mb-2 block">CATEGORIES</span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 border uppercase ${
                        selectedCategory === cat
                          ? 'border-[#FF4D00] bg-[#FF4D00] text-black font-bold'
                          : 'border-neutral-800 text-neutral-400'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-white font-bold uppercase mb-2 block">SIZE SELECTION</span>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`py-2 border uppercase text-center ${
                        selectedSizes.includes(size)
                          ? 'border-[#FF4D00] bg-[#FF4D00] text-black font-bold'
                          : 'border-neutral-800 text-neutral-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t border-neutral-800">
                <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
                  <input
                    type="checkbox"
                    checked={onlyNew}
                    onChange={(e) => setOnlyNew(e.target.checked)}
                    className="accent-[#FF4D00]"
                  />
                  <span>ONLY NEW DROPS</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
                  <input
                    type="checkbox"
                    checked={onlySale}
                    onChange={(e) => setOnlySale(e.target.checked)}
                    className="accent-[#FF4D00]"
                  />
                  <span>SALE ITEMS</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-neutral-800">
                <button
                  onClick={clearAllFilters}
                  className="w-1/2 py-3 border border-neutral-700 text-neutral-300 uppercase font-bold"
                >
                  RESET
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-1/2 py-3 bg-[#FF4D00] text-black uppercase font-black"
                >
                  APPLY ({products.length})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
