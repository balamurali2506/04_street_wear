'use client';

import React from 'react';
import { Hero3D } from '@/components/home/Hero3D';
import { MarqueeTicker } from '@/components/home/MarqueeTicker';
import { FeaturedDropHorizontal } from '@/components/home/FeaturedDropHorizontal';
import { ProductGridSection } from '@/components/home/ProductGridSection';
import { LookbookParallax } from '@/components/home/LookbookParallax';
import { InstagramFeed } from '@/components/home/InstagramFeed';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <main className="relative flex flex-col min-h-screen bg-[#0A0A0A] text-[#F2F0EB]">
      {/* 2. Hero: 3D rotating metallic emblem, staggered character reveal, magnetic button */}
      <Hero3D />

      {/* 3. Velocity Reactive Infinite Marquee Ticker */}
      <MarqueeTicker />

      {/* 4. Featured Drop: GSAP ScrollTrigger Pinned Horizontal Section */}
      <FeaturedDropHorizontal />

      {/* 5. Product Grid: Hover Image Swap, Quick-Add, and Category Filters */}
      <ProductGridSection />

      {/* 6. Lookbook: Parallax Image Collage with Scroll Reveals */}
      <LookbookParallax />

      {/* 7. Instagram Feed Strip (@04_street_wear) */}
      <InstagramFeed />

      {/* 8. Newsletter Signup with Confetti Celebration */}
      <NewsletterSection />
    </main>
  );
}
