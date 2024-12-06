import { DiskColour } from "../../types";
import style from "./disk.module.css";

/**
 * A coloured disk.
 * @param colour - Disk colour.
 * @returns Disk component.
 */
function Disk({ colour }: { colour: DiskColour }) {
  if (colour) {
    return <div className={`${style.disk} ${style[colour]}`} />;
  }
  return null; // No disk colour given; empty tile
}

export default Disk;
