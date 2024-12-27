import { Link } from "react-router";

interface LinkButtonProps {
  label: string;
  path: string;
  isSecondary: boolean; // Primary or secondary button has different CSS
  handleButtonClick(): void;
}

function LinkButton({ label, path, isSecondary, handleButtonClick }: LinkButtonProps) {
  return (
    <div role="button" aria-label={label} tabIndex={0} onClick={handleButtonClick} onKeyDown={() => {}}>
      <Link to={path} className={`btn ${isSecondary && "secondaryBtn"}`}>
        {label}
      </Link>
    </div>
  );
}

export default LinkButton;
