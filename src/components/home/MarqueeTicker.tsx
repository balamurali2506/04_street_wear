'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MarqueeTicker: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    let currentSpeed = 1;
    // Calibrated slow, hypnotic luxury glide speed
    const baseVelocity = -0.06;

    // Track scroll velocity subtly using ScrollTrigger
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = self.getVelocity() / 800;
        currentSpeed = Math.min(Math.max(1 + Math.abs(velocity), 1), 2.0);
      },
    });

    let progress = 0;
    const ticker = gsap.ticker.add(() => {
      progress += baseVelocity * currentSpeed;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${progress % 50}%)`;
      }
      // Gentle decay back to standard speed
      currentSpeed += (1 - currentSpeed) * 0.03;
    });

    return () => {
      gsap.ticker.remove(ticker);
      st.kill();
    };
  }, []);

  const items = [
    '04 STREET WEAR',
    'LIMITED TO 50 UNITS',
    '500 GSM HEAVYWEIGHT TERRY',
    'ARCHIVE DROP 04',
    'NEVER MASS PRODUCED',
    'TOKYO × MUMBAI',
    'BALLISTIC CORDURA®',
    'WORLDWIDE SHIPPING',
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#FF4D00] text-black py-3 sm:py-4 select-none border-y-2 border-black"
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform font-display text-2xl sm:text-3xl md:text-4xl tracking-tight uppercase"
        style={{ width: 'fit-content' }}
      >
        {/* Repeating text blocks for seamless infinite ticker */}
        {[...items, ...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center mx-4 sm:mx-6 gap-4 sm:gap-6">
            <span className="font-black">{text}</span>
            <span className="inline-block w-2.5 h-2.5 bg-black rotate-45 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
