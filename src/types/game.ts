
export type PlayerPosition = 'GK' | 'DEF' | 'MID' | 'FWD';

export interface Player {
  id: string;
  name: string;
  position: PlayerPosition;
  team: string;
  season: string;
  points: number;
  price: number;
  image?: string;
}

export interface Season {
  id: string;
  name: string;
  year: string;
  description: string;
  image?: string;
}

export interface Squad {
  id: string;
  name: string;
  season: string;
  players: Player[];
  totalPoints: number;
  created: Date;
}

export interface GameState {
  selectedSeason: Season | null;
  draftedPlayers: Player[];
  availablePlayers: Player[];
  draftComplete: boolean;
  budget: number;
  currentView: 'seasons' | 'draft' | 'results';
  showPoints: boolean;
}
