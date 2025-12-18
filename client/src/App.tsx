import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import SearchingVisualizer from "@/pages/SearchingVisualizer";
import SortingVisualizer from "@/pages/SortingVisualizer";
import StacksQueuesVisualizer from "@/pages/StacksQueuesVisualizer";
import LinkedListVisualizer from "@/pages/LinkedListVisualizer";
import SlidingWindowVisualizer from "@/pages/SlidingWindowVisualizer";
import TwoPointersVisualizer from "@/pages/TwoPointersVisualizer";
import TreesVisualizer from "@/pages/TreesVisualizer";
import GraphsVisualizer from "@/pages/GraphsVisualizer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard}/>
      <Route path="/searching" component={SearchingVisualizer}/>
      <Route path="/sorting" component={SortingVisualizer}/>
      <Route path="/stacks-queues" component={StacksQueuesVisualizer}/>
      <Route path="/linked-lists" component={LinkedListVisualizer}/>
      <Route path="/sliding-window" component={SlidingWindowVisualizer}/>
      <Route path="/two-pointers" component={TwoPointersVisualizer}/>
      <Route path="/trees" component={TreesVisualizer}/>
      <Route path="/graphs" component={GraphsVisualizer}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
