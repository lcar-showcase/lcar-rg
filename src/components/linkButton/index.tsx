interface NavigationButtonProps {
  label: string;
  isSecondary: boolean; // Primary or secondary button has different CSS
  handleButtonClick(): void;
}

function NavigationButton({ label, isSecondary, handleButtonClick }: NavigationButtonProps) {
  return (
    <div
      role="button"
      aria-label={label}
      tabIndex={0}
      onClick={handleButtonClick}
      onKeyDown={() => {}}
      className={`btn ${isSecondary && "secondaryBtn"}`}
    >
      {label}
    </div>
  );
}

export default NavigationButton;
