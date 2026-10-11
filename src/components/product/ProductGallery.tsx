'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, ZoomIn, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useStore } from '@/store/useStore';

interface ProductGalleryProps {
  images: string[];
  turntableImages: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  turntableImages,
  productName,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [is360Mode, setIs360Mode] = useState(false);
  const [turntableIndex, setTurntableIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 50, y: 50 });

  const setCursor = useStore((state) => state.setCursor);
  const resetCursor = useStore((state) => state.resetCursor);

  const turntableRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);

  // 360 Scrub Drag Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!is360Mode) return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (is360Mode && isDraggingRef.current) {
      const deltaX = e.clientX - startXRef.current;
      if (Math.abs(deltaX) > 20) {
        const step = deltaX > 0 ? 1 : -1;
        setTurntableIndex((prev) => (prev + step + turntableImages.length) % turntableImages.length);
        startXRef.current = e.clientX;
      }
    } else if (isZoomed) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomCoords({ x, y });
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 w-full">
      {/* Thumbnails Strip */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible shrink-0 no-scrollbar">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIs360Mode(false);
              setSelectedIndex(idx);
            }}
            className={`relative w-16 sm:w-20 aspect-[3/4] bg-neutral-900 border transition-all shrink-0 overflow-hidden ${
              !is360Mode && selectedIndex === idx
                ? 'border-[#FF4D00] ring-1 ring-[#FF4D00]'
                : 'border-neutral-800 opacity-60 hover:opacity-100'
            }`}
          >
            <Image
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}

        {/* 360 Mode Trigger Thumbnail */}
        {turntableImages.length > 0 && (
          <button
            onClick={() => setIs360Mode(true)}
            className={`relative w-16 sm:w-20 aspect-[3/4] bg-neutral-900 border flex flex-col items-center justify-center gap-1 transition-all shrink-0 font-mono text-[9px] uppercase ${
              is360Mode
                ? 'border-[#FF4D00] text-[#FF4D00] bg-neutral-800'
                : 'border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <RotateCw className="w-5 h-5 text-[#FF4D00] animate-spin-slow" />
            <span className="font-bold">360° VIEW</span>
          </button>
        )}
      </div>

      {/* Main Hero Gallery Viewport */}
      <div
        ref={turntableRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => setCursor(is360Mode ? 'DRAG 360' : isZoomed ? 'ZOOM' : 'VIEW')}
        onMouseLeave={() => {
          handleMouseUp();
          resetCursor();
        }}
        className={`relative flex-1 aspect-[3/4] bg-neutral-950 border border-neutral-800 overflow-hidden select-none ${
          is360Mode ? 'cursor-grab active:cursor-grabbing' : 'cursor-crosshair'
        }`}
      >
        {is360Mode ? (
          // 360° Turntable Mode
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={turntableImages[turntableIndex] || images[0]}
              alt={`${productName} 360 frame`}
              fill
              className="object-cover pointer-events-none"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            {/* 360 Indicator Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs bg-black/75 backdrop-blur-md px-3 py-2 border border-neutral-800 text-neutral-300">
              <span className="flex items-center gap-2 text-[#FF4D00]">
                <RotateCw className="w-4 h-4 animate-spin-slow" />
                <span>INTERACTIVE 360° TURNTABLE</span>
              </span>
              <span>[ DRAG TO ROTATE ]</span>
            </div>
          </div>
        ) : (
          // Standard Zoomable Image View
          <div
            className="relative w-full h-full"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <Image
              src={images[selectedIndex]}
              alt={productName}
              fill
              className={`object-cover transition-transform duration-200 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              style={
                isZoomed
                  ? { transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%` }
                  : undefined
              }
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />

            {/* Bottom Controls */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(!isZoomed);
                }}
                className="p-2 bg-black/70 backdrop-blur-md border border-neutral-800 hover:border-white text-white rounded-full transition-colors"
                aria-label="Toggle zoom"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Gallery Previous / Next Buttons */}
        {!is360Mode && images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 backdrop-blur-md border border-neutral-800 hover:border-white text-white rounded-full transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev + 1) % images.length);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 backdrop-blur-md border border-neutral-800 hover:border-white text-white rounded-full transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
