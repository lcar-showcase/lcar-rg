type TileState = "dark" | "light" | null;

type PopUpType = "save" | "continue" | "confirm" | "win";

/**
 * Position of a tile.
 */
interface Coordinate {
  row: number; // 0-7
  col: number; // 0-7
}

export type { TileState, PopUpType, Coordinate };
