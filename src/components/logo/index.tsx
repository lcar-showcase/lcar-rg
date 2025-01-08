import style from "./logo.module.css";

function Logo({ isNav }: { isNav: boolean }) {
  return (
    // Hover effects on navigable navigable logo only
    <img src="/images/logo.png" alt="logo" className={`base ${isNav ? style.navigable : style.nonNavigable}`} />
  );
}

export default Logo;
