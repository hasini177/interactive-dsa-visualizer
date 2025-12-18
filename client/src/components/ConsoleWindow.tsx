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
    <div className="w-full h-full bg-black border-2 border-primary/30 rounded-none p-4 font-mono text-sm md:text-base relative overflow-hidden shadow-[0_0_20px_rgba(0,255,65,0.1)]">
      {/* Header Bar */}
      <div className="absolute top-0 left-0 w-full h-8 bg-primary/10 border-b border-primary/20 flex items-center px-4 justify-between">
        <span className="text-primary font-bold tracking-wider text-xs">TERMINAL_OUTPUT // C++ VISUALIZER</span>
        <div className="flex gap-2">
           <div className="w-3 h-3 rounded-full bg-red-900 border border-red-500/50"></div>
           <div className="w-3 h-3 rounded-full bg-yellow-900 border border-yellow-500/50"></div>
           <div className="w-3 h-3 rounded-full bg-green-900 border border-green-500/50"></div>
        </div>
      </div>

      {/* Content Area */}
      <div 
        ref={scrollRef}
        className="mt-8 h-[calc(100%-2rem)] overflow-y-auto font-mono space-y-1 pb-4"
      >
        <AnimatePresence>
          {logs.map((log, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "flex gap-2",
                log.type === 'swap' && "text-yellow-400 font-bold",
                log.type === 'compare' && "text-primary/70",
                log.type === 'found' && "text-white bg-green-900/50 p-1",
                log.type === 'not-found' && "text-red-400",
                log.type === 'done' && "text-white font-bold border-t border-dashed border-primary/30 pt-2 mt-2"
              )}
            >
              <span className="select-none opacity-50 shrink-0">[{index.toString().padStart(3, '0')}]</span>
              <span className="break-words">
                {log.type === 'swap' && '> SWAP: '}
                {log.type === 'compare' && '> CMP: '}
                {log.type === 'info' && '> INFO: '}
                {log.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isProcessing && (
           <div className="flex gap-2 text-primary animate-pulse">
             <span className="select-none opacity-50">[{logs.length.toString().padStart(3, '0')}]</span>
             <span>_</span>
           </div>
        )}
      </div>
    </div>
  );
}
