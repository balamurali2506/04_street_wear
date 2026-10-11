import type { Metadata } from 'next';
import { Bebas_Neue, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Preloader } from '@/components/ui/Preloader';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '04 STREET WEAR // ARCHIVE SPEC // DROP 04',
  description: 'Limited drops, architectural silhouettes, heavyweight raw streetwear. Tokyo • Mumbai underground.',
  keywords: ['Streetwear', '04 Street Wear', 'Heavyweight Hoodie', 'Drop 04', 'Tokyo Streetwear', 'Indian Streetwear'],
  openGraph: {
    title: '04 STREET WEAR // ARCHIVE SPEC',
    description: 'Limited drops, architectural silhouettes, heavyweight raw streetwear. Tokyo • Mumbai underground.',
    url: 'https://04streetwear.com',
    siteName: '04 STREET WEAR',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: '04 Street Wear Lookbook',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${spaceGrotesk.variable} dark antialiased`}
    >
      <body className="bg-[#0A0A0A] text-[#F2F0EB] min-h-screen flex flex-col font-sans selection:bg-[#FF4D00] selection:text-black">
        {/* Subtle Film Grain SVG Texture */}
        <div className="grain-overlay" />

        {/* 1. Preloader: counter 0->100 with brand mask reveal, then curtain wipe */}
        <Preloader />

        {/* Custom Cursor: dot + trailing ring morphs to text */}
        <CustomCursor />

        {/* Smooth inertia scrolling synced with GSAP */}
        <SmoothScroll>
          {/* Global Sticky Navigation */}
          <Navbar />

          {/* Page Viewport */}
          <div className="flex-1">{children}</div>

          {/* Global Footer */}
          <Footer />

          {/* Cmd+K Instant Command Palette */}
          <CommandPalette />

          {/* Slide-in Cart Drawer */}
          <CartDrawer />
        </SmoothScroll>
      </body>
    </html>
  );
}
