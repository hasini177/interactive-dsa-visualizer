import React, { useState, useEffect } from "react";
import { ConsoleWindow } from "@/components/ConsoleWindow";
import { ArrayDisplay } from "@/components/ArrayDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  simulateBubbleSort, 
  simulateSelectionSort, 
  simulateLinearSearch, 
  C_PLUS_PLUS_CODE, 
  LogStep 
} from "@/lib/algorithms";
import { Play, RotateCcw, SkipForward, Code, Terminal, Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Algorithm = "bubble" | "selection" | "linear";

export default function Home() {
  const [algorithm, setAlgorithm] = useState<Algorithm>("bubble");
  const [arrayInput, setArrayInput] = useState("64, 34, 25, 12, 22, 11, 90");
  const [searchTarget, setSearchTarget] = useState("22");
  
  const [currentArr, setCurrentArr] = useState<number[]>([]);
  const [logs, setLogs] = useState<LogStep[]>([]);
  const [allSteps, setAllSteps] = useState<LogStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [viewMode, setViewMode] = useState<'console' | 'code'>('console');

  // Initialize array
  useEffect(() => {
    reset();
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
    
    if (algorithm === 'bubble') {
      steps = simulateBubbleSort(arr);
    } else if (algorithm === 'selection') {
      steps = simulateSelectionSort(arr);
    } else if (algorithm === 'linear') {
      steps = simulateLinearSearch(arr, parseInt(searchTarget));
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

  // Auto-play effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && currentStepIndex < allSteps.length) {
      interval = setInterval(() => {
        handleStep();
      }, 800); // Speed of visualization
    } else if (currentStepIndex >= allSteps.length) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentStepIndex, allSteps]);


  const currentHighlight = logs[logs.length - 1]?.highlightIndices;
  const currentType = logs[logs.length - 1]?.type === 'swap' ? 'swap' : 
                      logs[logs.length - 1]?.type === 'found' ? 'found' :
                      logs[logs.length - 1]?.type === 'compare' ? 'compare' : 'none';

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Scanline Effect */}
      <div className="scanline"></div>

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-primary pb-4 gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-primary glow-text tracking-tighter">
            ALGO_VISUALIZER<span className="animate-pulse">_</span>
          </h1>
          <p className="text-primary/60 font-mono mt-2 text-sm md:text-base">
            // DSA LEARNING MODULE v1.0 // C++ ENGINE
          </p>
        </div>
        
        <div className="flex gap-2 font-mono text-xs md:text-sm">
          <Button 
            variant="outline" 
            className={cn("border-primary text-primary hover:bg-primary hover:text-black rounded-none transition-all", algorithm === 'bubble' && "bg-primary text-black")}
            onClick={() => { setAlgorithm('bubble'); reset(); }}
          >
            BUBBLE_SORT
          </Button>
          <Button 
            variant="outline" 
            className={cn("border-primary text-primary hover:bg-primary hover:text-black rounded-none transition-all", algorithm === 'selection' && "bg-primary text-black")}
            onClick={() => { setAlgorithm('selection'); reset(); }}
          >
            SELECTION_SORT
          </Button>
          <Button 
            variant="outline" 
            className={cn("border-primary text-primary hover:bg-primary hover:text-black rounded-none transition-all", algorithm === 'linear' && "bg-primary text-black")}
            onClick={() => { setAlgorithm('linear'); reset(); }}
          >
            LINEAR_SEARCH
          </Button>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 grow">
        
        {/* Left Panel: Controls & Input */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-card border border-primary/30 p-4 relative">
             <div className="absolute -top-3 left-3 bg-background px-2 text-primary text-xs font-bold">INPUT_PARAMETERS</div>
             
             <div className="space-y-4 mt-2">
               <div>
                 <label className="text-primary/70 text-xs font-mono uppercase mb-1 block">Array (CSV)</label>
                 <Input 
                   value={arrayInput} 
                   onChange={(e) => { setArrayInput(e.target.value); reset(); }}
                   className="bg-black border-primary/50 text-primary font-mono rounded-none focus-visible:ring-primary h-10" 
                 />
               </div>
               
               {algorithm === 'linear' && (
                 <div>
                   <label className="text-primary/70 text-xs font-mono uppercase mb-1 block">Search Target</label>
                   <Input 
                     value={searchTarget} 
                     onChange={(e) => { setSearchTarget(e.target.value); reset(); }}
                     className="bg-black border-primary/50 text-primary font-mono rounded-none focus-visible:ring-primary h-10 w-24" 
                   />
                 </div>
               )}
             </div>
          </div>

          <div className="bg-card border border-primary/30 p-4 relative grow flex flex-col gap-4">
             <div className="absolute -top-3 left-3 bg-background px-2 text-primary text-xs font-bold">EXECUTION_CONTROLS</div>
             
             <Button 
               className="w-full bg-primary text-black hover:bg-primary/90 font-bold rounded-none h-12 text-lg"
               onClick={handleStart}
               disabled={isRunning && currentStepIndex < allSteps.length}
             >
               <Play className="mr-2 h-5 w-5" /> {isRunning ? 'RUNNING...' : 'EXECUTE'}
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
                    {isRunning ? "PROCESSING" : "IDLE"}
                 </span>
               </div>
               <div className="flex justify-between mt-1">
                 <span>STEPS:</span>
                 <span>{currentStepIndex} / {allSteps.length > 0 ? allSteps.length : '-'}</span>
               </div>
             </div>
          </div>
        </div>

        {/* Center/Right Panel: Visualization */}
        <div className="lg:col-span-9 flex flex-col gap-4 h-[600px] lg:h-auto">
          
          {/* Visualizer View */}
          <ArrayDisplay 
            arr={currentArr} 
            highlightIndices={currentHighlight} 
            type={currentType}
          />

          {/* Console & Code Tabs */}
          <div className="grow flex flex-col min-h-0 bg-black border-2 border-primary/30 relative">
             <div className="flex border-b border-primary/30">
                <button 
                  onClick={() => setViewMode('console')}
                  className={cn(
                    "px-6 py-2 font-mono text-sm font-bold flex items-center gap-2 transition-colors",
                    viewMode === 'console' ? "bg-primary text-black" : "text-primary hover:bg-primary/10"
                  )}
                >
                  <Terminal size={16} /> CONSOLE_OUTPUT
                </button>
                <button 
                  onClick={() => setViewMode('code')}
                  className={cn(
                    "px-6 py-2 font-mono text-sm font-bold flex items-center gap-2 transition-colors",
                    viewMode === 'code' ? "bg-primary text-black" : "text-primary hover:bg-primary/10"
                  )}
                >
                  <Code size={16} /> SOURCE_CODE.cpp
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
                     {algorithm === 'linear' && C_PLUS_PLUS_CODE.linearSearch}
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
