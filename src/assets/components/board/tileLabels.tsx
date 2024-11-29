interface TileLabel {
  row: string;
  col: string;
}

function initLabels() {
  const rows = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const cols = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const labels: TileLabel[] = []; // All 64 tile labels

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

const tileLabels: TileLabel[] = initLabels();

export default tileLabels;
