'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, MessageSquare, Tag, ShieldCheck } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { formatPrice, formatSinglePrice, getWhatsAppOrderUrl } from '@/utils/format';

export const CartDrawer: React.FC = () => {
  const cart = useStore((state) => state.cart);
  const isCartOpen = useStore((state) => state.isCartOpen);
  const setCartOpen = useStore((state) => state.setCartOpen);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const currency = useStore((state) => state.currency);
  const appliedPromo = useStore((state) => state.appliedPromo);
  const promoError = useStore((state) => state.promoError);
  const applyPromo = useStore((state) => state.applyPromo);
  const removePromo = useStore((state) => state.removePromo);

  const [promoInput, setPromoInput] = useState('');

  // Subtotal calculation (Pure INR)
  const subtotal = cart.reduce((acc, item) => {
    return acc + item.product.priceINR * item.quantity;
  }, 0);

  // Free shipping threshold: ₹5000
  const freeShippingThreshold = 5000;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Discount calculation
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discountPercent) / 100 : 0;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 250;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = applyPromo(promoInput);
    if (success) setPromoInput('');
  };

  // WhatsApp order link summary
  const whatsAppSummaryText = cart.map(i => `${i.product.name} (${i.selectedSize}, ${i.selectedColor}) x${i.quantity}`).join(', ');
  const whatsAppUrl = getWhatsAppOrderUrl(
    whatsAppSummaryText || 'Multiple Items',
    'Cart Bundle',
    'Mixed',
    formatSinglePrice(total, currency)
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[120] overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#0D0D0D] border-l border-neutral-800 flex flex-col justify-between shadow-2xl text-white"
          >
            {/* Header */}
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-[#121212]">
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl tracking-tight uppercase">YOUR CART</span>
                <span className="font-mono text-xs bg-[#FF4D00] text-black font-extrabold px-1.5 py-0.5">
                  [{cart.reduce((a, b) => a + b.quantity, 0)}]
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="px-5 py-3 bg-neutral-900/60 border-b border-neutral-800/80 font-mono text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-neutral-400">
                  {amountForFreeShipping === 0 ? (
                    <span className="text-[#C6FF00] font-bold">✓ UNLOCKED FREE STREET SHIPPING</span>
                  ) : (
                    <span>
                      ADD <span className="text-[#FF4D00] font-bold">{formatSinglePrice(amountForFreeShipping, currency)}</span> FOR FREE SHIPPING
                    </span>
                  )}
                </span>
                <span className="text-neutral-500">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#FF4D00] to-[#C6FF00]"
                  style={{ width: `${freeShippingProgress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.4 }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-900">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 border border-dashed border-neutral-700 flex items-center justify-center mb-4">
                    <span className="font-display text-2xl text-neutral-600">04</span>
                  </div>
                  <h3 className="font-display text-2xl text-white uppercase tracking-tight">CART IS EMPTY</h3>
                  <p className="font-mono text-xs text-neutral-500 mt-1 max-w-xs">
                    Limited drop quantities go fast. Secure your archive pieces before sold out.
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-6 px-6 py-2.5 bg-[#FF4D00] text-black font-mono font-bold text-xs uppercase hover:bg-white transition-colors"
                  >
                    EXPLORE DROP 04
                  </button>
                </div>
              ) : (
                cart.map((item) => {
                  const itemPrice = currency === 'INR' ? item.product.priceINR : item.product.priceUSD;
                  return (
                    <div key={item.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                      <div className="relative w-20 h-24 bg-neutral-950 shrink-0 border border-neutral-800">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-display text-base tracking-tight text-white leading-tight truncate">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-neutral-500 hover:text-red-400 p-0.5 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3 font-mono text-[11px] text-neutral-400 mt-1">
                            <span>SIZE: <strong className="text-white">{item.selectedSize}</strong></span>
                            <span>•</span>
                            <span className="truncate">COLOR: <strong className="text-white">{item.selectedColor}</strong></span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3 font-mono">
                          <div className="flex items-center border border-neutral-800 bg-neutral-900">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:text-[#FF4D00] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-white tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:text-[#FF4D00] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-sm font-bold text-white">
                            {formatSinglePrice(itemPrice * item.quantity, currency)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer with Checkout Actions */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-neutral-800 bg-[#121212] flex flex-col gap-3 font-mono">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="PROMO (TRY 'DROP04')"
                      className="w-full bg-neutral-900 border border-neutral-800 px-3 py-2 text-xs text-white uppercase placeholder-neutral-500 focus:outline-none focus:border-[#FF4D00]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white uppercase transition-colors shrink-0"
                  >
                    APPLY
                  </button>
                </form>

                {appliedPromo && (
                  <div className="flex items-center justify-between text-xs text-[#C6FF00] bg-[#C6FF00]/10 border border-[#C6FF00]/20 px-2.5 py-1.5">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      {appliedPromo.code}: {appliedPromo.description}
                    </span>
                    <button onClick={removePromo} className="hover:underline text-neutral-400">
                      REMOVE
                    </button>
                  </div>
                )}

                {promoError && (
                  <p className="text-xs text-red-400">{promoError}</p>
                )}

                {/* Subtotals breakdown */}
                <div className="flex flex-col gap-1.5 text-xs text-neutral-400 pt-2 border-t border-neutral-800/80">
                  <div className="flex justify-between">
                    <span>SUBTOTAL</span>
                    <span className="text-white">{formatSinglePrice(subtotal, currency)}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-[#C6FF00]">
                      <span>DISCOUNT ({appliedPromo.discountPercent}%)</span>
                      <span>-{formatSinglePrice(discountAmount, currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>ESTIMATED SHIPPING</span>
                    <span className="text-white">{shippingFee === 0 ? 'FREE' : formatSinglePrice(shippingFee, currency)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                    <span className="font-display text-lg tracking-tight">TOTAL</span>
                    <span className="text-[#FF4D00] text-base">{formatSinglePrice(total, currency)}</span>
                  </div>
                </div>

                {/* Main Checkout Button */}
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="w-full py-3.5 bg-[#FF4D00] hover:bg-white text-black font-mono font-black text-xs uppercase tracking-widest text-center transition-colors flex items-center justify-center gap-2"
                >
                  <span>PROCEED TO SECURE CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Indian Streetwear Fast WhatsApp Chat Order */}
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 border border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-900/40 text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>ORDER VIA WHATSAPP (INSTANT UPI / COD)</span>
                </a>

                <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  <span>END-TO-END ENCRYPTED // 7-DAY ARCHIVE RETURNS</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
