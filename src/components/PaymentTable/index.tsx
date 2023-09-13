import { useTranslation } from 'react-i18next'
import Price, { Currency, Locale } from './Price'
import './styles.css'

type PaymentItem = {
  title: string
  price: number
  description: string
}

type PaymentTableProps = {
  currency: Currency
  locale: Locale
  items: PaymentItem[]
}

function PaymentTable({ currency, locale, items }: PaymentTableProps): JSX.Element {
  const { t } = useTranslation()
  const total = items.reduce((acc, item) => acc + item.price, 0)
  const totalPrice = new Price(total, currency, locale)
  const toItem = (item: typeof items[0], idx: number) => {
    const price = new Price(item.price, currency, locale)
    return (
      <div key={idx} className='payment__item'>
        <div className='payment__item-summary'>
          <div className='payment__item-title'>{item.title}</div>
          <div className='payment__item-price'>{price.format()}</div>
        </div>
        <div className='payment__item-description'>
          <p>{item.description}</p>
          <p>One dollar thirty six cents per day</p>
        </div>
      </div>
    )
  }
  return (
    <div className='payment'>
      <div className='payment__table'>
        <div className='payment__total'>
          <div className='payment__total-title'>{t('total_today')}</div>
          <div className='payment__total-price'>{totalPrice.format()}</div>
        </div>
        <div className='payment__items'>
          {items.map(toItem)}
        </div>
      </div>
      <div className='payment__information'>{t('charged_only')}</div>
    </div>
  )
}

export default PaymentTable
export { Price, Currency, Locale }
