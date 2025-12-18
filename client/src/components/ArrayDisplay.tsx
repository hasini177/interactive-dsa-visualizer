import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ArrayDisplayProps {
  arr: number[];
  highlightIndices?: number[];
  type?: 'swap' | 'compare' | 'found' | 'none';
}

export function ArrayDisplay({ arr, highlightIndices = [], type = 'none' }: ArrayDisplayProps) {
  return (
    <div className="flex items-end justify-center gap-3 h-56 w-full p-6 rounded-lg gradient-card relative overflow-hidden group">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
        <div className="absolute top-3 left-4 text-xs font-bold text-primary glow-text">[ ARRAY_VIEW ]</div>
      {arr.map((val, idx) => {
        const isHighlighted = highlightIndices.includes(idx);
        let barColor = "bg-gradient-to-t from-blue-500/40 to-blue-400/20 border-blue-400/40";
        
        if (isHighlighted) {
            if (type === 'swap') barColor = "bg-gradient-to-t from-yellow-500 to-yellow-400 border-yellow-300 shadow-[0_0_20px_rgba(234,179,8,0.8)]";
            else if (type === 'compare') barColor = "bg-gradient-to-t from-cyan-500 to-cyan-400 border-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.8)]";
            else if (type === 'found') barColor = "bg-gradient-to-t from-green-500 to-green-400 border-green-300 shadow-[0_0_20px_rgba(34,197,94,0.8)]";
            else barColor = "bg-gradient-to-t from-blue-600 to-blue-400 border-blue-300";
        }

        return (
          <motion.div 
            key={idx} 
            className="flex flex-col items-center gap-2 w-10 md:w-14 relative group/bar"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <span className={cn(
                "text-xs md:text-sm font-mono font-bold mb-1 transition-all duration-300",
                isHighlighted ? "text-white text-base scale-110" : "text-blue-300/60"
            )}>
                {val}
            </span>
            <motion.div 
                layout
                className={cn(
                    "w-full border-2 transition-all duration-200 rounded-md relative cursor-pointer",
                    barColor
                )}
                style={{ height: `${Math.max(val * 3.5, 8)}px` }}
                whileHover={{ scale: 1.05, filter: 'brightness(1.2)' }}
            >
                <div className="absolute inset-0 rounded-md opacity-0 group-hover/bar:opacity-100 transition-opacity">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
            </motion.div>
            <span className={cn("text-[10px] md:text-xs font-mono font-semibold transition-colors duration-300", isHighlighted ? "text-blue-200" : "text-blue-400/40")}>{idx}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
