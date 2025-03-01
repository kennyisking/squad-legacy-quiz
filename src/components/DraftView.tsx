
import { useState } from "react";
import { useGameStore } from "../store/gameStore";
import PlayerCard from "./PlayerCard";
import { PlayerPosition } from "../types/game";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function DraftView() {
  const { 
    draftedPlayers, 
    availablePlayers, 
    budget, 
    completeDraft, 
    resetDraft, 
    selectedSeason
  } = useGameStore();
  
  const [positionFilter, setPositionFilter] = useState<PlayerPosition | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Calculate squad stats
  const gkCount = draftedPlayers.filter(p => p.position === 'GK').length;
  const defCount = draftedPlayers.filter(p => p.position === 'DEF').length;
  const midCount = draftedPlayers.filter(p => p.position === 'MID').length;
  const fwdCount = draftedPlayers.filter(p => p.position === 'FWD').length;
  const totalPlayers = draftedPlayers.length;
  
  // Filter players
  const filteredPlayers = availablePlayers.filter(player => {
    const matchesPosition = positionFilter === 'ALL' || player.position === positionFilter;
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         player.team.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPosition && matchesSearch;
  });
  
  const handleCompleteDraft = () => {
    // Validate squad composition
    if (totalPlayers !== 15) {
      toast.error("Your squad must have exactly 15 players.");
      return;
    }
    
    if (gkCount !== 2) {
      toast.error("Your squad must have exactly 2 goalkeepers.");
      return;
    }
    
    if (defCount !== 5) {
      toast.error("Your squad must have exactly 5 defenders.");
      return;
    }
    
    if (midCount !== 5) {
      toast.error("Your squad must have exactly 5 midfielders.");
      return;
    }
    
    if (fwdCount !== 3) {
      toast.error("Your squad must have exactly 3 forwards.");
      return;
    }
    
    completeDraft();
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="flex flex-col space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Draft Your Squad</h1>
            <p className="text-muted-foreground">
              {selectedSeason?.name} ({selectedSeason?.year})
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="px-4 py-2 rounded-lg bg-secondary">
              <span className="font-medium text-sm">Budget:</span>
              <span className="ml-2 font-bold text-lg">£{budget.toFixed(1)}m</span>
            </div>
            
            <button 
              onClick={resetDraft}
              className="px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Drafted Players Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Your Squad ({totalPlayers}/15)</h2>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-lg bg-muted p-2 text-center">
                  <span className="block text-xs text-muted-foreground">GK</span>
                  <span className={`text-lg font-medium ${gkCount === 2 ? 'text-green-600' : ''}`}>
                    {gkCount}/2
                  </span>
                </div>
                
                <div className="rounded-lg bg-muted p-2 text-center">
                  <span className="block text-xs text-muted-foreground">DEF</span>
                  <span className={`text-lg font-medium ${defCount === 5 ? 'text-green-600' : ''}`}>
                    {defCount}/5
                  </span>
                </div>
                
                <div className="rounded-lg bg-muted p-2 text-center">
                  <span className="block text-xs text-muted-foreground">MID</span>
                  <span className={`text-lg font-medium ${midCount === 5 ? 'text-green-600' : ''}`}>
                    {midCount}/5
                  </span>
                </div>
                
                <div className="rounded-lg bg-muted p-2 text-center">
                  <span className="block text-xs text-muted-foreground">FWD</span>
                  <span className={`text-lg font-medium ${fwdCount === 3 ? 'text-green-600' : ''}`}>
                    {fwdCount}/3
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                {draftedPlayers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Start adding players to your squad</p>
                  </div>
                ) : (
                  draftedPlayers.map(player => (
                    <PlayerCard key={player.id} player={player} isDrafted={true} />
                  ))
                )}
              </div>
              
              <div className="mt-6">
                <button
                  onClick={handleCompleteDraft}
                  disabled={totalPlayers !== 15}
                  className="w-full py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Complete Draft
                </button>
              </div>
            </div>
          </div>
          
          {/* Available Players Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-xl font-bold">Available Players</h2>
                
                <div className="w-full md:w-auto flex flex-col md:flex-row gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search players..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full md:w-64 px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPositionFilter('ALL')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        positionFilter === 'ALL' 
                          ? 'bg-primary text-white' 
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      All
                    </button>
                    
                    <button
                      onClick={() => setPositionFilter('GK')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        positionFilter === 'GK' 
                          ? 'bg-yellow-500 text-white' 
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      GK
                    </button>
                    
                    <button
                      onClick={() => setPositionFilter('DEF')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        positionFilter === 'DEF' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      DEF
                    </button>
                    
                    <button
                      onClick={() => setPositionFilter('MID')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        positionFilter === 'MID' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      MID
                    </button>
                    
                    <button
                      onClick={() => setPositionFilter('FWD')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        positionFilter === 'FWD' 
                          ? 'bg-red-500 text-white' 
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      FWD
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="squad-grid">
                {filteredPlayers.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    <p>No players found matching your filters</p>
                  </div>
                ) : (
                  filteredPlayers.map(player => (
                    <PlayerCard key={player.id} player={player} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
