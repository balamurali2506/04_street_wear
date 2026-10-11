'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Search, Menu, X, Globe, Sliders } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { BrandLogo } from '@/components/brand/BrandLogo';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const cart = useStore((state) => state.cart);
  const wishlist = useStore((state) => state.wishlist);
  const currency = useStore((state) => state.currency);
  const setCurrency = useStore((state) => state.setCurrency);
  const sizeSystem = useStore((state) => state.sizeSystem);
  const setSizeSystem = useStore((state) => state.setSizeSystem);
  const setCartOpen = useStore((state) => state.setCartOpen);
  const setSearchOpen = useStore((state) => state.setSearchOpen);
  const setCursor = useStore((state) => state.setCursor);
  const resetCursor = useStore((state) => state.resetCursor);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 30);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((scrollY / docHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut Cmd/Ctrl + K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);

  const navLinks = [
    { label: 'SHOP', href: '/shop' },
    { label: 'DROPS', href: '/drops', badge: 'LIVE' },
    { label: 'LOOKBOOK', href: '/lookbook' },
    { label: 'ABOUT', href: '/about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/85 backdrop-blur-md border-b border-neutral-800/80 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Menu Trigger + Main Nav Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 text-neutral-300 hover:text-white"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setCursor('NAV')}
                    onMouseLeave={resetCursor}
                    className={`relative text-xs font-mono font-bold tracking-widest uppercase transition-colors hover:text-[#FF4D00] flex items-center gap-1.5 ${
                      isActive ? 'text-[#FF4D00]' : 'text-neutral-300'
                    }`}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="text-[9px] bg-[#FF4D00] text-black font-extrabold px-1 py-0.2 rounded-xs">
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FF4D00]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex items-center justify-center">
            <Link
              href="/"
              onMouseEnter={() => setCursor('04')}
              onMouseLeave={resetCursor}
              className="flex items-center"
            >
              <BrandLogo variant="compact" />
            </Link>
          </div>

          {/* Right: Currency / Region Switcher + Search + Wishlist + Cart */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Currency Badge */}
            <div className="hidden sm:flex items-center bg-neutral-900 border border-neutral-800 rounded-sm px-2.5 py-1 text-[11px] font-mono text-white">
              <span className="text-[#FF4D00] font-black mr-1.5">₹</span>
              <span className="tracking-wider">INR</span>
            </div>

            {/* Instant Search Button (Cmd+K) */}
            <button
              onClick={() => setSearchOpen(true)}
              onMouseEnter={() => setCursor('SEARCH')}
              onMouseLeave={resetCursor}
              className="flex items-center gap-2 text-neutral-300 hover:text-[#FF4D00] transition-colors p-1.5"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5" />
              <span className="hidden xl:inline text-[10px] font-mono bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 text-neutral-400">
                ⌘K
              </span>
            </button>

            {/* Wishlist Link */}
            <Link
              href="/account"
              onMouseEnter={() => setCursor('WISH')}
              onMouseLeave={resetCursor}
              className="relative p-1.5 text-neutral-300 hover:text-[#FF4D00] transition-colors"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF4D00] text-black text-[10px] font-black rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setCartOpen(true)}
              onMouseEnter={() => setCursor('CART')}
              onMouseLeave={resetCursor}
              className="relative p-1.5 text-neutral-300 hover:text-[#FF4D00] transition-colors flex items-center gap-1.5"
              aria-label="Open cart drawer"
            >
              <ShoppingBag className="w-5 h-5" />
              <motion.span
                key={totalCartCount}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 bg-[#FF4D00] text-black text-xs font-black rounded-full flex items-center justify-center tabular-nums"
              >
                {totalCartCount}
              </motion.span>
            </button>
          </div>
        </div>

        {/* Global Scroll Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-[#FF4D00] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {/* Mobile Slide-over Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-xl lg:hidden flex flex-col justify-between p-6"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <BrandLogo variant="compact" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-neutral-400 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 my-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-4xl sm:text-5xl tracking-tight text-white hover:text-[#FF4D00] transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-xs bg-[#FF4D00] text-black font-sans font-black px-2 py-0.5">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-3xl tracking-tight text-neutral-400 hover:text-[#FF4D00] transition-colors mt-4"
              >
                ACCOUNT / WISHLIST
              </Link>
            </nav>

            <div className="border-t border-neutral-800 pt-6 flex flex-col gap-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">REGION & CURRENCY</span>
                <div className="flex gap-2">
                  <span className="px-3 py-1 border border-[#FF4D00] bg-[#FF4D00] text-black font-bold">
                    INDIA // INR (₹)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-500">SIZE METRIC</span>
                <div className="flex gap-2">
                  {(['IN', 'US', 'EU'] as const).map((sys) => (
                    <button
                      key={sys}
                      onClick={() => setSizeSystem(sys)}
                      className={`px-2.5 py-1 border ${
                        sizeSystem === sys
                          ? 'border-[#FF4D00] text-[#FF4D00] font-bold'
                          : 'border-neutral-800 text-neutral-400'
                      }`}
                    >
                      {sys}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
