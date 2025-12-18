import React from "react";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { QuickSearchVisualizer } from "@/components/QuickSearchVisualizer";
import { QuickSortVisualizer } from "@/components/QuickSortVisualizer";

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
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                <h2 className="text-3xl md:text-4xl font-black text-white glow-text-white mb-4 group-hover:scale-105 transition-transform">
                  SEARCHING
                </h2>
                
                <div className="mb-6 p-4 bg-blue-900/30 rounded-lg border border-blue-400/20">
                  <QuickSearchVisualizer />
                </div>
                
                <p className="text-blue-100/80 text-sm md:text-base font-mono mb-6 flex-grow">
                  ✦ Explore fundamental search algorithms to locate elements efficiently
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Link href="/searching?algo=linear">
                    <a>
                      <motion.span 
                        className="bg-gradient-to-r from-blue-600/40 to-cyan-600/40 border border-blue-400/50 px-3 py-1 text-xs text-blue-200 rounded-full font-mono cursor-pointer hover:border-blue-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        LINEAR_SEARCH
                      </motion.span>
                    </a>
                  </Link>
                  <Link href="/searching?algo=binary">
                    <a>
                      <motion.span 
                        className="bg-gradient-to-r from-blue-600/40 to-cyan-600/40 border border-blue-400/50 px-3 py-1 text-xs text-blue-200 rounded-full font-mono cursor-pointer hover:border-blue-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        BINARY_SEARCH
                      </motion.span>
                    </a>
                  </Link>
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
                <h2 className="text-3xl md:text-4xl font-black text-white glow-text-white mb-4 group-hover:scale-105 transition-transform">
                  SORTING
                </h2>
                
                <div className="mb-6 p-4 bg-cyan-900/30 rounded-lg border border-cyan-400/20">
                  <QuickSortVisualizer />
                </div>
                
                <p className="text-cyan-100/80 text-sm md:text-base font-mono mb-6 flex-grow">
                  ✦ Learn how different algorithms organize data efficiently
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Link href="/sorting?algo=bubble">
                    <a>
                      <motion.span 
                        className="bg-gradient-to-r from-cyan-600/40 to-blue-600/40 border border-cyan-400/50 px-3 py-1 text-xs text-cyan-200 rounded-full font-mono cursor-pointer hover:border-cyan-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        BUBBLE_SORT
                      </motion.span>
                    </a>
                  </Link>
                  <Link href="/sorting?algo=selection">
                    <a>
                      <motion.span 
                        className="bg-gradient-to-r from-cyan-600/40 to-blue-600/40 border border-cyan-400/50 px-3 py-1 text-xs text-cyan-200 rounded-full font-mono cursor-pointer hover:border-cyan-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        SELECTION_SORT
                      </motion.span>
                    </a>
                  </Link>
                  <Link href="/sorting?algo=insertion">
                    <a>
                      <motion.span 
                        className="bg-gradient-to-r from-cyan-600/40 to-blue-600/40 border border-cyan-400/50 px-3 py-1 text-xs text-cyan-200 rounded-full font-mono cursor-pointer hover:border-cyan-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        INSERTION_SORT
                      </motion.span>
                    </a>
                  </Link>
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

        {/* Stacks & Queues Section */}
        <motion.div variants={itemVariants} className="group">
          <Link href="/stacks-queues">
            <a className="block relative overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-violet-500 to-purple-600 rounded-xl p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
                <div className="absolute inset-0 bg-blue-950/90 rounded-xl"></div>
              </div>
              
              <div className="relative z-10 bg-gradient-to-br from-purple-950/80 to-violet-900/50 border-2 border-purple-400/30 group-hover:border-purple-300/50 rounded-xl p-8 transition-all duration-300 h-full flex flex-col group-hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                <h2 className="text-3xl md:text-4xl font-black text-white glow-text-white mb-4 group-hover:scale-105 transition-transform">
                  STACKS & QUEUES
                </h2>
                
                <p className="text-purple-100/80 text-sm md:text-base font-mono mb-6 flex-grow">
                  ✦ Learn LIFO and FIFO data structures with animations
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <motion.span 
                    className="bg-gradient-to-r from-purple-600/40 to-violet-600/40 border border-purple-400/50 px-3 py-1 text-xs text-purple-200 rounded-full font-mono"
                    whileHover={{ scale: 1.1 }}
                  >
                    STACK
                  </motion.span>
                  <motion.span 
                    className="bg-gradient-to-r from-purple-600/40 to-violet-600/40 border border-purple-400/50 px-3 py-1 text-xs text-purple-200 rounded-full font-mono"
                    whileHover={{ scale: 1.1 }}
                  >
                    QUEUE
                  </motion.span>
                </div>
                <motion.div 
                  className="flex items-center gap-2 text-purple-300 text-sm font-bold group-hover:text-violet-300 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  EXPLORE <ChevronRight size={18} />
                </motion.div>
              </div>
            </a>
          </Link>
        </motion.div>

        {/* Linked Lists Section */}
        <motion.div variants={itemVariants} className="group">
          <Link href="/linked-lists">
            <a className="block relative overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 rounded-xl p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
                <div className="absolute inset-0 bg-blue-950/90 rounded-xl"></div>
              </div>
              
              <div className="relative z-10 bg-gradient-to-br from-pink-950/80 to-rose-900/50 border-2 border-pink-400/30 group-hover:border-pink-300/50 rounded-xl p-8 transition-all duration-300 h-full flex flex-col group-hover:shadow-[0_0_40px_rgba(236,72,153,0.4)]">
                <h2 className="text-3xl md:text-4xl font-black text-white glow-text-white mb-4 group-hover:scale-105 transition-transform">
                  LINKED LISTS
                </h2>
                
                <p className="text-pink-100/80 text-sm md:text-base font-mono mb-6 flex-grow">
                  ✦ Master node-based sequential data structures
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <motion.span 
                    className="bg-gradient-to-r from-pink-600/40 to-rose-600/40 border border-pink-400/50 px-3 py-1 text-xs text-pink-200 rounded-full font-mono"
                    whileHover={{ scale: 1.1 }}
                  >
                    SINGLY
                  </motion.span>
                  <motion.span 
                    className="bg-gradient-to-r from-pink-600/40 to-rose-600/40 border border-pink-400/50 px-3 py-1 text-xs text-pink-200 rounded-full font-mono"
                    whileHover={{ scale: 1.1 }}
                  >
                    DOUBLY
                  </motion.span>
                </div>
                <motion.div 
                  className="flex items-center gap-2 text-pink-300 text-sm font-bold group-hover:text-rose-300 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  EXPLORE <ChevronRight size={18} />
                </motion.div>
              </div>
            </a>
          </Link>
        </motion.div>

        {/* Sliding Window Section */}
        <motion.div variants={itemVariants} className="group">
          <Link href="/sliding-window">
            <a className="block relative overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-xl p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
                <div className="absolute inset-0 bg-blue-950/90 rounded-xl"></div>
              </div>
              
              <div className="relative z-10 bg-gradient-to-br from-amber-950/80 to-orange-900/50 border-2 border-amber-400/30 group-hover:border-amber-300/50 rounded-xl p-8 transition-all duration-300 h-full flex flex-col group-hover:shadow-[0_0_40px_rgba(217,119,6,0.4)]">
                <h2 className="text-3xl md:text-4xl font-black text-white glow-text-white mb-4 group-hover:scale-105 transition-transform">
                  SLIDING WINDOW
                </h2>
                
                <p className="text-amber-100/80 text-sm md:text-base font-mono mb-6 flex-grow">
                  ✦ Solve optimization problems with dynamic windows
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <motion.span 
                    className="bg-gradient-to-r from-amber-600/40 to-orange-600/40 border border-amber-400/50 px-3 py-1 text-xs text-amber-200 rounded-full font-mono"
                    whileHover={{ scale: 1.1 }}
                  >
                    FIXED
                  </motion.span>
                  <motion.span 
                    className="bg-gradient-to-r from-amber-600/40 to-orange-600/40 border border-amber-400/50 px-3 py-1 text-xs text-amber-200 rounded-full font-mono"
                    whileHover={{ scale: 1.1 }}
                  >
                    DYNAMIC
                  </motion.span>
                </div>
                <motion.div 
                  className="flex items-center gap-2 text-amber-300 text-sm font-bold group-hover:text-orange-300 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  EXPLORE <ChevronRight size={18} />
                </motion.div>
              </div>
            </a>
          </Link>
        </motion.div>

        {/* Two Pointers Section */}
        <motion.div variants={itemVariants} className="group">
          <Link href="/two-pointers">
            <a className="block relative overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 rounded-xl p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
                <div className="absolute inset-0 bg-blue-950/90 rounded-xl"></div>
              </div>
              
              <div className="relative z-10 bg-gradient-to-br from-indigo-950/80 to-purple-900/50 border-2 border-indigo-400/30 group-hover:border-indigo-300/50 rounded-xl p-8 transition-all duration-300 h-full flex flex-col group-hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]">
                <h2 className="text-3xl md:text-4xl font-black text-white glow-text-white mb-4 group-hover:scale-105 transition-transform">
                  TWO POINTERS
                </h2>
                
                <p className="text-indigo-100/80 text-sm md:text-base font-mono mb-6 flex-grow">
                  ✦ Solve problems with convergent pointer techniques
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <motion.span 
                    className="bg-gradient-to-r from-indigo-600/40 to-purple-600/40 border border-indigo-400/50 px-3 py-1 text-xs text-indigo-200 rounded-full font-mono"
                    whileHover={{ scale: 1.1 }}
                  >
                    CONVERGE
                  </motion.span>
                  <motion.span 
                    className="bg-gradient-to-r from-indigo-600/40 to-purple-600/40 border border-indigo-400/50 px-3 py-1 text-xs text-indigo-200 rounded-full font-mono"
                    whileHover={{ scale: 1.1 }}
                  >
                    FAST_SLOW
                  </motion.span>
                </div>
                <motion.div 
                  className="flex items-center gap-2 text-indigo-300 text-sm font-bold group-hover:text-purple-300 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  EXPLORE <ChevronRight size={18} />
                </motion.div>
              </div>
            </a>
          </Link>
        </motion.div>

        {/* Trees Section */}
        <motion.div variants={itemVariants} className="group">
          <Link href="/trees">
            <a className="block relative overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 rounded-xl p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
                <div className="absolute inset-0 bg-blue-950/90 rounded-xl"></div>
              </div>
              
              <div className="relative z-10 bg-gradient-to-br from-emerald-950/80 to-green-900/50 border-2 border-emerald-400/30 group-hover:border-emerald-300/50 rounded-xl p-8 transition-all duration-300 h-full flex flex-col group-hover:shadow-[0_0_40px_rgba(5,150,105,0.4)]">
                <h2 className="text-3xl md:text-4xl font-black text-white glow-text-white mb-4 group-hover:scale-105 transition-transform">
                  TREES
                </h2>
                
                <p className="text-emerald-100/80 text-sm md:text-base font-mono mb-6 flex-grow">
                  ✦ Explore hierarchical data structures and traversals
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <motion.span 
                    className="bg-gradient-to-r from-emerald-600/40 to-green-600/40 border border-emerald-400/50 px-3 py-1 text-xs text-emerald-200 rounded-full font-mono"
                    whileHover={{ scale: 1.1 }}
                  >
                    BST
                  </motion.span>
                  <motion.span 
                    className="bg-gradient-to-r from-emerald-600/40 to-green-600/40 border border-emerald-400/50 px-3 py-1 text-xs text-emerald-200 rounded-full font-mono"
                    whileHover={{ scale: 1.1 }}
                  >
                    TRAVERSAL
                  </motion.span>
                </div>
                <motion.div 
                  className="flex items-center gap-2 text-emerald-300 text-sm font-bold group-hover:text-green-300 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  EXPLORE <ChevronRight size={18} />
                </motion.div>
              </div>
            </a>
          </Link>
        </motion.div>

        {/* Graphs Section */}
        <motion.div variants={itemVariants} className="group">
          <Link href="/graphs">
            <a className="block relative overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 rounded-xl p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
                <div className="absolute inset-0 bg-blue-950/90 rounded-xl"></div>
              </div>
              
              <div className="relative z-10 bg-gradient-to-br from-teal-950/80 to-cyan-900/50 border-2 border-teal-400/30 group-hover:border-teal-300/50 rounded-xl p-8 transition-all duration-300 h-full flex flex-col group-hover:shadow-[0_0_40px_rgba(13,148,136,0.4)]">
                <h2 className="text-3xl md:text-4xl font-black text-white glow-text-white mb-4 group-hover:scale-105 transition-transform">
                  GRAPHS
                </h2>
                
                <p className="text-teal-100/80 text-sm md:text-base font-mono mb-6 flex-grow">
                  ✦ Understand complex network structures and algorithms
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <motion.span 
                    className="bg-gradient-to-r from-teal-600/40 to-cyan-600/40 border border-teal-400/50 px-3 py-1 text-xs text-teal-200 rounded-full font-mono"
                    whileHover={{ scale: 1.1 }}
                  >
                    BFS
                  </motion.span>
                  <motion.span 
                    className="bg-gradient-to-r from-teal-600/40 to-cyan-600/40 border border-teal-400/50 px-3 py-1 text-xs text-teal-200 rounded-full font-mono"
                    whileHover={{ scale: 1.1 }}
                  >
                    DFS
                  </motion.span>
                </div>
                <motion.div 
                  className="flex items-center gap-2 text-teal-300 text-sm font-bold group-hover:text-cyan-300 transition-colors"
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
