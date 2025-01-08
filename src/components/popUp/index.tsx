import style from "./popUp.module.css";

interface PopUpProps {
  title: string;
  children?: React.ReactNode; // Children and buttons are optional
  primaryButtonText?: string;
  secondaryButtonText?: string;
  disablePrimaryButton?: boolean;
  disableSecondaryButton?: boolean;
  onClickPrimaryButton?(): void;
  onClickSecondaryButton?(): void;
}

function PopUp({
  title,
  children,
  primaryButtonText,
  secondaryButtonText,
  disablePrimaryButton = false, // Buttons enabled by default
  disableSecondaryButton = false,
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
            <button
              type="button"
              className="secondaryBtn btn"
              disabled={disableSecondaryButton}
              onClick={onClickSecondaryButton}
            >
              {secondaryButtonText}
            </button>
          )}
          {primaryButtonText && onClickPrimaryButton && (
            <button type="button" className="btn" disabled={disablePrimaryButton} onClick={onClickPrimaryButton}>
              {primaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PopUp;
