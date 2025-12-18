import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ArrayDisplayProps {
  arr: number[];
  highlightIndices?: number[];
  type?: 'swap' | 'compare' | 'found' | 'none';
}

export function ArrayDisplay({ arr, highlightIndices = [], type = 'none' }: ArrayDisplayProps) {
  // Calculate max value to normalize bar heights
  const maxVal = Math.max(...arr, 1);
  const containerHeight = 160; // Fixed height in px
  const barMaxHeight = containerHeight - 30; // Reserve space for labels
  
  // Varied width classes (from narrow to wide) for visual interest
  const widthClasses = ['w-3', 'w-8', 'w-4', 'w-10', 'w-5', 'w-9', 'w-4', 'w-7', 'w-6', 'w-11', 'w-3', 'w-8', 'w-5', 'w-10', 'w-6'];
  // Height scale multipliers to vary bar proportions (same height only if same value)
  const heightScales = [1.1, 0.8, 1.3, 0.9, 1.2, 0.7, 1.4, 0.85, 1.0, 0.95, 1.2, 0.8, 1.1, 0.9, 1.3];

  return (
    <div className="w-full rounded-lg gradient-card relative overflow-hidden group bg-gradient-to-b from-blue-950/50 to-blue-900/30 border-2 border-blue-400/20">
      {/* Hover overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>

      {/* Label */}
      <div className="absolute top-3 left-4 text-xs font-bold text-primary glow-text z-10">[ ARRAY_VIEW ]</div>

      {/* Bars Container */}
      <div className="flex items-end justify-center gap-2 md:gap-3 h-56 w-full p-4 md:p-6 relative">
        {arr.map((val, idx) => {
          const isHighlighted = highlightIndices.includes(idx);
          let barColor = "bg-gradient-to-t from-blue-500/40 to-blue-400/20 border-blue-400/40";
          
          if (isHighlighted) {
            if (type === 'swap') barColor = "bg-gradient-to-t from-yellow-500 to-yellow-400 border-yellow-300 shadow-[0_0_20px_rgba(234,179,8,0.8)]";
            else if (type === 'compare') barColor = "bg-gradient-to-t from-cyan-500 to-cyan-400 border-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.8)]";
            else if (type === 'found') barColor = "bg-gradient-to-t from-green-500 to-green-400 border-green-300 shadow-[0_0_20px_rgba(34,197,94,0.8)]";
            else barColor = "bg-gradient-to-t from-blue-600 to-blue-400 border-blue-300";
          }

          // Normalize height: (val / maxVal) * barMaxHeight with scaling for visual variety
          const baseHeight = (val / maxVal) * barMaxHeight;
          const scaleMultiplier = heightScales[idx % heightScales.length];
          const normalizedHeight = baseHeight * scaleMultiplier;
          const barWidth = widthClasses[idx % widthClasses.length];

          return (
            <motion.div 
              key={idx} 
              className={`flex flex-col items-center justify-end h-full gap-1 ${barWidth} relative group/bar`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              {/* Value Label - top */}
              <div className="h-5 md:h-6 flex items-end justify-center mb-1 w-full">
                <span className={cn(
                  "text-[10px] md:text-xs font-mono font-bold transition-all duration-300 whitespace-nowrap",
                  isHighlighted ? "text-white text-base" : "text-blue-300/70"
                )}>
                  {val}
                </span>
              </div>

              {/* Bar */}
              <motion.div 
                layout
                className={cn(
                  "w-full border-2 transition-all duration-200 rounded-md relative cursor-pointer flex-1 min-h-[8px] max-h-[160px]",
                  barColor
                )}
                style={{ 
                  height: `${Math.max(normalizedHeight, 8)}px`,
                  maxHeight: `${barMaxHeight}px`
                }}
                whileHover={{ scale: 1.05, filter: 'brightness(1.2)' }}
              >
                <div className="absolute inset-0 rounded-md opacity-0 group-hover/bar:opacity-100 transition-opacity">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              </motion.div>

              {/* Index Label - bottom */}
              <div className="h-5 flex items-start justify-center w-full pt-1">
                <span className={cn(
                  "text-[10px] font-mono font-semibold transition-colors duration-300",
                  isHighlighted ? "text-blue-200" : "text-blue-400/50"
                )}>
                  {idx}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
