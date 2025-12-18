import React from 'react';
import { motion } from 'framer-motion';

export function QuickSortVisualizer() {
  // Simple sorting animation with 5 bars of different widths
  const initialBars = [30, 60, 20, 80, 40];
  const sortedBars = [...initialBars].sort((a, b) => a - b);
  const maxBar = 80;
  // Different widths for each bar
  const widths = ['w-6', 'w-8', 'w-5', 'w-12', 'w-7'];

  return (
    <div className="flex items-end justify-center gap-2 h-20 w-full">
      {initialBars.map((val, idx) => {
        const normalizedHeight = (val / maxBar) * 60;
        const sortedIdx = sortedBars.indexOf(val);
        
        return (
          <motion.div
            key={idx}
            className={`${widths[idx]} bg-gradient-to-t from-cyan-500 to-cyan-400 border border-cyan-300 rounded-sm cursor-pointer`}
            style={{
              height: `${normalizedHeight}px`,
              minHeight: '4px',
            }}
            animate={{
              x: (sortedIdx - idx) * 35,
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.1, filter: 'brightness(1.3)' }}
          />
        );
      })}
    </div>
  );
}
