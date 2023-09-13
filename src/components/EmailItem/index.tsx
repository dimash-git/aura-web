import { Currency, Locale, Price } from '../PaymentTable'
import styles from './styles.module.css'

export interface IEmailItem {
    email: string
    price: number
}

const currency = Currency.USD
const locale = Locale.EN

const roundToWhole = (value: string | number): number => {
    value = Number(value)
    if (value % Math.floor(value) !== 0) {
        return value
    }
    return Math.floor(value)
}

const formatEmail = (email: string): string => {
    return `${email.slice(0, 4)}****`
}

function EmailItem({email, price}: IEmailItem): JSX.Element {
  const _price = new Price(roundToWhole(price), currency, locale)

  return (
    <span className={styles.container}>
        {formatEmail(email)} <strong> chose {_price.format()} </strong>
    </span>
  )
}

export default EmailItem
