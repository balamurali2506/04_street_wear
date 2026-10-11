'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { Lock, Unlock, Clock, Bell, Flame, Check, ArrowRight, ShieldAlert } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '@/data/products';
import { useStore } from '@/store/useStore';
import { formatPrice } from '@/utils/format';

export default function DropsPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 42,
    seconds: 19,
  });

  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const setCursor = useStore((state) => state.setCursor);
  const resetCursor = useStore((state) => state.resetCursor);
  const addToCart = useStore((state) => state.addToCart);

  // Live countdown timer ticking
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Passcode: "ARCHIVE04" or "VIP04" or "04"
    if (password.trim().toUpperCase() === 'ARCHIVE04' || password.trim().toUpperCase() === 'VIP04' || password.trim() === '04') {
      setIsUnlocked(true);
      setPasswordError(false);
      confetti({
        particleCount: 100,
        spread: 80,
        colors: ['#FF4D00', '#C6FF00', '#ffffff'],
      });
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 2500);
    }
  };

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setIsSubscribed(true);
    confetti({
      particleCount: 50,
      spread: 60,
      colors: ['#FF4D00', '#ffffff'],
    });
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F2F0EB] pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Overhead Billboard */}
        <div className="text-center max-w-3xl mx-auto pb-16 border-b border-neutral-900">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase text-[#FF4D00] bg-[#FF4D00]/10 border border-[#FF4D00]/30 px-3 py-1 mb-4 font-bold">
            <Flame className="w-4 h-4" />
            <span>DROP 05 // CLASSIFIED RELEASE</span>
          </div>
          <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl text-white uppercase tracking-tight leading-none">
            TITAN PROTOCOL
          </h1>
          <p className="font-mono text-xs sm:text-sm text-neutral-400 mt-4 uppercase leading-relaxed max-w-xl mx-auto">
            Strict run of 50 serialized heavy outerwear and armor garments. Once the countdown expires, the archive opens to public checkout.
          </p>

          {/* Live High-Voltage Countdown */}
          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-xl mx-auto mt-12 font-mono">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center justify-center p-4 sm:p-6 bg-[#111111] border border-neutral-800"
              >
                <span className="font-display text-4xl sm:text-6xl text-white tabular-nums leading-none">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-[#FF4D00] font-bold tracking-widest mt-2">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* SMS / Email Notify Form */}
          <div className="mt-10 max-w-md mx-auto">
            {isSubscribed ? (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 font-mono text-xs flex items-center justify-center gap-2 uppercase">
                <Check className="w-4 h-4" />
                <span>YOU WILL RECEIVE AN SMS & EMAIL 15 MIN PRIOR TO DROP.</span>
              </div>
            ) : (
              <form onSubmit={handleNotifyMe} className="flex gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="EMAIL / PHONE FOR DROP ALERT..."
                  required
                  className="flex-1 bg-neutral-900 border border-neutral-800 px-4 py-3 font-mono text-xs text-white placeholder-neutral-500 uppercase focus:outline-none focus:border-[#FF4D00]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white hover:bg-[#FF4D00] text-black font-mono font-black text-xs uppercase tracking-wider transition-colors shrink-0"
                >
                  NOTIFY ME
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Secret Early Access Vault */}
        <div className="mt-20 p-8 sm:p-12 bg-[#0E0E0E] border border-neutral-800 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#FF4D00] uppercase font-bold tracking-wider mb-1">
                {isUnlocked ? <Unlock className="w-4 h-4 text-[#C6FF00]" /> : <Lock className="w-4 h-4" />}
                <span>{isUnlocked ? 'VAULT UNLOCKED // VIP PASS ACTIVE' : 'SECRET EARLY ACCESS VAULT'}</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl text-white uppercase tracking-tight">
                {isUnlocked ? 'PRIVATE ALLOTMENT GRANTED' : 'ENTER VIP PASSPHRASE'}
              </h2>
              <p className="font-mono text-xs text-neutral-400 mt-1 uppercase">
                {isUnlocked
                  ? 'You now have priority access to checkout Drop 04 before general public.'
                  : 'Holding a VIP archive key card? Enter code (Hint: "ARCHIVE04") to bypass the countdown.'}
              </p>
            </div>

            {!isUnlocked && (
              <form onSubmit={handleUnlock} className="flex gap-2 shrink-0 font-mono">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="PASSPHRASE (TRY 'ARCHIVE04')..."
                  className="bg-neutral-900 border border-neutral-700 px-4 py-3 text-xs text-white uppercase placeholder-neutral-500 focus:outline-none focus:border-[#FF4D00]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#FF4D00] hover:bg-white text-black font-black text-xs uppercase tracking-wider transition-colors"
                >
                  UNLOCK
                </button>
              </form>
            )}
          </div>

          {passwordError && (
            <div className="mt-4 p-3 bg-red-950/40 border border-red-500/40 text-red-400 font-mono text-xs uppercase">
              ACCESS DENIED // INVALID PASSPHRASE. CHECK VIP INVITATION SLIP.
            </div>
          )}

          {/* Unlocked / Teaser Products Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            {SAMPLE_PRODUCTS.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className={`relative flex flex-col bg-neutral-950 border transition-all ${
                  isUnlocked ? 'border-neutral-800 hover:border-[#FF4D00]' : 'border-neutral-900 opacity-60'
                }`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className={`object-cover ${!isUnlocked ? 'blur-sm grayscale' : ''}`}
                    sizes="25vw"
                  />

                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-center">
                      <Lock className="w-6 h-6 text-neutral-400 mb-2" />
                      <span className="font-mono text-[10px] text-neutral-300 uppercase tracking-widest">
                        LOCKED ARCHIVE
                      </span>
                    </div>
                  )}

                  {isUnlocked && (
                    <div className="absolute top-3 left-3 bg-[#C6FF00] text-black font-mono text-[10px] font-black px-2 py-0.5 uppercase">
                      VIP READY
                    </div>
                  )}
                </div>

                <div className="p-4 font-mono text-xs flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="font-display text-lg text-white uppercase truncate">{item.name}</h4>
                    <p className="text-[11px] text-[#FF4D00]">{formatPrice(item.priceINR)}</p>
                  </div>

                  {isUnlocked ? (
                    <button
                      onClick={() => addToCart(item, item.colors[0].name, item.sizes[0], 1)}
                      className="mt-4 w-full py-2.5 bg-[#FF4D00] hover:bg-white text-black font-black uppercase text-xs transition-colors"
                    >
                      SECURE ALLOTMENT
                    </button>
                  ) : (
                    <div className="mt-4 text-[10px] text-neutral-500 uppercase">
                      RELEASING IN {timeLeft.days}D {timeLeft.hours}H
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
