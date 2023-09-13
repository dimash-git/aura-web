import Loader, { LoaderColor } from "../Loader"
import styles from "./styles.module.css"

type ProcessItemProps = {
  top: number
  label: string
  isDone: boolean
}

function ProcessItem({ top, label, isDone }: ProcessItemProps): JSX.Element {

  return (
    <div className={styles['process-item']} style={{ top: top }}>
      <div className={styles['process-item__pick']}>
        {
          isDone
          ? <img className={styles['process-item__icon']} src="/check-mark.png" alt="check" />
          : <Loader color={LoaderColor.White} />
          }
      </div>
      <div className={styles['process-item__label']}>{label}</div>
    </div>
  )
}

export default ProcessItem
