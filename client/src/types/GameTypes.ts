interface Player {
  id: string;
  playerName: string;
  board: BoardState[];
}

interface PlayerBoard {
  player: Player;
  placeDice?: (col: BoardState, playerId: string) => void;
  playerTurn?: string;
  diceState?: {
    state: string;
    dice: number;
  };
  checkWinner: string | undefined;
  boardStyles: BoardStyleTypes;
  showScores: boolean;
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
type BoardStyleKeys =
  | "boardSize"
  | "diceSize"
  | "scoreStyles"
  | "playerNameStyles"
  | "textSize"
  | "boardFrame";

type BoardStyleTypes = {
  [key in BoardStyleKeys]: string;
};

export type { Player, PlayerBoard, Dice, BoardState, BoardStyleTypes };
