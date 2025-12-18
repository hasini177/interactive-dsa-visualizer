import React from 'react';
import { motion } from 'framer-motion';

export function QuickSearchVisualizer() {
  // Simple search animation with 5 elements
  const items = [10, 25, 40, 65, 90];
  const targetIdx = 3;

  return (
    <div className="flex items-center justify-center gap-2 h-16 w-full">
      {items.map((val, idx) => (
        <motion.div
          key={idx}
          className={`flex items-center justify-center text-xs font-bold rounded-lg border-2 h-12 w-12 ${
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
