import styles from "./styles.module.css";

interface IFullScreenModalProps {
  className?: string;
  style?: React.CSSProperties;
  children: JSX.Element;
  isOpen: boolean;
}

function FullScreenModal({
  className,
  children,
  style,
  isOpen,
}: IFullScreenModalProps): JSX.Element {
  return (
    <div
      style={{ ...style }}
      className={`${styles["modal"]} ${className || ""} ${
        isOpen ? styles.open : ""
      }`}
    >
      <div className={styles["modal__content"]}>{children}</div>
    </div>
  );
}

export default FullScreenModal;
