
import { useGameStore } from "../store/gameStore";
import { seasons } from "../data/seasons";
import SeasonCard from "./SeasonCard";
import { motion } from "framer-motion";

export default function SeasonsView() {
  const savedSquads = useGameStore().getSavedSquads();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
            Premier League Legacy
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Draft Your Historic FPL Squad</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Test your football knowledge by building a fantasy team from historic Premier League seasons.
          </p>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Choose a Season</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seasons.map((season, index) => (
              <motion.div
                key={season.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <SeasonCard season={season} />
              </motion.div>
            ))}
          </div>
        </div>
        
        {savedSquads.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Saved Squads</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedSquads.map((squad, index) => (
                <motion.div
                  key={squad.id}
                  className="bg-white rounded-xl border border-border overflow-hidden hover-lift"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <div className="p-5">
                    <span className="px-2 py-0.5 bg-muted text-xs font-medium rounded-full">
                      {squad.season}
                    </span>
                    <h3 className="text-lg font-bold mt-2 mb-1">{squad.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {new Date(squad.created).toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-primary font-bold">{squad.totalPoints}</span>
                        <span className="text-xs text-muted-foreground">points</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        <motion.div 
          className="mt-16 p-6 bg-muted/30 rounded-xl border border-border text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-2">How It Works</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose a historic Premier League season, then draft a squad of 15 players who played that season.
            We'll calculate how many Fantasy Premier League points your team would have scored!
          </p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-lg bg-white border border-border">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full text-primary font-bold mx-auto mb-2">1</div>
              <h4 className="font-bold mb-1">Choose a Season</h4>
              <p className="text-sm text-muted-foreground">Select any historic Premier League season</p>
            </div>
            
            <div className="p-4 rounded-lg bg-white border border-border">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full text-primary font-bold mx-auto mb-2">2</div>
              <h4 className="font-bold mb-1">Draft Your Squad</h4>
              <p className="text-sm text-muted-foreground">Pick 15 players within your budget</p>
            </div>
            
            <div className="p-4 rounded-lg bg-white border border-border">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full text-primary font-bold mx-auto mb-2">3</div>
              <h4 className="font-bold mb-1">See Your Score</h4>
              <p className="text-sm text-muted-foreground">Find out how many points you'd have scored</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
