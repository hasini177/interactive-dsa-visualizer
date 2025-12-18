import React from "react";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function LinkedListVisualizer() {
  return (
    <div className="relative min-h-screen p-4 md:p-8 flex flex-col gap-8 max-w-6xl mx-auto overflow-hidden">
      <div className="scanline"></div>

      <motion.div 
        className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />

      <motion.header 
        className="relative z-10 border-b-2 border-pink-400/30 pb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-pink-300 hover:text-pink-200 mb-6 transition-colors">
            <ChevronLeft size={20} />
            Back to Dashboard
          </a>
        </Link>
        <h1 className="text-5xl md:text-7xl font-black text-white glow-text tracking-tighter mb-2">
          LINKED LISTS
        </h1>
        <p className="text-pink-200 font-mono text-sm md:text-base">
          → Master node-based sequential data structures
        </p>
      </motion.header>

      <motion.div 
        className="relative z-10 bg-gradient-to-br from-pink-950/80 to-rose-900/50 border-2 border-pink-400/30 rounded-xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Visualization Coming Soon</h2>
        <p className="text-pink-200 font-mono">Interactive linked list visualizers with insertions, deletions, and traversals will appear here.</p>
      </motion.div>
    </div>
  );
}
