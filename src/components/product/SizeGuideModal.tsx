'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { SizeSystem } from '@/types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category }) => {
  const sizeSystem = useStore((state) => state.sizeSystem);
  const setSizeSystem = useStore((state) => state.setSizeSystem);

  if (!isOpen) return null;

  const sizeTable = [
    { size: 'XS', chestIN: '40"', lengthIN: '27"', chestCM: '101 cm', lengthCM: '68 cm', us: '34-36', eu: '44-46' },
    { size: 'S',  chestIN: '42"', lengthIN: '28"', chestCM: '106 cm', lengthCM: '71 cm', us: '36-38', eu: '46-48' },
    { size: 'M',  chestIN: '45"', lengthIN: '29"', chestCM: '114 cm', lengthCM: '73 cm', us: '38-40', eu: '48-50' },
    { size: 'L',  chestIN: '48"', lengthIN: '30"', chestCM: '121 cm', lengthCM: '76 cm', us: '40-42', eu: '50-52' },
    { size: 'XL', chestIN: '51"', lengthIN: '31"', chestCM: '129 cm', lengthCM: '78 cm', us: '42-44', eu: '52-54' },
    { size: 'XXL',chestIN: '54"', lengthIN: '32"', chestCM: '137 cm', lengthCM: '81 cm', us: '44-46', eu: '54-56' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-xl bg-[#121212] border border-neutral-800 p-6 sm:p-8 text-white font-mono text-xs z-10 rounded-sm shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-[#FF4D00]" />
              <span className="font-display text-2xl uppercase tracking-tight">
                04 SIZE ARCHIVE SPEC // {category}
              </span>
            </div>
            <button onClick={onClose} className="p-1 text-neutral-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Size Metric Selector */}
          <div className="flex items-center justify-between py-4 border-b border-neutral-800">
            <span className="text-neutral-400">MEASUREMENT METRIC:</span>
            <div className="flex gap-2">
              {(['IN', 'US', 'EU'] as const).map((sys) => (
                <button
                  key={sys}
                  onClick={() => setSizeSystem(sys)}
                  className={`px-3 py-1 border transition-colors ${
                    sizeSystem === sys
                      ? 'border-[#FF4D00] bg-[#FF4D00] text-black font-black'
                      : 'border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {sys} STANDARD
                </button>
              ))}
            </div>
          </div>

          {/* Measurements Table */}
          <div className="overflow-x-auto py-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-500 text-[11px]">
                  <th className="pb-2">SIZE</th>
                  <th className="pb-2">CHEST</th>
                  <th className="pb-2">LENGTH</th>
                  <th className="pb-2">INTL ({sizeSystem})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {sizeTable.map((row) => (
                  <tr key={row.size} className="hover:bg-neutral-900/50">
                    <td className="py-2.5 font-bold text-[#FF4D00]">{row.size}</td>
                    <td className="py-2.5 text-neutral-300">
                      {sizeSystem === 'EU' ? row.chestCM : row.chestIN}
                    </td>
                    <td className="py-2.5 text-neutral-300">
                      {sizeSystem === 'EU' ? row.lengthCM : row.lengthIN}
                    </td>
                    <td className="py-2.5 text-neutral-400">
                      {sizeSystem === 'EU' ? row.eu : row.us}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fit Notes */}
          <div className="mt-4 p-4 bg-neutral-950 border border-neutral-900 text-neutral-400 text-[11px] leading-relaxed">
            <strong className="text-white block mb-1">FIT PROFILE: SIGNATURE BOXY OVERSIZED</strong>
            All 04 Street Wear garments are cut intentionally oversized with exaggerated drop shoulders and wide boxy chests.
            Choose your normal size for the lookbook aesthetic, or size down one step for a traditional tailored fit.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
