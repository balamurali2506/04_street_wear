'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { ShieldCheck, CreditCard, QrCode, Truck, Check, ArrowRight, Lock } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { formatSinglePrice } from '@/utils/format';

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useStore((state) => state.cart);
  const appliedPromo = useStore((state) => state.appliedPromo);
  const clearCart = useStore((state) => state.clearCart);

  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'upi' | 'cod'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  // Customer form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    upiId: '',
  });

  // Pure INR calculation
  const subtotal = cart.reduce((acc, item) => acc + item.product.priceINR * item.quantity, 0);
  const freeShippingThreshold = 5000;
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discountPercent) / 100 : 0;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 250;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    // Simulate payment transaction
    setTimeout(() => {
      // Fire celebration confetti
      confetti({
        particleCount: 120,
        spread: 90,
        colors: ['#FF4D00', '#C6FF00', '#ffffff'],
      });

      // Generate order ID
      const orderNumber = `04-${Math.floor(100000 + Math.random() * 900000)}`;
      sessionStorage.setItem('last_order_id', orderNumber);
      sessionStorage.setItem('last_order_total', String(total));
      sessionStorage.setItem('last_order_email', formData.email || 'customer@streetwear.in');

      clearCart();
      router.push(`/checkout/success?order=${orderNumber}`);
    }, 1800);
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] text-[#F2F0EB] pt-32 pb-24 px-4 sm:px-8 text-center font-mono">
        <div className="max-w-md mx-auto p-8 border border-neutral-800 bg-[#111111]">
          <h2 className="font-display text-4xl text-white uppercase mb-2">CART IS EMPTY</h2>
          <p className="text-xs text-neutral-400 mb-6">
            Add items to your cart before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="px-6 py-3 bg-[#FF4D00] text-black font-black text-xs uppercase"
          >
            RETURN TO SHOP
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F2F0EB] pt-28 pb-24 px-4 sm:px-8 font-mono text-xs">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="pb-8 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-[#FF4D00] font-bold uppercase tracking-widest block mb-1">
              [ SECURE TRANSACTION // 256-BIT ENCRYPTION ]
            </span>
            <h1 className="font-display text-4xl sm:text-6xl text-white uppercase tracking-tight">
              DISPATCH & PAYMENT
            </h1>
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <Lock className="w-4 h-4 text-[#C6FF00]" />
            <span className="hidden sm:inline">STRIPE TEST MODE ACTIVE</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10">
          {/* Left Form: Shipping Details & Payment Selector */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* 1. Customer Information */}
            <div className="bg-[#121212] border border-neutral-800 p-6 sm:p-8">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight mb-6 pb-3 border-b border-neutral-800">
                1. CONTACT & SHIPPING ADDRESS
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-400 block mb-1">FIRST NAME *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="E.G. ROHAN"
                    className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white uppercase focus:outline-none focus:border-[#FF4D00]"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">LAST NAME *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="E.G. MEHTA"
                    className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white uppercase focus:outline-none focus:border-[#FF4D00]"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="YOU@DOMAIN.COM"
                    className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white uppercase focus:outline-none focus:border-[#FF4D00]"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">PHONE NUMBER (FOR OTP/SMS) *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white uppercase focus:outline-none focus:border-[#FF4D00]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-neutral-400 block mb-1">DELIVERY STREET ADDRESS *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="APARTMENT, STREET, LOCALITY"
                    className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white uppercase focus:outline-none focus:border-[#FF4D00]"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">CITY *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="MUMBAI / BANGALORE / DELHI"
                    className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white uppercase focus:outline-none focus:border-[#FF4D00]"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">PINCODE *</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="400050"
                    className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white uppercase focus:outline-none focus:border-[#FF4D00]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Selector */}
            <div className="bg-[#121212] border border-neutral-800 p-6 sm:p-8">
              <h2 className="font-display text-2xl text-white uppercase tracking-tight mb-6 pb-3 border-b border-neutral-800">
                2. SELECT PAYMENT METHOD
              </h2>

              <div className="flex flex-col gap-3">
                {/* UPI Option */}
                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 border cursor-pointer flex items-center justify-between transition-colors ${
                    paymentMethod === 'upi'
                      ? 'border-[#FF4D00] bg-neutral-900'
                      : 'border-neutral-800 bg-neutral-950/60 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-[#FF4D00]"
                    />
                    <div>
                      <strong className="text-white block uppercase">INSTANT UPI (GPAY, PHONEPE, PAYTM)</strong>
                      <span className="text-neutral-400 text-[11px]">Zero transaction fees. Instant verification.</span>
                    </div>
                  </div>
                  <QrCode className="w-5 h-5 text-[#FF4D00]" />
                </label>

                {/* Stripe Test Mode Option */}
                <label
                  onClick={() => setPaymentMethod('stripe')}
                  className={`p-4 border cursor-pointer flex items-center justify-between transition-colors ${
                    paymentMethod === 'stripe'
                      ? 'border-[#FF4D00] bg-neutral-900'
                      : 'border-neutral-800 bg-neutral-950/60 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'stripe'}
                      onChange={() => setPaymentMethod('stripe')}
                      className="accent-[#FF4D00]"
                    />
                    <div>
                      <strong className="text-white block uppercase">STRIPE CREDIT / DEBIT CARD (TEST MODE)</strong>
                      <span className="text-neutral-400 text-[11px]">Visa, Mastercard, RuPay, Amex accepted.</span>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-neutral-400" />
                </label>

                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 border cursor-pointer flex items-center justify-between transition-colors ${
                    paymentMethod === 'cod'
                      ? 'border-[#FF4D00] bg-neutral-900'
                      : 'border-neutral-800 bg-neutral-950/60 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#FF4D00]"
                    />
                    <div>
                      <strong className="text-white block uppercase">CASH ON DELIVERY (COD)</strong>
                      <span className="text-neutral-400 text-[11px]">Pay upon arrival to courier.</span>
                    </div>
                  </div>
                  <Truck className="w-5 h-5 text-neutral-400" />
                </label>
              </div>

              {/* Conditional UPI Input */}
              {paymentMethod === 'upi' && (
                <div className="mt-4 p-4 bg-neutral-950 border border-neutral-800">
                  <label className="text-neutral-400 block mb-1">ENTER UPI ID OR MOBILE NUMBER</label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    placeholder="NAME@OKAXIS / NAME@YBL / 9876543210@PAYTM"
                    className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white uppercase focus:outline-none focus:border-[#FF4D00]"
                  />
                  <span className="text-[10px] text-neutral-500 mt-1 block">
                    You will receive an instant payment request in your UPI application.
                  </span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#FF4D00] hover:bg-white text-black font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>AUTHORIZING STREETWEAR ORDER...</span>
                </>
              ) : (
                <>
                  <span>CONFIRM ORDER & PAY {formatSinglePrice(total)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-[#121212] border border-neutral-800 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h2 className="font-display text-2xl text-white uppercase tracking-tight pb-3 border-b border-neutral-800 mb-6">
                ORDER SUMMARY [{cart.length} SILHOUETTES]
              </h2>

              {/* Items List */}
              <div className="divide-y divide-neutral-900 max-h-80 overflow-y-auto pr-2 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3">
                    <div className="relative w-14 h-16 bg-neutral-950 shrink-0 border border-neutral-800">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold truncate uppercase">{item.product.name}</h4>
                      <p className="text-[11px] text-neutral-500 uppercase">
                        SIZE: {item.selectedSize} • COLOR: {item.selectedColor} • QTY: {item.quantity}
                      </p>
                      <p className="text-[#FF4D00] font-bold mt-1">
                        {formatSinglePrice(item.product.priceINR * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="flex flex-col gap-2 pt-4 border-t border-neutral-800 text-neutral-400">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="text-white font-bold">{formatSinglePrice(subtotal)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-[#C6FF00]">
                    <span>PROMO ({appliedPromo.code})</span>
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
                  <span className="font-display text-2xl tracking-tight">TOTAL (INR)</span>
                  <span className="text-[#FF4D00] font-display text-2xl">{formatSinglePrice(total)}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-900 flex items-center justify-between text-neutral-500 text-[10px] uppercase">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF4D00]" />
                <span>BUYER PROTECTION INCLUDED</span>
              </span>
              <span>EST. DISPATCH: 24-48 HRS</span>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
