import React from 'react';
import { motion } from 'framer-motion';

export function QuickSearchVisualizer() {
  // Simple search animation with 5 elements of different sizes
  const items = [10, 25, 40, 65, 90];
  const targetIdx = 3;
  // Different sizes for each element
  const sizes = ['h-8 w-8', 'h-10 w-10', 'h-12 w-12', 'h-14 w-14', 'h-9 w-9'];
  const textSizes = ['text-[10px]', 'text-xs', 'text-sm', 'text-base', 'text-xs'];

  return (
    <div className="flex items-center justify-center gap-2 h-20 w-full">
      {items.map((val, idx) => (
        <motion.div
          key={idx}
          className={`${sizes[idx]} ${textSizes[idx]} flex items-center justify-center font-bold rounded-lg border-2 ${
            idx === targetIdx
              ? 'bg-green-500/80 border-green-300 text-white'
              : 'bg-blue-500/40 border-blue-300 text-blue-200'
          }`}
          animate={{
            scale: idx === targetIdx ? [1, 1.2, 1] : 1,
            backgroundColor:
              idx === targetIdx
                ? ['rgba(34, 197, 94, 0.8)', 'rgba(34, 197, 94, 1)', 'rgba(34, 197, 94, 0.8)']
                : 'rgba(59, 130, 246, 0.4)',
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{ scale: 1.15 }}
        >
          {val}
        </motion.div>
      ))}
    </div>
  );
}
