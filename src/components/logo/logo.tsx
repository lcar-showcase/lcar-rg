import style from "./logo.module.css";

function Logo({ isNav }: { isNav: boolean }) {
  return <div className={isNav ? style.navigable : style.title}>REVERSI</div>;
}

export default Logo;
