interface Player {
  id: number;
  playerName: string;
  board: BoardState[];
}

interface PlayerBoard {
  player: Player;
  placeDice: (col: BoardState, playerId: number) => void;
  playerTurn: number;
}

interface Dice {
  color: string;
  die: number;
}

interface BoardState {
  id: number;
  score: number;
  dices: Dice[];
}

export type { Player, PlayerBoard, Dice, BoardState };
