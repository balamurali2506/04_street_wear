'use client';

import React from 'react';
import Image from 'next/image';
import { Instagram, Heart, ExternalLink } from 'lucide-react';
import { INSTAGRAM_POSTS } from '@/data/products';
import { useStore } from '@/store/useStore';

export const InstagramFeed: React.FC = () => {
  const setCursor = useStore((state) => state.setCursor);
  const resetCursor = useStore((state) => state.resetCursor);

  return (
    <section className="py-24 px-4 sm:px-8 bg-[#0A0A0A] border-b border-neutral-900">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF4D00] uppercase font-bold tracking-widest mb-1">
              <Instagram className="w-4 h-4" />
              <span>COMMUNITY & ARCHIVE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl text-white uppercase tracking-tight">
              @04_STREET_WEAR
            </h2>
          </div>

          <a
            href="https://instagram.com/04_street_wear"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursor('FOLLOW')}
            onMouseLeave={resetCursor}
            className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white uppercase tracking-wider transition-colors"
          >
            <span>FOLLOW ON INSTAGRAM</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#FF4D00]" />
          </a>
        </div>

        {/* 6-Item High-Contrast Feed Strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-8">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/04_street_wear"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursor('IG')}
              onMouseLeave={resetCursor}
              className="group relative aspect-square overflow-hidden bg-neutral-900 border border-neutral-800"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-75"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 text-white font-mono text-xs">
                <div className="flex items-center justify-between text-[#FF4D00]">
                  <Instagram className="w-4 h-4" />
                  <span className="flex items-center gap-1 text-[11px] text-white">
                    <Heart className="w-3 h-3 fill-[#FF4D00] text-[#FF4D00]" />
                    {post.likes}
                  </span>
                </div>
                <p className="text-[10px] text-neutral-300 line-clamp-3 leading-tight uppercase">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
