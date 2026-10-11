'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useStore } from '@/store/useStore';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorText = useStore((state) => state.cursorText);
  const cursorVariant = useStore((state) => state.cursorVariant);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth physics for trailing ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const hasText = cursorText.trim().length > 0;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300">
      {/* Trailing Ring / Morphing Bubble */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hasText ? 84 : cursorVariant === 'magnetic' ? 52 : 36,
          height: hasText ? 84 : cursorVariant === 'magnetic' ? 52 : 36,
          backgroundColor: hasText ? '#FF4D00' : 'rgba(255, 77, 0, 0.08)',
          borderColor: hasText ? '#FF4D00' : 'rgba(255, 77, 0, 0.6)',
          borderWidth: hasText ? 0 : 1.5,
          scale: 1,
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
      >
        {hasText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[11px] font-black tracking-widest text-black font-sans uppercase select-none text-center px-1"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Tiny Center Dot (hidden when expanded into text bubble) */}
      {!hasText && (
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 bg-[#FF4D00] rounded-full pointer-events-none"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}
    </div>
  );
};
