'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Heart, 
  Check, 
  MessageSquare, 
  Ruler, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Flame, 
  Star, 
  ArrowRight,
  Share2
} from 'lucide-react';
import { SAMPLE_PRODUCTS } from '@/data/products';
import { ProductSize } from '@/types';
import { useStore } from '@/store/useStore';
import { formatPrice, getWhatsAppOrderUrl } from '@/utils/format';
import { ProductGallery } from '@/components/product/ProductGallery';
import { SizeGuideModal } from '@/components/product/SizeGuideModal';
import { StickyMobileBar } from '@/components/product/StickyMobileBar';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = SAMPLE_PRODUCTS.find((p) => p.slug === slug);

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<ProductSize>('M');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isInWishlist = useStore((state) => state.isInWishlist);
  const addRecentlyViewed = useStore((state) => state.addRecentlyViewed);
  const setCursor = useStore((state) => state.setCursor);
  const resetCursor = useStore((state) => state.resetCursor);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedSize(product.sizes[0] || 'M');
      addRecentlyViewed(product.id);
    }
  }, [product, addRecentlyViewed]);

  if (!product) {
    return notFound();
  }

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const whatsAppUrl = getWhatsAppOrderUrl(
    product.name,
    selectedSize,
    selectedColor,
    formatPrice(product.priceINR)
  );

  // Related products ("Complete The Look")
  const relatedProducts = SAMPLE_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isNewDrop)
  ).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F2F0EB] pt-28 pb-24 px-4 sm:px-8">
      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />

      <div className="max-w-7xl mx-auto w-full">
        {/* Breadcrumb Nav */}
        <nav className="flex items-center gap-2 font-mono text-xs text-neutral-500 uppercase mb-8">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white transition-colors">SHOP</Link>
          <span>/</span>
          <span className="text-neutral-400">{product.category}</span>
          <span>/</span>
          <span className="text-[#FF4D00] font-bold truncate">{product.name}</span>
        </nav>

        {/* Top Product Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Image Gallery with 360 Turntable */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              turntableImages={product.turntableImages}
              productName={product.name}
            />
          </div>

          {/* Right Column: Product Specs & Purchase Engine */}
          <div className="lg:col-span-5 flex flex-col justify-between font-mono">
            <div>
              {/* Product Badge & Rating */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-900 text-xs">
                <div className="flex items-center gap-2">
                  <span className="bg-[#FF4D00] text-black font-black px-2 py-0.5 text-[10px] uppercase">
                    DROP 04
                  </span>
                  <span className="text-neutral-400">{product.category}</span>
                </div>

                <div className="flex items-center gap-1 text-[#FF4D00] font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-[#FF4D00]" />
                  <span>{product.rating}</span>
                  <span className="text-neutral-500">({product.reviewCount} REVIEWS)</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight mt-4 leading-[0.9]">
                {product.name}
              </h1>
              <p className="text-xs text-[#FF4D00] uppercase font-bold tracking-wider mt-2">
                {product.subtitle}
              </p>

              {/* Price Row */}
              <div className="flex items-baseline gap-4 mt-6 pb-6 border-b border-neutral-800">
                <span className="font-display text-4xl text-white tracking-tight">
                  {formatPrice(product.priceINR)}
                </span>
                {product.compareAtPriceINR && (
                  <span className="text-neutral-500 line-through text-base">
                    {formatPrice(product.compareAtPriceINR)}
                  </span>
                )}
                <span className="text-[10px] bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-neutral-400 uppercase">
                  INCLUSIVE OF ALL TAXES
                </span>
              </div>

              {/* Stock Indicator Callout */}
              <div className="mt-6 p-3 bg-neutral-950 border border-neutral-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Flame className="w-4 h-4 text-[#FF4D00] animate-pulse" />
                  <span>
                    STOCK STATUS: <strong className="text-red-400">ONLY {product.stockCount} LEFT</strong>
                  </span>
                </div>
                <span className="text-neutral-500 text-[10px]">STRICT LIMIT 1 PER ORDER</span>
              </div>

              {/* Color Swatches */}
              <div className="mt-8">
                <div className="flex items-center justify-between text-xs text-neutral-400 uppercase mb-3">
                  <span>COLORWAY: <strong className="text-white">{selectedColor}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`relative w-9 h-9 rounded-full border-2 transition-all p-0.5 ${
                        selectedColor === color.name
                          ? 'border-[#FF4D00] scale-110'
                          : 'border-neutral-800 opacity-70 hover:opacity-100'
                      }`}
                      aria-label={`Select ${color.name}`}
                    >
                      <span
                        className="block w-full h-full rounded-full"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-8">
                <div className="flex items-center justify-between text-xs text-neutral-400 uppercase mb-3">
                  <span>SELECT SIZE: <strong className="text-white">{selectedSize}</strong></span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-[#FF4D00] hover:underline"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>SIZE GUIDE</span>
                  </button>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-center uppercase font-bold text-xs border transition-all ${
                        selectedSize === size
                          ? 'border-[#FF4D00] bg-[#FF4D00] text-black font-black'
                          : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-600 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Actions (Add to Cart + Wishlist + Share) */}
              <div className="mt-8 flex flex-col gap-3">
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleAddToCart}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 py-4 font-mono font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-xl ${
                      isAdded
                        ? 'bg-[#C6FF00] text-black'
                        : 'bg-[#FF4D00] hover:bg-white text-black'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 animate-bounce" />
                        <span>ADDED TO YOUR CART</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>ADD TO CART // SECURE PIECE</span>
                      </>
                    )}
                  </motion.button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-4 border border-neutral-800 bg-neutral-900 transition-colors ${
                      wishlisted ? 'text-[#FF4D00] border-[#FF4D00]' : 'text-neutral-400 hover:text-white'
                    }`}
                    aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${wishlisted ? 'fill-[#FF4D00]' : ''}`} />
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-4 border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
                    aria-label="Share product"
                  >
                    {copiedLink ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
                  </button>
                </div>

                {/* Instant WhatsApp Order Link */}
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 border border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-900/40 text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>ORDER VIA WHATSAPP (DIRECT UPI / COD CHAT)</span>
                </a>
              </div>

              {/* Assurance Checklist */}
              <div className="mt-8 pt-8 border-t border-neutral-800/80 grid grid-cols-3 gap-3 text-[10px] text-neutral-400 uppercase text-center">
                <div className="flex flex-col items-center gap-1.5 p-2 bg-neutral-950 border border-neutral-900">
                  <Truck className="w-4 h-4 text-[#FF4D00]" />
                  <span>FREE SHIPPING OVER ₹5,000</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 bg-neutral-950 border border-neutral-900">
                  <RotateCcw className="w-4 h-4 text-[#FF4D00]" />
                  <span>7-DAY EASY SIZE EXCHANGE</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 bg-neutral-950 border border-neutral-900">
                  <ShieldCheck className="w-4 h-4 text-[#FF4D00]" />
                  <span>100% AUTHENTIC ARCHIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Fabric Specs & Silhouette Notes */}
        <div className="mt-24 pt-16 border-t border-neutral-800 grid grid-cols-1 lg:grid-cols-3 gap-12 font-mono text-xs">
          {/* Story & Description */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-2xl text-white uppercase tracking-tight mb-4">
              ARCHIVE DESIGN NOTES
            </h3>
            <p className="text-neutral-400 leading-relaxed uppercase">
              {product.description}
            </p>
          </div>

          {/* Construction & Features List */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-2xl text-white uppercase tracking-tight mb-4">
              TECHNICAL SPECIFICATIONS
            </h3>
            <ul className="flex flex-col gap-2.5 text-neutral-300">
              {product.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#FF4D00] font-bold">/</span>
                  <span className="uppercase">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mill & Textile Origin */}
          <div className="lg:col-span-1 bg-neutral-950 border border-neutral-900 p-6 flex flex-col justify-between">
            <div>
              <span className="text-[#FF4D00] font-bold uppercase tracking-wider block mb-2">
                MILL & TEXTILE MATRIX
              </span>
              <div className="flex flex-col gap-2 text-neutral-400">
                <div>MATERIAL: <strong className="text-white">{product.fabricSpecs.material}</strong></div>
                <div>WEIGHT: <strong className="text-white">{product.fabricSpecs.weight}</strong></div>
                <div>SILHOUETTE: <strong className="text-white">{product.fabricSpecs.fit}</strong></div>
                <div>ORIGIN: <strong className="text-white">{product.fabricSpecs.origin}</strong></div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800/80 text-[10px] text-neutral-500 uppercase">
              ALL WASH CARE: MACHINE WASH COLD INSIDE OUT // FLAT DRY ONLY
            </div>
          </div>
        </div>

        {/* Client Reviews Section */}
        <div className="mt-24 pt-16 border-t border-neutral-800 font-mono">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#FF4D00] uppercase font-bold tracking-widest mb-1">
                <span>COMMUNITY VERIFICATION</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl text-white uppercase tracking-tight">
                ARCHIVE REVIEWS ({product.reviewCount})
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#FF4D00] font-bold">
              <span>OVERALL RATING: {product.rating} / 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 bg-neutral-950 border border-neutral-800/80 flex flex-col justify-between text-xs"
              >
                <div>
                  <div className="flex items-center justify-between text-neutral-400 mb-2">
                    <span className="text-white font-bold">{rev.author}</span>
                    <span className="text-[11px] text-neutral-500">{rev.date}</span>
                  </div>
                  <div className="flex text-[#FF4D00] mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FF4D00]" />
                    ))}
                  </div>
                  <p className="text-neutral-300 leading-relaxed uppercase">
                    &quot;{rev.comment}&quot;
                  </p>
                </div>
                {rev.verified && (
                  <div className="mt-4 pt-3 border-t border-neutral-900 text-[10px] text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>VERIFIED ARCHIVE BUYER</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* "Complete The Look" / Related Products Recommendations */}
        <div className="mt-28 pt-16 border-t border-neutral-800">
          <div className="flex items-end justify-between pb-8">
            <div>
              <span className="font-mono text-xs text-[#FF4D00] uppercase font-bold tracking-widest mb-1 block">
                STYLE RECOMMENDATIONS
              </span>
              <h2 className="font-display text-4xl sm:text-6xl text-white uppercase tracking-tight">
                COMPLETE THE LOOK
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-1 font-mono text-xs text-neutral-400 hover:text-white uppercase"
            >
              <span>BROWSE ALL</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.slug}`}
                onMouseEnter={() => setCursor('VIEW')}
                onMouseLeave={resetCursor}
                className="group flex flex-col bg-[#111111] border border-neutral-800 hover:border-[#FF4D00] transition-colors overflow-hidden"
              >
                <div className="relative aspect-[3/4] w-full bg-neutral-950 overflow-hidden">
                  <Image
                    src={rel.images[0]}
                    alt={rel.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="25vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-[10px] bg-black/60 text-neutral-300 px-2 py-0.5 border border-neutral-800 uppercase">
                      {rel.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1 font-mono text-xs">
                  <div>
                    <h4 className="font-display text-lg text-white group-hover:text-[#FF4D00] transition-colors truncate">
                      {rel.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                      {rel.subtitle}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-neutral-900 text-white font-bold">
                    {formatPrice(rel.priceINR)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Add To Cart Bar on Mobile */}
      <StickyMobileBar
        product={product}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        onAddToCart={handleAddToCart}
        isAdded={isAdded}
      />
    </main>
  );
}
