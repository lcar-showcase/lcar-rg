import style from "./disk.module.css";

export type DiskColour = "dark" | "light" | null;

/**
 * A coloured disk.
 * @param colour - Disk colour.
 * @returns Disk component.
 */
function Disk({ colour }: { colour: DiskColour }) {
  if (colour) {
    return <div className={colour === "dark" ? `${style.disk} ${style.dark}` : `${style.disk} ${style.light}`} />;
  }
  return null; // No disk colour given; empty tile
}

export default Disk;
