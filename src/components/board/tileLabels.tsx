import { DiskColour } from "../disk/disk";
import { TilePos } from "../tile/tile";

// All possible rows and column labels on the board
export const rows = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const cols = ["A", "B", "C", "D", "E", "F", "G", "H"];

/**
 * Getter for all row labels.
 * @returns Row labels.
 */
export function getRows() {
  return rows;
}

/**
 * Getter for all column labels.
 * @returns Column labels.
 */
export function getCols() {
  return cols;
}

/**
 * Create Tile labels, based on all combinations of row and column labels.
 * @returns All 64 Tile labels.
 */
export function initTileLabels() {
  const labels: TilePos[] = [];

  rows.forEach((row) => {
    cols.forEach((col) => {
      labels.push({
        row,
        col,
      });
    });
  });

  return labels;
}

export function initBoardArray(): DiskColour[][] {
  const boardArray: DiskColour[][] = Array.from({ length: rows.length }, () =>
    Array.from({ length: cols.length }, () => null)
  );

  // Default disks
  boardArray[rows.indexOf("4")][cols.indexOf("D")] = "light";
  boardArray[rows.indexOf("5")][cols.indexOf("E")] = "light";
  boardArray[rows.indexOf("4")][cols.indexOf("E")] = "dark";
  boardArray[rows.indexOf("5")][cols.indexOf("D")] = "dark";

  return boardArray;
}

console.log(initBoardArray());
