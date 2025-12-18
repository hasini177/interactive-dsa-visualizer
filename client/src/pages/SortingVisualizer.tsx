import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ConsoleWindow } from "@/components/ConsoleWindow";
import { ArrayDisplay } from "@/components/ArrayDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  simulateBubbleSort, 
  simulateSelectionSort, 
  simulateInsertionSort,
  C_PLUS_PLUS_CODE, 
  LogStep 
} from "@/lib/algorithms";
import { Play, RotateCcw, SkipForward, Code, Terminal, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type SortAlgorithm = "bubble" | "selection" | "insertion";

export default function SortingVisualizer() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const algoParam = searchParams.get('algo') as SortAlgorithm | null;
  
  const [algorithm, setAlgorithm] = useState<SortAlgorithm | null>(() => {
    // Always return algo from URL if provided, otherwise null (show selection)
    return algoParam || null;
  });
  const [arrayInput, setArrayInput] = useState("64, 34, 25, 12, 22, 11, 90");
  
  const [currentArr, setCurrentArr] = useState<number[]>([]);
  const [logs, setLogs] = useState<LogStep[]>([]);
  const [allSteps, setAllSteps] = useState<LogStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [viewMode, setViewMode] = useState<'console' | 'code'>('console');

  const algorithmNames: Record<SortAlgorithm, string> = {
    bubble: "BUBBLE SORT",
    selection: "SELECTION SORT",
    insertion: "INSERTION SORT"
  };

  const algorithmDescriptions: Record<SortAlgorithm, string> = {
    bubble: "Compare adjacent elements and swap if in wrong order - O(n²)",
    selection: "Find minimum element and place it at correct position - O(n²)",
    insertion: "Build sorted array by inserting elements one by one - O(n²)"
  };

  useEffect(() => {
    if (algorithm) {
      reset();
    }
  }, [algorithm]);

  const parseArray = () => {
    return arrayInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
  };

  const reset = () => {
    const arr = parseArray();
    setCurrentArr(arr);
    setLogs([]);
    setAllSteps([]);
    setCurrentStepIndex(0);
    setIsRunning(false);
  };

  const generateSteps = () => {
    const arr = parseArray();
    let steps: LogStep[] = [];
    
    if (!algorithm) return steps;
    
    if (algorithm === 'bubble') {
      steps = simulateBubbleSort(arr);
    } else if (algorithm === 'selection') {
      steps = simulateSelectionSort(arr);
    } else if (algorithm === 'insertion') {
      steps = simulateInsertionSort(arr);
    }
    
    setAllSteps(steps);
    return steps;
  };

  const handleStart = () => {
    if (allSteps.length === 0) {
      generateSteps();
    }
    setIsRunning(true);
  };

  const handleStep = () => {
    let steps = allSteps;
    if (steps.length === 0) {
      steps = generateSteps();
    }

    if (currentStepIndex < steps.length) {
      const step = steps[currentStepIndex];
      setLogs(prev => [...prev, step]);
      if (step.arrayState) {
        setCurrentArr(step.arrayState);
      }
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && currentStepIndex < allSteps.length) {
      interval = setInterval(() => {
        handleStep();
      }, 800);
    } else if (currentStepIndex >= allSteps.length) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentStepIndex, allSteps]);

  const currentHighlight = logs[logs.length - 1]?.highlightIndices;
  const currentType = logs[logs.length - 1]?.type === 'swap' ? 'swap' : 'compare';

  // Show algorithm selector if none selected
  if (!algorithm) {
    return (
      <div className="relative min-h-screen p-4 md:p-8 flex flex-col gap-8 max-w-6xl mx-auto overflow-hidden">
        <div className="scanline"></div>

        <header className="relative z-10 border-b-2 border-cyan-400/30 pb-6">
          <Link href="/">
            <a className="flex items-center gap-2 text-cyan-300 hover:text-white transition-colors mb-4 font-bold">
              <ArrowLeft size={20} /> BACK
            </a>
          </Link>
          <h1 className="text-5xl md:text-6xl font-black text-white glow-text tracking-tighter">
            SELECT_SORT_TYPE
          </h1>
        </header>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['bubble', 'selection', 'insertion'] as SortAlgorithm[]).map((algo) => (
            <motion.button
              key={algo}
              onClick={() => setAlgorithm(algo)}
              className="group relative bg-gradient-to-br from-cyan-950/80 to-blue-900/50 border-2 border-cyan-400/30 hover:border-cyan-300/50 p-8 transition-all rounded-lg text-left overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 211, 238, 0.5)' }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <h2 className="relative text-2xl font-black text-white mb-3 group-hover:text-cyan-200 transition-colors">
                {algorithmNames[algo]}
              </h2>
              <p className="relative text-cyan-100/80 text-sm font-mono">
                {algorithmDescriptions[algo]}
              </p>
              <div className="relative mt-6 text-cyan-300 text-sm font-bold group-hover:translate-x-2 transition-transform">
                → START
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen p-4 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto overflow-hidden">
      <div className="scanline"></div>

      <header className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-cyan-400/30 pb-6 gap-4">
        <Link href="/">
          <a className="flex items-center gap-2 text-cyan-300 hover:text-white transition-colors font-bold">
            <ArrowLeft size={20} /> BACK
          </a>
        </Link>
        <div className="text-center grow">
          <h1 className="text-4xl md:text-5xl font-black text-white glow-text mb-2">
            {algorithmNames[algorithm]}
          </h1>
          <p className="text-cyan-200/80 font-mono text-xs md:text-sm">
            {algorithmDescriptions[algorithm]}
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button 
            variant="outline" 
            className="border-cyan-400 text-cyan-300 hover:bg-cyan-600 hover:text-white rounded-lg transition-all text-sm font-bold"
            onClick={() => setAlgorithm(null)}
          >
            CHANGE
          </Button>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 grow">
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-gradient-to-br from-cyan-950/80 to-blue-900/50 border-2 border-cyan-400/30 rounded-lg p-5 relative">
            <div className="absolute -top-3 left-4 bg-background px-3 py-1 text-cyan-300 text-xs font-bold rounded-full border border-cyan-400/50">◆ PARAMETERS</div>
            <div className="space-y-5 mt-4">
              <div>
                <label className="text-cyan-300 text-xs font-mono uppercase mb-2 block font-bold tracking-wide">Array (CSV)</label>
                <Input 
                  value={arrayInput} 
                  onChange={(e) => { setArrayInput(e.target.value); reset(); }}
                  className="bg-blue-900/40 border-cyan-400/40 text-cyan-200 font-mono rounded-lg focus-visible:ring-cyan-400 h-10 focus-visible:border-cyan-300" 
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-950/80 to-blue-900/50 border-2 border-cyan-400/30 rounded-lg p-5 relative grow flex flex-col gap-4">
            <div className="absolute -top-3 left-4 bg-background px-3 py-1 text-cyan-300 text-xs font-bold rounded-full border border-cyan-400/50">◆ CONTROLS</div>
            <Button 
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-black hover:from-cyan-400 hover:to-cyan-500 font-bold rounded-lg h-12 text-base transition-all"
              onClick={handleStart}
              disabled={isRunning && currentStepIndex < allSteps.length}
            >
              <Play className="mr-2 h-5 w-5" /> {isRunning ? 'SORTING...' : 'EXECUTE'}
            </Button>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <Button 
                variant="outline" 
                className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-600/20 rounded-lg hover:border-cyan-300"
                onClick={handleStep}
                disabled={isRunning}
              >
                <SkipForward className="mr-2 h-4 w-4" /> STEP
              </Button>
              <Button 
                variant="outline" 
                className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-600/20 rounded-lg hover:border-cyan-300"
                onClick={reset}
              >
                <RotateCcw className="mr-2 h-4 w-4" /> RESET
              </Button>
            </div>
            <div className="mt-auto border-t border-dashed border-cyan-400/30 pt-4 text-xs text-cyan-300/70 font-mono">
              <div className="flex justify-between mb-2">
                <span className="font-bold">STATUS:</span>
                <span className={isRunning ? "text-green-400 animate-pulse font-bold" : "text-yellow-400 font-bold"}>
                  {isRunning ? "SORTING" : "IDLE"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">STEPS:</span>
                <span className="text-cyan-200">{currentStepIndex} / {allSteps.length > 0 ? allSteps.length : '-'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-9 flex flex-col gap-4 h-[600px] lg:h-auto">
          <ArrayDisplay 
            arr={currentArr} 
            highlightIndices={currentHighlight} 
            type={currentType}
          />

          <div className="grow flex flex-col min-h-0 bg-black border-2 border-primary/30 relative">
            <div className="flex border-b border-primary/30">
              <button 
                onClick={() => setViewMode('console')}
                className={cn(
                  "px-6 py-2 font-mono text-sm font-bold flex items-center gap-2 transition-colors",
                  viewMode === 'console' ? "bg-primary text-black" : "text-primary hover:bg-primary/10"
                )}
              >
                <Terminal size={16} /> OUTPUT
              </button>
              <button 
                onClick={() => setViewMode('code')}
                className={cn(
                  "px-6 py-2 font-mono text-sm font-bold flex items-center gap-2 transition-colors",
                  viewMode === 'code' ? "bg-primary text-black" : "text-primary hover:bg-primary/10"
                )}
              >
                <Code size={16} /> CODE
              </button>
            </div>

            <div className="grow overflow-hidden relative">
              {viewMode === 'console' ? (
                <ConsoleWindow logs={logs} isProcessing={isRunning} />
              ) : (
                <div className="p-4 h-full overflow-auto font-mono text-sm text-primary/80">
                  <pre className="whitespace-pre-wrap">
                    {algorithm === 'bubble' && C_PLUS_PLUS_CODE.bubbleSort}
                    {algorithm === 'selection' && C_PLUS_PLUS_CODE.selectionSort}
                    {algorithm === 'insertion' && C_PLUS_PLUS_CODE.insertionSort}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
