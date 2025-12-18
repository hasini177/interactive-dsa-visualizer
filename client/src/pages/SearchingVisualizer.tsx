import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { ConsoleWindow } from "@/components/ConsoleWindow";
import { ArrayDisplay } from "@/components/ArrayDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  simulateLinearSearch, 
  simulateBinarySearch, 
  C_PLUS_PLUS_CODE, 
  LogStep 
} from "@/lib/algorithms";
import { Play, RotateCcw, SkipForward, Code, Terminal, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchAlgorithm = "linear" | "binary";

export default function SearchingVisualizer() {
  const [algorithm, setAlgorithm] = useState<SearchAlgorithm | null>(null);
  const [arrayInput, setArrayInput] = useState("12, 25, 34, 64, 22, 11, 90");
  const [searchTarget, setSearchTarget] = useState("22");
  
  const [currentArr, setCurrentArr] = useState<number[]>([]);
  const [logs, setLogs] = useState<LogStep[]>([]);
  const [allSteps, setAllSteps] = useState<LogStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [viewMode, setViewMode] = useState<'console' | 'code'>('console');

  const algorithmNames: Record<SearchAlgorithm, string> = {
    linear: "LINEAR SEARCH",
    binary: "BINARY SEARCH"
  };

  const algorithmDescriptions: Record<SearchAlgorithm, string> = {
    linear: "Scan array sequentially until target is found - O(n)",
    binary: "Eliminate half of remaining elements with each comparison - O(log n)"
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
    const target = parseInt(searchTarget);
    let steps: LogStep[] = [];
    
    if (!algorithm) return steps;
    
    if (algorithm === 'linear') {
      steps = simulateLinearSearch(arr, target);
    } else if (algorithm === 'binary') {
      steps = simulateBinarySearch(arr, target);
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
  const currentType = logs[logs.length - 1]?.type === 'found' ? 'found' : 'compare';

  // Show algorithm selector if none selected
  if (!algorithm) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex flex-col gap-8 max-w-6xl mx-auto">
        <div className="scanline"></div>

        <header className="border-b-2 border-primary pb-6">
          <Link href="/">
            <a className="flex items-center gap-2 text-primary hover:text-white transition-colors mb-4">
              <ArrowLeft size={20} /> BACK
            </a>
          </Link>
          <h1 className="text-5xl md:text-6xl font-black text-primary glow-text tracking-tighter">
            SELECT_SEARCH_TYPE
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          {(['linear', 'binary'] as SearchAlgorithm[]).map((algo) => (
            <button
              key={algo}
              onClick={() => setAlgorithm(algo)}
              className="group bg-black border-2 border-primary/30 hover:border-primary p-8 transition-all hover:shadow-[0_0_30px_rgba(0,255,65,0.2)] text-left"
            >
              <h2 className="text-2xl font-black text-primary group-hover:text-white mb-3 transition-colors">
                {algorithmNames[algo]}
              </h2>
              <p className="text-primary/70 text-sm font-mono">
                {algorithmDescriptions[algo]}
              </p>
              <div className="mt-6 text-primary text-sm font-bold group-hover:translate-x-2 transition-transform">
                → START
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="scanline"></div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-primary pb-4 gap-4">
        <Link href="/">
          <a className="flex items-center gap-2 text-primary hover:text-white transition-colors">
            <ArrowLeft size={20} /> BACK
          </a>
        </Link>
        <div className="text-center grow">
          <h1 className="text-4xl md:text-5xl font-black text-primary glow-text mb-2">
            {algorithmNames[algorithm]}
          </h1>
          <p className="text-primary/60 font-mono text-xs md:text-sm">
            {algorithmDescriptions[algorithm]}
          </p>
        </div>
        <Button 
          variant="outline" 
          className="border-primary text-primary hover:bg-primary hover:text-black rounded-none transition-all text-sm"
          onClick={() => setAlgorithm(null)}
        >
          CHANGE
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 grow">
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-card border border-primary/30 p-4 relative">
            <div className="absolute -top-3 left-3 bg-background px-2 text-primary text-xs font-bold">PARAMETERS</div>
            <div className="space-y-4 mt-2">
              <div>
                <label className="text-primary/70 text-xs font-mono uppercase mb-1 block">Array (CSV)</label>
                <Input 
                  value={arrayInput} 
                  onChange={(e) => { setArrayInput(e.target.value); reset(); }}
                  className="bg-black border-primary/50 text-primary font-mono rounded-none focus-visible:ring-primary h-10" 
                />
              </div>
              <div>
                <label className="text-primary/70 text-xs font-mono uppercase mb-1 block">Target Value</label>
                <Input 
                  value={searchTarget} 
                  onChange={(e) => { setSearchTarget(e.target.value); reset(); }}
                  className="bg-black border-primary/50 text-primary font-mono rounded-none focus-visible:ring-primary h-10 w-24" 
                />
              </div>
            </div>
          </div>

          <div className="bg-card border border-primary/30 p-4 relative grow flex flex-col gap-4">
            <div className="absolute -top-3 left-3 bg-background px-2 text-primary text-xs font-bold">CONTROLS</div>
            <Button 
              className="w-full bg-primary text-black hover:bg-primary/90 font-bold rounded-none h-12 text-lg"
              onClick={handleStart}
              disabled={isRunning && currentStepIndex < allSteps.length}
            >
              <Play className="mr-2 h-5 w-5" /> {isRunning ? 'SEARCHING...' : 'EXECUTE'}
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/20 rounded-none"
                onClick={handleStep}
                disabled={isRunning}
              >
                <SkipForward className="mr-2 h-4 w-4" /> STEP
              </Button>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/20 rounded-none"
                onClick={reset}
              >
                <RotateCcw className="mr-2 h-4 w-4" /> RESET
              </Button>
            </div>
            <div className="mt-auto border-t border-dashed border-primary/30 pt-4 text-xs text-primary/60 font-mono">
              <div className="flex justify-between">
                <span>STATUS:</span>
                <span className={isRunning ? "text-green-400 animate-pulse" : "text-yellow-600"}>
                  {isRunning ? "SEARCHING" : "IDLE"}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span>STEPS:</span>
                <span>{currentStepIndex} / {allSteps.length > 0 ? allSteps.length : '-'}</span>
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
                    {algorithm === 'linear' && C_PLUS_PLUS_CODE.linearSearch}
                    {algorithm === 'binary' && C_PLUS_PLUS_CODE.binarySearch}
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
