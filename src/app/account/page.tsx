'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Package, Clock, ShoppingBag, Trash2, User, LogIn, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { SAMPLE_PRODUCTS } from '@/data/products';
import { formatPrice } from '@/utils/format';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'wishlist' | 'orders' | 'history'>('wishlist');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const wishlist = useStore((state) => state.wishlist);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const recentlyViewed = useStore((state) => state.recentlyViewed);
  const addToCart = useStore((state) => state.addToCart);

  const wishlistedProducts = SAMPLE_PRODUCTS.filter((p) => wishlist.includes(p.id));
  const recentProducts = SAMPLE_PRODUCTS.filter((p) => recentlyViewed.includes(p.id));

  const sampleOrders = [
    {
      id: '04-ORD-881204',
      date: 'OCTOBER 04, 2026',
      status: 'DELIVERED',
      totalINR: 5999,
      item: '04 MONOLITH HEAVY HOODIE (L, ACID BLACK)',
    },
    {
      id: '04-ORD-772190',
      date: 'SEPTEMBER 18, 2026',
      status: 'ARCHIVED',
      totalINR: 2799,
      item: '04 ARCHIVE OVERSIZED TEE (XL, VINTAGE OFF-WHITE)',
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail.trim()) setIsLoggedIn(true);
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F2F0EB] pt-28 pb-24 px-4 sm:px-8 font-mono text-xs">
      <div className="max-w-7xl mx-auto w-full">
        {/* Overhead Billboard */}
        <div className="pb-8 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="text-[#FF4D00] font-bold uppercase tracking-widest block mb-1">
              [ ARCHIVE IDENTITY // CLIENT PROFILE ]
            </span>
            <h1 className="font-display text-5xl sm:text-7xl text-white uppercase tracking-tight leading-none">
              MEMBER ACCOUNT
            </h1>
          </div>

          {/* User Auth Badge */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 p-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FF4D00] text-black font-black flex items-center justify-center text-xs">
                {userEmail.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <span className="text-white font-bold block">{userEmail}</span>
                <span className="text-[10px] text-[#C6FF00]">VIP ARCHIVE LEVEL 04</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setUserEmail('resident@04streetwear.com');
                  setIsLoggedIn(true);
                }}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white uppercase text-[11px] transition-colors"
              >
                SIGN IN WITH GOOGLE
              </button>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-neutral-800 py-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 uppercase font-bold flex items-center gap-2 border transition-colors ${
              activeTab === 'wishlist'
                ? 'border-[#FF4D00] bg-[#FF4D00] text-black font-black'
                : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>MY WISHLIST ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 uppercase font-bold flex items-center gap-2 border transition-colors ${
              activeTab === 'orders'
                ? 'border-[#FF4D00] bg-[#FF4D00] text-black font-black'
                : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>ORDER ARCHIVE (2)</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 uppercase font-bold flex items-center gap-2 border transition-colors ${
              activeTab === 'history'
                ? 'border-[#FF4D00] bg-[#FF4D00] text-black font-black'
                : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>RECENTLY VIEWED ({recentProducts.length})</span>
          </button>
        </div>

        {/* Tab 1: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="pt-10">
            {wishlistedProducts.length === 0 ? (
              <div className="py-24 text-center border border-dashed border-neutral-800 p-8">
                <Heart className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
                <h3 className="font-display text-3xl text-white uppercase">NO WISHLISTED PIECES</h3>
                <p className="text-neutral-400 mt-1 max-w-sm mx-auto uppercase">
                  Click the heart icon on any silhouette to bookmark it for future drop purchases.
                </p>
                <Link
                  href="/shop"
                  className="mt-6 inline-flex px-6 py-2.5 bg-[#FF4D00] text-black font-black uppercase"
                >
                  EXPLORE SHOP
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col bg-[#111111] border border-neutral-800 overflow-hidden"
                  >
                    <Link href={`/products/${product.slug}`} className="relative aspect-[3/4] w-full bg-neutral-950 block">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="25vw"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product.id);
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-[#FF4D00] border border-neutral-800"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </Link>

                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div>
                        <h4 className="font-display text-lg text-white uppercase truncate">
                          {product.name}
                        </h4>
                        <p className="text-[#FF4D00] font-bold mt-0.5">
                          {formatPrice(product.priceINR)}
                        </p>
                      </div>

                      <button
                        onClick={() => addToCart(product, product.colors[0].name, product.sizes[0], 1)}
                        className="mt-4 w-full py-2.5 bg-white hover:bg-[#FF4D00] text-black font-black uppercase flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>MOVE TO CART</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Orders */}
        {activeTab === 'orders' && (
          <div className="pt-10 flex flex-col gap-4">
            {sampleOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-6 bg-[#111111] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <strong className="text-white text-sm">{ord.id}</strong>
                    <span className="px-2 py-0.5 bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold uppercase">
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-neutral-400 uppercase">{ord.item}</p>
                  <p className="text-neutral-500 text-[10px] mt-1">{ord.date}</p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="font-display text-2xl text-[#FF4D00] block">
                    {formatPrice(ord.totalINR)}
                  </span>
                  <span className="text-[10px] text-neutral-500">EXPRESS AIRWAY BILL #04-EXP-9921</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Recently Viewed */}
        {activeTab === 'history' && (
          <div className="pt-10">
            {recentProducts.length === 0 ? (
              <p className="text-neutral-500 uppercase py-12 text-center">
                NO RECENTLY VIEWED ITEMS RECORDED.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    className="p-4 bg-[#111111] border border-neutral-800 hover:border-[#FF4D00] transition-colors flex gap-4 items-center"
                  >
                    <div className="relative w-16 h-20 bg-neutral-950 shrink-0 border border-neutral-800">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-display text-base text-white uppercase truncate">{p.name}</h4>
                      <p className="text-[#FF4D00] font-bold text-xs">{formatPrice(p.priceINR)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
