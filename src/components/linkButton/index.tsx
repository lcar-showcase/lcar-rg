import { Link } from "react-router";

interface LinkButtonProps {
  label: string;
  path: string;
  handleButtonClick(): void;
}

function LinkButton({ label, path, handleButtonClick }: LinkButtonProps) {
  return (
    <div role="button" aria-label={label} tabIndex={0} onClick={handleButtonClick} onKeyDown={() => {}}>
      <Link to={path} className="btn">
        {label}
      </Link>
    </div>
  );
}

export default LinkButton;
