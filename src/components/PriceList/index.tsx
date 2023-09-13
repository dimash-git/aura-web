import PriceItem from '../PriceItem'
import styles from './styles.module.css'

export interface IPrice {
    id: number
    value: number
}

const prices: IPrice[] = [
    {
        id: 1,
        value: 0
    },
    {
        id: 2,
        value: 5
    },
    {
        id: 3,
        value: 9
    },
    {
        id: 4,
        value: 13.67
    },
]

interface PriceListProps {
  activeItem: number | null
  click: () => void
}

function PriceList({click, activeItem}: PriceListProps): JSX.Element {

  return (
    <div className={`${styles.container}`}>
      {prices.map((price, idx) => (
        <PriceItem active={price.id === activeItem} key={idx} value={price.value} id={price.id} click={click} />
      ))}
    </div>
  )
}

export default PriceList
