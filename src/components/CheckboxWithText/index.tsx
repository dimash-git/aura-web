import styles from "./styles.module.css"

export type CheckboxWithTextProps = {
    text: string
    onChange?: (value: React.FormEvent<HTMLInputElement>) => void
}

function CheckboxWithText({ text, onChange }: CheckboxWithTextProps): JSX.Element {

  return (
    <div className={styles.container}>
        <label className={styles["container__input"]}>
            <input className={styles["container__checkbox"]} type="checkbox" onChange={onChange}/>
            <span className={styles["container__checkmark"]}></span>
        </label>
        <span className={styles["container__text"]}>{text}</span>
    </div>
  )
}

export default CheckboxWithText
