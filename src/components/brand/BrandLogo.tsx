'use client';

import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'monogram' | 'compact' | 'symbol';
  accent?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'full',
  accent = false,
}) => {
  if (variant === 'monogram') {
    return (
      <div className={`inline-flex items-center select-none font-display ${className}`}>
        <span className="text-3xl font-black tracking-tighter text-white">
          04
          <span className="text-[#FF4D00]">.</span>
        </span>
      </div>
    );
  }

  if (variant === 'symbol') {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`w-10 h-10 ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" fill="#0A0A0A" />
        <rect x="2" y="2" width="96" height="96" stroke="#262626" strokeWidth="2" />
        {/* '0' - Brutalist Box */}
        <path
          d="M20 25 H45 V75 H20 Z M30 38 V62 H35 V38 Z"
          fill="currentColor"
          fillRule="evenodd"
        />
        {/* '4' - Geometric Cut */}
        <path
          d="M55 25 H65 V55 H80 V65 H65 V75 H55 V65 H45 V55 L55 25 Z M55 55 V38 L49 55 Z"
          fill="#FF4D00"
          fillRule="evenodd"
        />
        <circle cx="85" cy="25" r="3" fill="#FF4D00" />
      </svg>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-1.5 select-none ${className}`}>
        <span className="font-display text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
          04
        </span>
        <span className="font-sans text-[10px] md:text-xs font-mono font-bold tracking-widest text-[#FF4D00] uppercase bg-[#FF4D00]/10 px-1.5 py-0.5 border border-[#FF4D00]/30">
          STREET
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-none">
          04
        </span>
        <span className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#F2F0EB] uppercase leading-none">
          STREET WEAR
        </span>
        <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
      </div>
      <div className="flex items-center justify-between text-[8px] font-mono tracking-widest text-neutral-500 uppercase mt-0.5 border-t border-neutral-800/80 pt-0.5">
        <span>ARCHIVE DEPT</span>
        <span className="text-[#FF4D00]">DROP 04 // ACTIVE</span>
        <span>TYO • BOM</span>
      </div>
    </div>
  );
};
