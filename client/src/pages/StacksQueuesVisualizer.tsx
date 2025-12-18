import React from "react";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function StacksQueuesVisualizer() {
  return (
    <div className="relative min-h-screen p-4 md:p-8 flex flex-col gap-8 max-w-6xl mx-auto overflow-hidden">
      <div className="scanline"></div>

      <motion.div 
        className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />

      <motion.header 
        className="relative z-10 border-b-2 border-purple-400/30 pb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 mb-6 transition-colors">
            <ChevronLeft size={20} />
            Back to Dashboard
          </a>
        </Link>
        <h1 className="text-5xl md:text-7xl font-black text-white glow-text tracking-tighter mb-2">
          STACKS & QUEUES
        </h1>
        <p className="text-purple-200 font-mono text-sm md:text-base">
          → Visualize LIFO and FIFO data structures in action
        </p>
      </motion.header>

      <motion.div 
        className="relative z-10 bg-gradient-to-br from-purple-950/80 to-violet-900/50 border-2 border-purple-400/30 rounded-xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Visualization Coming Soon</h2>
        <p className="text-purple-200 font-mono">Interactive stack and queue visualizers will appear here with step-by-step animations.</p>
      </motion.div>
    </div>
  );
}
