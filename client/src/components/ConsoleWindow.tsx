import React, { useEffect, useRef } from 'react';
import { LogStep } from '@/lib/algorithms';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ConsoleWindowProps {
  logs: LogStep[];
  isProcessing: boolean;
}

export function ConsoleWindow({ logs, isProcessing }: ConsoleWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full h-full gradient-card rounded-lg p-4 font-mono text-sm md:text-base relative overflow-hidden group">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent"></div>
      </div>

      {/* Header Bar */}
      <div className="relative z-10 h-8 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-b border-blue-400/30 flex items-center px-4 justify-between rounded-t-lg mb-2 -m-4 mb-4 px-4">
        <span className="text-primary font-bold tracking-wider text-xs glow-text">◆ EXECUTION_LOG</span>
        <div className="flex gap-2">
           <div className="w-3 h-3 rounded-full bg-red-500 border border-red-300/50 animate-pulse"></div>
           <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-300/50 animate-pulse animation-delay-100"></div>
           <div className="w-3 h-3 rounded-full bg-green-500 border border-green-300/50 animate-pulse animation-delay-200"></div>
        </div>
      </div>

      {/* Content Area */}
      <div 
        ref={scrollRef}
        className="relative z-10 h-[calc(100%-2.5rem)] overflow-y-auto font-mono space-y-1 pb-4"
      >
        <AnimatePresence>
          {logs.map((log, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex gap-2 px-2 py-1 rounded text-xs md:text-sm transition-all",
                log.type === 'swap' && "text-yellow-300 font-bold bg-yellow-900/20 border-l-2 border-yellow-400",
                log.type === 'compare' && "text-cyan-300 bg-cyan-900/10",
                log.type === 'found' && "text-green-300 bg-green-900/30 font-bold border-l-2 border-green-400",
                log.type === 'not-found' && "text-red-300 bg-red-900/20 border-l-2 border-red-400",
                log.type === 'done' && "text-white font-bold border-t border-dashed border-blue-400/50 pt-2 mt-2 text-green-200 bg-green-900/20",
                log.type === 'info' && "text-blue-200"
              )}
            >
              <span className="select-none opacity-50 shrink-0 font-mono text-[10px]">#{index.toString().padStart(3, '0')}</span>
              <span className="break-words flex-1">
                {log.type === 'swap' && '⇄ SWAP: '}
                {log.type === 'compare' && '◎ CMP: '}
                {log.type === 'info' && '→ '}
                {log.type === 'found' && '✓ FOUND: '}
                {log.type === 'not-found' && '✗ NOT FOUND: '}
                {log.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isProcessing && (
           <div className="flex gap-2 text-blue-300 animate-pulse font-bold">
             <span className="select-none opacity-50 font-mono text-[10px]">#{logs.length.toString().padStart(3, '0')}</span>
             <span className="inline-block w-2 h-4 bg-blue-400 rounded-sm animate-pulse"></span>
           </div>
        )}
      </div>
    </div>
  );
}
