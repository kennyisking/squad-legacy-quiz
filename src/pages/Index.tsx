
import { useGameStore } from "../store/gameStore";
import SeasonsView from "../components/SeasonsView";
import DraftView from "../components/DraftView";
import ResultsView from "../components/ResultsView";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const { currentView } = useGameStore();
  
  useEffect(() => {
    // Add any initialization logic here
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">PL</span>
            </div>
            <h1 className="text-xl font-bold">Legacy Draft</h1>
          </div>
        </div>
      </header>
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentView === 'seasons' && <SeasonsView />}
            {currentView === 'draft' && <DraftView />}
            {currentView === 'results' && <ResultsView />}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <footer className="bg-white border-t border-border mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Premier League Legacy Draft — Test your football knowledge
          </p>
        </div>
      </footer>
      
      <Toaster position="top-center" />
    </div>
  );
};

export default Index;
