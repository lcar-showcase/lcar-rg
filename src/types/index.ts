type TileState = "dark" | "light" | null;
type PopUpType = "win" | "saving" | "continue";
type SaveStatus = "pending" | "ok" | "fail";

/**
 * Position of a tile.
 */
interface Coordinate {
  row: number; // 0-7
  col: number; // 0-7
}

export type { TileState, PopUpType, SaveStatus, Coordinate };
