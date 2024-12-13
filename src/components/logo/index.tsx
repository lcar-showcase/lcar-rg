import style from "./logo.module.css";

function Logo({ isNav }: { isNav: boolean }) {
  return (
    // Hover effects on navigable navigable logo only
    <h1 className={`${style.base} ${isNav ? style.navigable : style.nonNavigable}`}>
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
