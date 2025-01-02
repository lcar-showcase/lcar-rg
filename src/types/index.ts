type TileState = "dark" | "light" | null;
type PopUpType = "save" | "continue" | "win" | "saving" | "error";
type SaveStatus = "pending" | "ok" | "fail";

/**
 * Position of a tile.
 */
interface Coordinate {
  row: number; // 0-7
  col: number; // 0-7
}

export type { TileState, PopUpType, SaveStatus, Coordinate };
