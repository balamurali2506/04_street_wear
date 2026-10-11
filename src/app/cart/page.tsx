'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, MessageSquare, Tag, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { formatPrice, formatSinglePrice, getWhatsAppOrderUrl } from '@/utils/format';

export default function StandaloneCartPage() {
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);
  const appliedPromo = useStore((state) => state.appliedPromo);
  const promoError = useStore((state) => state.promoError);
  const applyPromo = useStore((state) => state.applyPromo);
  const removePromo = useStore((state) => state.removePromo);

  const [promoInput, setPromoInput] = useState('');

  // Pure INR subtotal
  const subtotal = cart.reduce((acc, item) => acc + item.product.priceINR * item.quantity, 0);
  const freeShippingThreshold = 5000;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discountPercent) / 100 : 0;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 250;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = applyPromo(promoInput);
    if (success) setPromoInput('');
  };

  const whatsAppSummaryText = cart.map((i) => `${i.product.name} (${i.selectedSize}, ${i.selectedColor}) x${i.quantity}`).join(', ');
  const whatsAppUrl = getWhatsAppOrderUrl(
    whatsAppSummaryText || 'Multiple Items',
    'Cart Bundle',
    'Mixed',
    formatSinglePrice(total)
  );

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F2F0EB] pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Overhead Billboard */}
        <div className="pb-8 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-[#FF4D00] uppercase font-bold tracking-widest block mb-1">
              [ SHOPPING ARCHIVE ]
            </span>
            <h1 className="font-display text-5xl sm:text-7xl text-white uppercase tracking-tight leading-none">
              YOUR CART ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h1>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-neutral-500 hover:text-red-400 font-mono text-xs uppercase"
            >
              CLEAR ENTIRE CART
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="py-28 text-center border border-dashed border-neutral-800 my-12 p-8 font-mono">
            <span className="font-display text-5xl text-neutral-600">04</span>
            <h2 className="font-display text-4xl text-white uppercase tracking-tight mt-3">
              YOUR CART IS CURRENTLY EMPTY
            </h2>
            <p className="text-xs text-neutral-400 mt-2 max-w-sm mx-auto uppercase">
              Browse our Drop 04 collection to secure limited pieces before the run sells out.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-flex px-8 py-3.5 bg-[#FF4D00] hover:bg-white text-black font-black text-xs uppercase tracking-wider transition-colors"
            >
              BROWSE COLLECTION
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10 items-start">
            {/* Left Items Column */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Free Shipping Tracker */}
              <div className="p-4 bg-neutral-950 border border-neutral-800 font-mono text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-neutral-300">
                    {amountForFreeShipping === 0 ? (
                      <span className="text-[#C6FF00] font-bold">✓ UNLOCKED FREE ALL-INDIA EXPRESS SHIPPING</span>
                    ) : (
                      <span>
                        ADD <span className="text-[#FF4D00] font-bold">{formatSinglePrice(amountForFreeShipping)}</span> MORE FOR FREE EXPRESS SHIPPING
                      </span>
                    )}
                  </span>
                  <span className="text-neutral-500">{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF4D00] to-[#C6FF00] transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-neutral-900 border border-neutral-800 bg-[#0E0E0E]">
                {cart.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 font-mono">
                    <div className="relative w-28 h-36 bg-neutral-950 shrink-0 border border-neutral-800">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-[10px] text-[#FF4D00] uppercase font-bold">
                              {item.product.category}
                            </span>
                            <h3 className="font-display text-2xl text-white uppercase tracking-tight">
                              {item.product.name}
                            </h3>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-500 hover:text-red-400 p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-neutral-400 mt-2">
                          <span>SIZE: <strong className="text-white">{item.selectedSize}</strong></span>
                          <span>•</span>
                          <span>COLOR: <strong className="text-white">{item.selectedColor}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-900">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-neutral-800 bg-neutral-900">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:text-[#FF4D00] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold text-white tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:text-[#FF4D00] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="font-display text-2xl text-white">
                            {formatSinglePrice(item.product.priceINR * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-4 bg-[#121212] border border-neutral-800 p-6 sm:p-8 font-mono text-xs flex flex-col gap-6">
              <h3 className="font-display text-3xl text-white uppercase tracking-tight pb-4 border-b border-neutral-800">
                ORDER BREAKDOWN
              </h3>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="PROMO CODE (E.G. 'DROP04')"
                  className="flex-1 bg-neutral-900 border border-neutral-800 px-3 py-2.5 text-xs text-white uppercase placeholder-neutral-500 focus:outline-none focus:border-[#FF4D00]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold uppercase transition-colors"
                >
                  APPLY
                </button>
              </form>

              {appliedPromo && (
                <div className="flex items-center justify-between text-[#C6FF00] bg-[#C6FF00]/10 border border-[#C6FF00]/20 p-2.5">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Tag className="w-3.5 h-3.5" />
                    {appliedPromo.code}: {appliedPromo.description}
                  </span>
                  <button onClick={removePromo} className="underline text-neutral-400">
                    REMOVE
                  </button>
                </div>
              )}

              {promoError && <p className="text-red-400 text-xs">{promoError}</p>}

              {/* Price Details */}
              <div className="flex flex-col gap-2.5 pt-4 border-t border-neutral-800/80 text-neutral-400">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="text-white font-bold">{formatSinglePrice(subtotal)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-[#C6FF00]">
                    <span>PROMO DISCOUNT ({appliedPromo.discountPercent}%)</span>
                    <span>-{formatSinglePrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>EXPRESS AIR SHIPPING</span>
                  <span className="text-white font-bold">
                    {shippingFee === 0 ? 'FREE' : formatSinglePrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base text-white font-bold pt-4 border-t border-neutral-800">
                  <span className="font-display text-xl tracking-tight">TOTAL DUE</span>
                  <span className="text-[#FF4D00] text-xl font-display">{formatSinglePrice(total)}</span>
                </div>
              </div>

              {/* Checkout Link */}
              <Link
                href="/checkout"
                className="w-full py-4 bg-[#FF4D00] hover:bg-white text-black font-black text-xs uppercase tracking-widest text-center transition-colors flex items-center justify-center gap-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* WhatsApp Order */}
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 border border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-900/40 text-emerald-400 font-bold text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>ORDER VIA WHATSAPP (INSTANT UPI)</span>
              </a>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 pt-2 border-t border-neutral-900">
                <ShieldCheck className="w-4 h-4 text-neutral-400" />
                <span>SSL ENCRYPTED // ALL PAYMENTS SECURED</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
