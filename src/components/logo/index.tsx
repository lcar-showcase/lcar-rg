import { LogoSize } from "../../types";
import style from "./logo.module.css";

function Logo({ size }: { size: LogoSize }) {
  return (
    <h1 className={style[size]}>
      {/* Spaced using flex and gap; letter-spacing does not work due to flipped E */}
      <span>R</span>
      <span>E</span>
      <span>V</span>
      <span className={style.flipped}>E</span>
      <span>R</span>
      <span>S</span>
      <span>I</span>
    </h1>
  );
}

export default Logo;
