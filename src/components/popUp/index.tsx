import style from "./popUp.module.css";

interface PopUpProps {
  title: string;
  children?: React.ReactNode; // Children and buttons are optional
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onClickPrimaryButton?(): void;
  onClickSecondaryButton?(): void;
}

function PopUp({
  title,
  children,
  primaryButtonText,
  secondaryButtonText,
  onClickPrimaryButton,
  onClickSecondaryButton,
}: PopUpProps) {
  return (
    <div className={style.darken}>
      <div className={style.popUp}>
        <h2>{title}</h2>
        {children && <div className={style.popUpBodyContainer}>{children}</div>}
        <div className={style.buttonsContainer}>
          {secondaryButtonText && onClickSecondaryButton && (
            <button type="button" className="secondaryBtn btn" onClick={onClickSecondaryButton}>
              {secondaryButtonText}
            </button>
          )}
          {primaryButtonText && onClickPrimaryButton && (
            <button type="button" className="btn" onClick={onClickPrimaryButton}>
              {primaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PopUp;
