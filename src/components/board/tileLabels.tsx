import { TilePos } from "../tile/tile";

// All possible rows and column labels on the board
const rows = ["1", "2", "3", "4", "5", "6", "7", "8"];
const cols = ["A", "B", "C", "D", "E", "F", "G", "H"];

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
