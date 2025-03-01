
import { Player } from "../types/game";
import { motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";

interface PlayerCardProps {
  player: Player;
  isDrafted?: boolean;
  showPoints?: boolean;
}

export default function PlayerCard({ 
  player, 
  isDrafted = false, 
  showPoints = false 
}: PlayerCardProps) {
  const { draftPlayer, removePlayer } = useGameStore();
  
  const handleClick = (e: React.MouseEvent) => {
    // Prevent event propagation
    e.stopPropagation();
    
    console.log("Button clicked for player:", player.name);
    console.log("Is drafted:", isDrafted);
    
    if (isDrafted) {
      console.log("Removing player:", player.id);
      removePlayer(player.id);
    } else {
      console.log("Drafting player:", player.id);
      draftPlayer(player);
    }
  };
  
  // Placeholder image if player.image is not available
  const playerImage = player.image || `https://via.placeholder.com/150?text=${player.name}`;
  
  const positionColors = {
    GK: 'bg-yellow-500',
    DEF: 'bg-blue-500',
    MID: 'bg-green-500',
    FWD: 'bg-red-500'
  };
  
  return (
    <motion.div 
      className="player-card bg-white border border-border rounded-xl shadow-sm hover:shadow-md transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative p-4 flex flex-col justify-between h-full">
        <div className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-full text-white ${positionColors[player.position]}`}>
          {player.position}
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-muted">
              {player.team}
            </span>
          </div>
          <span className="text-xs font-medium">
            £{player.price}m
          </span>
        </div>
        
        <h3 className="text-lg font-semibold mb-1">{player.name}</h3>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-1">
            <span className="text-sm font-medium">FPL Points:</span>
            {showPoints ? (
              <span className="text-sm font-bold">{player.points}</span>
            ) : (
              <span className="text-sm font-bold">???</span>
            )}
          </div>
          
          <button
            onClick={handleClick}
            style={{ position: "relative", zIndex: 10 }}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              isDrafted 
                ? "bg-red-100 text-red-600 hover:bg-red-200" 
                : "bg-primary text-white hover:bg-primary/90"
            }`}
            type="button"
          >
            {isDrafted ? "Remove" : "Add"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
