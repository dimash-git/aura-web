import { UserAuraStat } from '@/api/resources/Auras'
import styles from './styles.module.css'

interface IEnergyValues {
    className?: string
    values: UserAuraStat[]
}

const colors: Record<string, string> = {
    "feelings": "#00f0ff",
    "self_control": "#e1e767",
    "energy_loss": "#ff3720",
    "happiness": "#ff1eff"
}

const valueFormatter = (value: number) => {
    return `${(value * 100).toFixed()}%`
}

function EnergyValues({ className, values }: IEnergyValues): JSX.Element {

  return (
    <div className={`${styles['energy-values']} ${className || ''}`}>
      {values.map(({ value, label, stat }, index) => (
        <div className={styles['energy-value']} key={index} style={{ color: colors[stat] }}>
          <span className={styles['energy-value__value']}>{valueFormatter(value)}</span>
          <span className={styles['energy-value__label']}>{label}</span>
        </div>
      ))}
    </div>
  )
}

export default EnergyValues
