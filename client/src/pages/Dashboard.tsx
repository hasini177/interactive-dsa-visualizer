import React from "react";
import { Link } from "wouter";
import { Search, Heading3, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Dashboard() {
  return (
    <div className="relative min-h-screen p-4 md:p-8 flex flex-col gap-8 max-w-6xl mx-auto overflow-hidden">
      <div className="scanline"></div>

      {/* Animated background elements */}
      <motion.div 
        className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />

      <motion.header 
        className="relative z-10 border-b-2 border-blue-400/30 pb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl md:text-7xl font-black text-white glow-text tracking-tighter mb-2">
            DSA_VISUALIZER
          </h1>
          <p className="text-blue-200 font-mono text-sm md:text-base">
            → Master Data Structures & Algorithms through interactive visualization
          </p>
        </motion.div>
      </motion.header>

      <motion.div 
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Searching Section */}
        <motion.div variants={itemVariants} className="group">
          <Link href="/searching">
            <a className="block relative overflow-hidden h-full">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-xl p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
                <div className="absolute inset-0 bg-blue-950/90 rounded-xl"></div>
              </div>
              
              <div className="relative z-10 bg-gradient-to-br from-blue-950/80 to-blue-900/50 border-2 border-blue-400/30 group-hover:border-blue-300/50 rounded-xl p-8 transition-all duration-300 h-full flex flex-col group-hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Search className="w-14 h-14 text-blue-300 group-hover:text-white transition-colors float-icon" />
                  </motion.div>
                  <h2 className="text-3xl md:text-4xl font-black text-white glow-text-white group-hover:scale-105 transition-transform">
                    SEARCHING
                  </h2>
                </div>
                <p className="text-blue-100/80 text-sm md:text-base font-mono mb-6 flex-grow">
                  ✦ Explore fundamental search algorithms to locate elements efficiently
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <motion.span 
                    className="bg-gradient-to-r from-blue-600/40 to-cyan-600/40 border border-blue-400/50 px-3 py-1 text-xs text-blue-200 rounded-full font-mono"
                    whileHover={{ scale: 1.1 }}
                  >
                    LINEAR_SEARCH
                  </motion.span>
                  <motion.span 
                    className="bg-gradient-to-r from-blue-600/40 to-cyan-600/40 border border-blue-400/50 px-3 py-1 text-xs text-blue-200 rounded-full font-mono"
                    whileHover={{ scale: 1.1 }}
                  >
                    BINARY_SEARCH
                  </motion.span>
                </div>
                <motion.div 
                  className="flex items-center gap-2 text-blue-300 text-sm font-bold group-hover:text-cyan-300 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  EXPLORE <ChevronRight size={18} />
                </motion.div>
              </div>
            </a>
          </Link>
        </motion.div>

        {/* Sorting Section */}
        <motion.div variants={itemVariants} className="group">
          <Link href="/sorting">
            <a className="block relative overflow-hidden h-full">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-600 rounded-xl p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
                <div className="absolute inset-0 bg-blue-950/90 rounded-xl"></div>
              </div>
              
              <div className="relative z-10 bg-gradient-to-br from-blue-950/80 to-cyan-900/50 border-2 border-cyan-400/30 group-hover:border-cyan-300/50 rounded-xl p-8 transition-all duration-300 h-full flex flex-col group-hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    whileHover={{ rotate: -360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Heading3 className="w-14 h-14 text-cyan-300 group-hover:text-white transition-colors float-icon" />
                  </motion.div>
                  <h2 className="text-3xl md:text-4xl font-black text-white glow-text-white group-hover:scale-105 transition-transform">
                    SORTING
                  </h2>
                </div>
                <p className="text-cyan-100/80 text-sm md:text-base font-mono mb-6 flex-grow">
                  ✦ Learn how different algorithms organize data efficiently
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <motion.span 
                    className="bg-gradient-to-r from-cyan-600/40 to-blue-600/40 border border-cyan-400/50 px-3 py-1 text-xs text-cyan-200 rounded-full font-mono"
                    whileHover={{ scale: 1.1 }}
                  >
                    BUBBLE_SORT
                  </motion.span>
                  <motion.span 
                    className="bg-gradient-to-r from-cyan-600/40 to-blue-600/40 border border-cyan-400/50 px-3 py-1 text-xs text-cyan-200 rounded-full font-mono"
                    whileHover={{ scale: 1.1 }}
                  >
                    SELECTION_SORT
                  </motion.span>
                  <motion.span 
                    className="bg-gradient-to-r from-cyan-600/40 to-blue-600/40 border border-cyan-400/50 px-3 py-1 text-xs text-cyan-200 rounded-full font-mono"
                    whileHover={{ scale: 1.1 }}
                  >
                    INSERTION_SORT
                  </motion.span>
                </div>
                <motion.div 
                  className="flex items-center gap-2 text-cyan-300 text-sm font-bold group-hover:text-blue-300 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  EXPLORE <ChevronRight size={18} />
                </motion.div>
              </div>
            </a>
          </Link>
        </motion.div>
      </motion.div>

      <motion.footer 
        className="relative z-10 border-t border-blue-400/20 pt-8 mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-blue-300/60 font-mono text-xs text-center">
          ◆ System Ready | Choose a category to begin learning ◆
        </p>
      </motion.footer>
    </div>
  );
}
