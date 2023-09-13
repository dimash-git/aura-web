import { useTranslation } from "react-i18next";
import Title from "../Title";
import styles from "./styles.module.css";

interface IStartBreathModalChildProps {
  handleBegin: () => void;
}

function StartBreathModalChild({
  handleBegin,
}: IStartBreathModalChildProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <section className={`${styles["start-breath"]} page`}>
      <div className={styles.text}>
        <Title variant="h4" className={styles["breathe-title"]}>
          {t("breathe-title").split("").map((symbol, index) => (
            <span className={styles["symbol"]} style={{ animationDelay: `${index * 0.1}s` }} key={index}>{symbol}</span>
          ))}
        </Title>
        <Title variant="h4" className={styles["breathe-subtitle"]}>
          {t("breathe-subtitle").split("").map((symbol, index) => (
            <span className={styles["symbol"]} style={{ animationDelay: `${(t("breathe-title").split("").length + index) * 0.1}s` }} key={index}>{symbol}</span>
          ))}
        </Title>
      </div>
      <button
        type="button"
        className={styles.begin}
        onClick={handleBegin}
      >
        {t("aura-begin_breathe-button")}
      </button>
    </section>
  );
}

export default StartBreathModalChild;
