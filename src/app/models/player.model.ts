// src/app/models/player.model.ts
export interface Player {
  id: number;
  name: string;
  currentScore: number;
  totalScore: number;
  isActive: boolean;
  isWinner: boolean;
}
