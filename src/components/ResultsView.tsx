
import { useState } from "react";
import { useGameStore } from "../store/gameStore";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ResultsView() {
  const { draftedPlayers, selectedSeason, resetDraft, saveSquad, setView } = useGameStore();
  const [squadName, setSquadName] = useState("");
  
  // Calculate total points and stats
  const totalPoints = draftedPlayers.reduce((sum, player) => sum + player.points, 0);
  
  // Group players by position for display
  const goalkeepers = draftedPlayers.filter(p => p.position === 'GK');
  const defenders = draftedPlayers.filter(p => p.position === 'DEF');
  const midfielders = draftedPlayers.filter(p => p.position === 'MID');
  const forwards = draftedPlayers.filter(p => p.position === 'FWD');
  
  // Get top performers
  const topPerformer = [...draftedPlayers].sort((a, b) => b.points - a.points)[0];
  
  const handleSaveSquad = () => {
    if (!squadName.trim()) {
      toast.error("Please enter a name for your squad");
      return;
    }
    
    saveSquad(squadName);
    toast.success("Squad saved successfully!");
    setSquadName("");
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-muted text-sm font-medium mb-2">
              {selectedSeason?.year}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Results</h1>
            <p className="text-xl text-muted-foreground">
              Your squad would have scored:
            </p>
          </motion.div>
          
          <motion.div
            className="mt-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="text-6xl md:text-7xl font-bold text-primary">{totalPoints}</div>
            <div className="text-xl text-muted-foreground mt-2">Fantasy Points</div>
          </motion.div>
        </div>
        
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Squad Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Top Performer</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">
                      {topPerformer?.name?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold">{topPerformer?.name}</div>
                    <div className="text-sm text-muted-foreground">{topPerformer?.points} points</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Season</h3>
                <div className="font-bold">{selectedSeason?.name}</div>
                <div className="text-sm text-muted-foreground">{selectedSeason?.year}</div>
              </div>
            </div>
            
            <div className="border-t border-border pt-6">
              <h3 className="font-bold mb-4">Your Squad</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Goalkeepers</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {goalkeepers.map(player => (
                      <div key={player.id} className="flex justify-between items-center bg-muted/20 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <span className="font-medium">{player.name}</span>
                          <span className="text-xs text-muted-foreground">{player.team}</span>
                        </div>
                        <span className="font-bold">{player.points}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Defenders</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {defenders.map(player => (
                      <div key={player.id} className="flex justify-between items-center bg-muted/20 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span className="font-medium">{player.name}</span>
                          <span className="text-xs text-muted-foreground">{player.team}</span>
                        </div>
                        <span className="font-bold">{player.points}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Midfielders</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {midfielders.map(player => (
                      <div key={player.id} className="flex justify-between items-center bg-muted/20 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="font-medium">{player.name}</span>
                          <span className="text-xs text-muted-foreground">{player.team}</span>
                        </div>
                        <span className="font-bold">{player.points}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Forwards</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {forwards.map(player => (
                      <div key={player.id} className="flex justify-between items-center bg-muted/20 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="font-medium">{player.name}</span>
                          <span className="text-xs text-muted-foreground">{player.team}</span>
                        </div>
                        <span className="font-bold">{player.points}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border bg-muted/10 p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1 w-full">
                <input
                  type="text"
                  placeholder="Enter a name for your squad"
                  value={squadName}
                  onChange={(e) => setSquadName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div className="flex space-x-3 w-full md:w-auto">
                <button
                  onClick={handleSaveSquad}
                  className="flex-1 md:flex-none px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                  Save Squad
                </button>
                
                <button
                  onClick={resetDraft}
                  className="flex-1 md:flex-none px-6 py-2 rounded-lg bg-muted text-muted-foreground font-medium hover:bg-muted/80 transition-colors"
                >
                  Draft Again
                </button>
                
                <button
                  onClick={() => setView('seasons')}
                  className="flex-1 md:flex-none px-6 py-2 rounded-lg border border-border bg-white text-foreground font-medium hover:bg-muted/20 transition-colors"
                >
                  Change Season
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
