import style from "./logo.module.css";

function Logo({ isNav }: { isNav: boolean }) {
  return (
    // Hover effects on navigable navigable logo only
    <h1 className={`${style.base} ${isNav ? style.navigable : style.nonNavigable}`}>
      REV
      <span className={style.flipped}>E</span>
      RSI
    </h1>
  );
}

export default Logo;
