import React from 'react';
import { motion } from 'framer-motion';

export function QuickSortVisualizer() {
  // Simple sorting animation with 5 bars
  const initialBars = [30, 60, 20, 80, 40];
  const sortedBars = [...initialBars].sort((a, b) => a - b);
  const maxBar = 80;

  return (
    <div className="flex items-end justify-center gap-2 h-16 w-full">
      {initialBars.map((val, idx) => {
        const normalizedHeight = (val / maxBar) * 50;
        const sortedIdx = sortedBars.indexOf(val);
        
        return (
          <motion.div
            key={idx}
            className="flex-1 bg-gradient-to-t from-cyan-500 to-cyan-400 border border-cyan-300 rounded-sm cursor-pointer"
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
