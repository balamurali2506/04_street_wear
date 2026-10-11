'use client';

import React from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { Product, ProductSize } from '@/types';
import { formatPrice } from '@/utils/format';

interface StickyMobileBarProps {
  product: Product;
  selectedSize: ProductSize;
  selectedColor: string;
  onAddToCart: () => void;
  isAdded: boolean;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  product,
  selectedSize,
  selectedColor,
  onAddToCart,
  isAdded,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0E0E0E]/95 backdrop-blur-lg border-t border-neutral-800 p-3 sm:hidden flex items-center justify-between gap-3 font-mono">
      <div className="flex flex-col min-w-0">
        <span className="text-white font-bold text-sm truncate">{product.name}</span>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#FF4D00] font-black">{formatPrice(product.priceINR)}</span>
          <span className="text-neutral-500">•</span>
          <span className="text-neutral-300">SIZE {selectedSize}</span>
        </div>
      </div>

      <button
        onClick={onAddToCart}
        className={`px-5 py-3 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0 ${
          isAdded ? 'bg-[#C6FF00] text-black' : 'bg-[#FF4D00] text-black hover:bg-white'
        }`}
      >
        {isAdded ? (
          <>
            <Check className="w-4 h-4 animate-bounce" />
            <span>ADDED</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-4 h-4" />
            <span>ADD TO CART</span>
          </>
        )}
      </button>
    </div>
  );
};
