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
    <div className="flex items-end justify-center gap-2 h-48 w-full p-4 border-2 border-primary/20 bg-black/50 relative">
        <div className="absolute top-2 left-2 text-xs text-primary/50">MEMORY_VIEW</div>
      {arr.map((val, idx) => {
        const isHighlighted = highlightIndices.includes(idx);
        let barColor = "bg-primary/20 border-primary";
        
        if (isHighlighted) {
            if (type === 'swap') barColor = "bg-yellow-500/80 border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.5)]";
            else if (type === 'compare') barColor = "bg-blue-500/80 border-blue-400";
            else if (type === 'found') barColor = "bg-white border-white shadow-[0_0_15px_rgba(255,255,255,0.8)]";
            else barColor = "bg-primary border-primary"; // Default highlight
        }

        return (
          <div key={idx} className="flex flex-col items-center gap-2 w-8 md:w-12">
            <span className={cn(
                "text-xs font-mono mb-1 transition-colors duration-200",
                isHighlighted ? "text-white font-bold" : "text-primary/50"
            )}>
                {val}
            </span>
            <motion.div 
                layout
                className={cn(
                    "w-full border transition-colors duration-200 rounded-sm relative",
                    barColor
                )}
                style={{ height: `${Math.max(val * 3, 4)}px` }}
            >
                {/* Index label at bottom */}
            </motion.div>
            <span className="text-[10px] text-primary/30 mt-1">{idx}</span>
          </div>
        );
      })}
    </div>
  );
}
