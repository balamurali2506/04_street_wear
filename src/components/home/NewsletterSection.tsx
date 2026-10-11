'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Check, Shield, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const setCursor = useStore((state) => state.setCursor);
  const resetCursor = useStore((state) => state.resetCursor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#FF4D00', '#C6FF00', '#ffffff', '#000000'],
    });

    setIsSubscribed(true);
  };

  return (
    <section className="py-28 px-4 sm:px-8 bg-[#0D0D0D] border-b border-neutral-900 relative overflow-hidden">
      {/* Background ambient brutalist glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF4D00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase text-[#FF4D00] bg-[#FF4D00]/10 border border-[#FF4D00]/30 px-3 py-1 mb-4 font-bold">
          <Shield className="w-3.5 h-3.5" />
          <span>VIP ACCESS // DROP NOTIFICATIONS</span>
        </div>

        <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-white uppercase tracking-tight leading-none">
          NEVER MISS A DROP
        </h2>

        <p className="mt-4 font-mono text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto uppercase leading-relaxed">
          Our limited capsule pieces sell out in minutes. Join the inner syndicate for 15-minute early access passwords, SMS drop alerts, and archive private sales.
        </p>

        {/* Input Form */}
        <div className="mt-8 max-w-md mx-auto">
          {isSubscribed ? (
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/50 flex items-center justify-center gap-3 text-emerald-400 font-mono text-xs uppercase">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>ACCESS GRANTED. CHECK INBOX FOR YOUR VIP DROP CODE.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL FOR VIP PASS..."
                  required
                  className="w-full px-4 py-3.5 bg-neutral-900 border border-neutral-800 text-white font-mono text-xs placeholder-neutral-500 focus:outline-none focus:border-[#FF4D00] uppercase tracking-wider"
                />
              </div>

              <button
                type="submit"
                onMouseEnter={() => setCursor('JOIN')}
                onMouseLeave={resetCursor}
                className="px-6 py-3.5 bg-[#FF4D00] hover:bg-white text-black font-mono font-black text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shrink-0"
              >
                <span>GET ACCESS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="mt-4 flex items-center justify-center gap-6 font-mono text-[10px] text-neutral-600 uppercase">
            <span>NO SPAM // ONLY RELEASES</span>
            <span>•</span>
            <span>UNSUBSCRIBE ANYTIME</span>
          </div>
        </div>
      </div>
    </section>
  );
};
