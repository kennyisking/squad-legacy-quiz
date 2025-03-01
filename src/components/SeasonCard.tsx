
import { Season } from "../types/game";
import { motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";

interface SeasonCardProps {
  season: Season;
}

export default function SeasonCard({ season }: SeasonCardProps) {
  const { selectSeason } = useGameStore();
  
  const handleSelectSeason = () => {
    selectSeason(season);
  };
  
  // Placeholder image if season.image is not available
  const seasonImage = season.image || `https://via.placeholder.com/400x200?text=${season.name}`;
  
  return (
    <motion.div 
      className="hover-lift cursor-pointer rounded-2xl overflow-hidden bg-white border border-border"
      onClick={handleSelectSeason}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <div className="relative h-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <div className="absolute bottom-3 left-4 z-20">
          <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white">
            {season.year}
          </span>
        </div>
        <img
          src={seasonImage}
          alt={season.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2">{season.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{season.description}</p>
        
        <div className="mt-4 flex justify-end">
          <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            Draft Squad →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
