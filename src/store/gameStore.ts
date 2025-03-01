
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Player, Season, Squad, GameState } from '../types/game';
import { seasons } from '../data/seasons';
import { players } from '../data/players';

// Helper function to shuffle an array (Fisher-Yates shuffle)
const shuffle = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Helper function to get `count` random players from an array
const getRandomPlayers = (players, count) => {
  const shuffled = shuffle(players);
  return shuffled.slice(0, Math.min(count, players.length));
};

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

export const useGameStore = create(
  devtools(
    persist(
      (set, get) => ({
        selectedSeason: null,
        draftedPlayers: [],
        draftComplete: false,
        currentView: 'seasons',
        showPoints: false,
        // New state for sequential draft
        draftSequence: [], // e.g., ['GK', 'DEF', 'MID', ...]
        currentDraftIndex: 0, // Tracks current step (0 to 14)
        availablePlayersByPosition: {}, // { GK: [], DEF: [], MID: [], FWD: [] }
        currentOptions: [], // 5 players to choose from at each step

        // Select a season and initialize the draft
        selectSeason: (season) => {
          const allPlayers = players[season.id] || [];

          // Group players by position
          const availablePlayersByPosition = {
            GK: allPlayers.filter((p) => p.position === 'GK'),
            DEF: allPlayers.filter((p) => p.position === 'DEF'),
            MID: allPlayers.filter((p) => p.position === 'MID'),
            FWD: allPlayers.filter((p) => p.position === 'FWD'),
          };

          // Generate random draft sequence
          const positions = [
            'GK', 'GK',
            'DEF', 'DEF', 'DEF', 'DEF', 'DEF',
            'MID', 'MID', 'MID', 'MID', 'MID',
            'FWD', 'FWD', 'FWD',
          ];
          const draftSequence = shuffle(positions);

          // Set initial options (5 random players for the first position)
          const firstPosition = draftSequence[0];
          const initialOptions = getRandomPlayers(availablePlayersByPosition[firstPosition], 5);

          set({
            selectedSeason: season,
            availablePlayersByPosition,
            draftSequence,
            currentDraftIndex: 0,
            currentOptions: initialOptions,
            draftedPlayers: [],
            draftComplete: false,
            currentView: 'draft',
            showPoints: false,
          });
        },

        // Select a player from the current options
        selectPlayerFromOptions: (player) => {
          const {
            draftedPlayers,
            availablePlayersByPosition,
            draftSequence,
            currentDraftIndex,
          } = get();

          // Add selected player to drafted players
          const newDrafted = [...draftedPlayers, player];

          // Remove selected player from available pool
          const position = player.position;
          const newAvailable = availablePlayersByPosition[position].filter((p) => p.id !== player.id);
          const newAvailableByPosition = {
            ...availablePlayersByPosition,
            [position]: newAvailable,
          };

          // Move to next step
          const nextIndex = currentDraftIndex + 1;

          if (nextIndex < 15) {
            // Set next options
            const nextPosition = draftSequence[nextIndex];
            const nextAvailable = newAvailableByPosition[nextPosition];
            const nextOptions = getRandomPlayers(nextAvailable, Math.min(5, nextAvailable.length));

            set({
              draftedPlayers: newDrafted,
              availablePlayersByPosition: newAvailableByPosition,
              currentDraftIndex: nextIndex,
              currentOptions: nextOptions,
            });
          } else {
            // Draft is complete
            const totalPoints = newDrafted.reduce((sum, p) => sum + p.points, 0);
            const totalPrice = newDrafted.reduce((sum, p) => sum + p.price, 0);
            set({
              draftedPlayers: newDrafted,
              availablePlayersByPosition: newAvailableByPosition,
              draftComplete: true,
              currentView: 'results',
              showPoints: true,
            });
          }
        },

        // Reset the draft
        resetDraft: () => {
          const { selectedSeason } = get();
          if (selectedSeason) {
            const allPlayers = players[selectedSeason.id] || [];
            const availablePlayersByPosition = {
              GK: allPlayers.filter((p) => p.position === 'GK'),
              DEF: allPlayers.filter((p) => p.position === 'DEF'),
              MID: allPlayers.filter((p) => p.position === 'MID'),
              FWD: allPlayers.filter((p) => p.position === 'FWD'),
            };
            const positions = [
              'GK', 'GK',
              'DEF', 'DEF', 'DEF', 'DEF', 'DEF',
              'MID', 'MID', 'MID', 'MID', 'MID',
              'FWD', 'FWD', 'FWD',
            ];
            const draftSequence = shuffle(positions);
            const firstPosition = draftSequence[0];
            const initialOptions = getRandomPlayers(availablePlayersByPosition[firstPosition], 5);

            set({
              availablePlayersByPosition,
              draftSequence,
              currentDraftIndex: 0,
              currentOptions: initialOptions,
              draftedPlayers: [],
              draftComplete: false,
              currentView: 'draft',
              showPoints: false,
            });
          }
        },

        // Set the current view
        setView: (view) => set({ currentView: view }),

        // Toggle points visibility
        setShowPoints: (show) => set({ showPoints: show }),
      }),
      { name: 'legacy-squad-storage' }
    )
  )
);
