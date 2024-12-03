import style from "./disk.module.css";

export type DiskColour = "dark" | "light" | null;

function Disk({ colour }: { colour: DiskColour }) {
  if (colour) {
    return <div className={colour === "dark" ? `${style.disk} ${style.dark}` : `${style.disk} ${style.light}`} />;
  }
  return null; // No disk; empty tile
}

export default Disk;
