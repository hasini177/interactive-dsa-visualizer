import React from "react";
import { Link } from "wouter";
import { Search, Heading3, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="scanline"></div>

      <header className="border-b-2 border-primary pb-6">
        <h1 className="text-5xl md:text-6xl font-black text-primary glow-text tracking-tighter">
          DSA_VISUALIZER<span className="animate-pulse">_</span>
        </h1>
        <p className="text-primary/60 font-mono mt-2 text-sm">
          // Master Data Structures & Algorithms through visualization
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Searching Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="group"
        >
          <Link href="/searching">
            <a className="block bg-black border-2 border-primary/30 hover:border-primary p-8 transition-all hover:shadow-[0_0_30px_rgba(0,255,65,0.2)]">
              <div className="flex items-center gap-4 mb-4">
                <Search className="w-12 h-12 text-primary group-hover:text-white transition-colors" />
                <h2 className="text-3xl font-bold text-primary group-hover:text-white transition-colors">
                  SEARCHING
                </h2>
              </div>
              <p className="text-primary/70 text-sm font-mono mb-6">
                Explore fundamental search algorithms to locate elements efficiently.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary/10 border border-primary/30 px-3 py-1 text-xs text-primary rounded-none">LINEAR_SEARCH</span>
                <span className="bg-primary/10 border border-primary/30 px-3 py-1 text-xs text-primary rounded-none">BINARY_SEARCH</span>
              </div>
              <div className="flex items-center gap-2 text-primary text-sm font-bold group-hover:translate-x-2 transition-transform">
                EXPLORE <ChevronRight size={18} />
              </div>
            </a>
          </Link>
        </motion.div>

        {/* Sorting Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="group"
        >
          <Link href="/sorting">
            <a className="block bg-black border-2 border-primary/30 hover:border-primary p-8 transition-all hover:shadow-[0_0_30px_rgba(0,255,65,0.2)]">
              <div className="flex items-center gap-4 mb-4">
                <Heading3 className="w-12 h-12 text-primary group-hover:text-white transition-colors" />
                <h2 className="text-3xl font-bold text-primary group-hover:text-white transition-colors">
                  SORTING
                </h2>
              </div>
              <p className="text-primary/70 text-sm font-mono mb-6">
                Learn how different algorithms organize data efficiently.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary/10 border border-primary/30 px-3 py-1 text-xs text-primary rounded-none">BUBBLE_SORT</span>
                <span className="bg-primary/10 border border-primary/30 px-3 py-1 text-xs text-primary rounded-none">SELECTION_SORT</span>
                <span className="bg-primary/10 border border-primary/30 px-3 py-1 text-xs text-primary rounded-none">INSERTION_SORT</span>
              </div>
              <div className="flex items-center gap-2 text-primary text-sm font-bold group-hover:translate-x-2 transition-transform">
                EXPLORE <ChevronRight size={18} />
              </div>
            </a>
          </Link>
        </motion.div>
      </div>

      <footer className="border-t border-primary/20 pt-8 mt-8">
        <p className="text-primary/50 font-mono text-xs">
          System Ready. Choose a category to begin learning.
        </p>
      </footer>
    </div>
  );
}
