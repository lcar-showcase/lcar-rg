import { DiskColour } from "../../types";

// All possible rows and column labels on the board
export const rows = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const cols = ["A", "B", "C", "D", "E", "F", "G", "H"];

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
