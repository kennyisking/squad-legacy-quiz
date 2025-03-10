
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Player, Season, Squad, GameState } from '../types/game';
import { seasons } from '../data/seasons';
import { players } from '../data/players';

interface GameStore extends GameState {
  selectSeason: (season: Season) => void;
  startDraft: () => void;
  draftPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  completeDraft: () => void;
  resetDraft: () => void;
  setView: (view: 'seasons' | 'draft' | 'results') => void;
  saveSquad: (name: string) => void;
  getSavedSquads: () => Squad[];
  setShowPoints: (show: boolean) => void;
}

const INITIAL_BUDGET = 100.0;

export const useGameStore = create<GameStore>()(
  devtools(
    persist(
      (set, get) => ({
        selectedSeason: null,
        draftedPlayers: [],
        availablePlayers: [],
        draftComplete: false,
        budget: INITIAL_BUDGET,
        currentView: 'seasons',
        showPoints: false,
        
        selectSeason: (season) => {
          set({
            selectedSeason: season,
            availablePlayers: players[season.id] || [],
            currentView: 'draft',
            draftedPlayers: [],
            budget: INITIAL_BUDGET,
            draftComplete: false,
            showPoints: false
          });
        },
        
        startDraft: () => {
          const { selectedSeason } = get();
          if (selectedSeason) {
            set({
              availablePlayers: players[selectedSeason.id] || [],
              currentView: 'draft',
              draftedPlayers: [],
              budget: INITIAL_BUDGET,
              draftComplete: false,
              showPoints: false
            });
          }
        },
        
        draftPlayer: (player) => {
          const { draftedPlayers, budget, availablePlayers } = get();
          
          // Check position limits
          const gkCount = draftedPlayers.filter(p => p.position === 'GK').length;
          const defCount = draftedPlayers.filter(p => p.position === 'DEF').length;
          const midCount = draftedPlayers.filter(p => p.position === 'MID').length;
          const fwdCount = draftedPlayers.filter(p => p.position === 'FWD').length;
          
          if (draftedPlayers.length >= 15) {
            console.log("Squad full");
            return;
          }
          
          if (player.position === 'GK' && gkCount >= 2) {
            console.log("Max goalkeepers reached");
            return;
          }
          
          if (player.position === 'DEF' && defCount >= 5) {
            console.log("Max defenders reached");
            return;
          }
          
          if (player.position === 'MID' && midCount >= 5) {
            console.log("Max midfielders reached");
            return;
          }
          
          if (player.position === 'FWD' && fwdCount >= 3) {
            console.log("Max forwards reached");
            return;
          }
          
          if (budget - player.price < 0) {
            console.log("Not enough budget");
            return;
          }
          
          // Add player to squad
          set({
            draftedPlayers: [...draftedPlayers, player],
            budget: +(budget - player.price).toFixed(1),
            availablePlayers: availablePlayers.filter(p => p.id !== player.id)
          });
        },
        
        removePlayer: (playerId) => {
          const { draftedPlayers, budget, availablePlayers } = get();
          const player = draftedPlayers.find(p => p.id === playerId);
          
          if (player) {
            set({
              draftedPlayers: draftedPlayers.filter(p => p.id !== playerId),
              budget: +(budget + player.price).toFixed(1),
              availablePlayers: [...availablePlayers, player].sort((a, b) => a.name.localeCompare(b.name))
            });
          }
        },
        
        completeDraft: () => {
          const { draftedPlayers } = get();
          
          // Check if we have a valid squad (15 players with positional requirements)
          const gkCount = draftedPlayers.filter(p => p.position === 'GK').length;
          const defCount = draftedPlayers.filter(p => p.position === 'DEF').length;
          const midCount = draftedPlayers.filter(p => p.position === 'MID').length;
          const fwdCount = draftedPlayers.filter(p => p.position === 'FWD').length;
          
          if (draftedPlayers.length !== 15 || gkCount < 2 || defCount < 5 || midCount < 5 || fwdCount < 3) {
            console.log("Invalid squad composition");
            return;
          }
          
          // Calculate total points
          const totalPoints = draftedPlayers.reduce((sum, player) => sum + player.points, 0);
          
          set({
            draftComplete: true,
            currentView: 'results',
            showPoints: true
          });
        },
        
        resetDraft: () => {
          const { selectedSeason } = get();
          if (selectedSeason) {
            set({
              availablePlayers: players[selectedSeason.id] || [],
              draftedPlayers: [],
              budget: INITIAL_BUDGET,
              draftComplete: false,
              currentView: 'draft',
              showPoints: false
            });
          }
        },
        
        setView: (view) => {
          set({ currentView: view });
        },
        
        setShowPoints: (show) => {
          set({ showPoints: show });
        },
        
        saveSquad: (name) => {
          const { draftedPlayers, selectedSeason } = get();
          if (!selectedSeason) return;
          
          const totalPoints = draftedPlayers.reduce((sum, player) => sum + player.points, 0);
          
          const squad: Squad = {
            id: `squad-${Date.now()}`,
            name,
            season: selectedSeason.id,
            players: [...draftedPlayers],
            totalPoints,
            created: new Date()
          };
          
          // Get existing saved squads
          const savedSquads = localStorage.getItem('saved-squads');
          let squads: Squad[] = savedSquads ? JSON.parse(savedSquads) : [];
          
          // Add new squad
          squads.push(squad);
          
          // Save to localStorage
          localStorage.setItem('saved-squads', JSON.stringify(squads));
        },
        
        getSavedSquads: () => {
          const savedSquads = localStorage.getItem('saved-squads');
          return savedSquads ? JSON.parse(savedSquads) : [];
        }
      }),
      {
        name: 'legacy-squad-storage'
      }
    )
  )
);
