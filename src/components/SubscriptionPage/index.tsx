import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { selectors } from '@/store'
import MainButton from '../MainButton'
import Policy from '../Policy'
import Countdown from '../Countdown'
import PaymentTable, { Currency, Locale } from '../PaymentTable'
import UserHeader from '../UserHeader'
import CallToAction from '../CallToAction'
import routes from '@/routes'
import './styles.css'

const currency = Currency.USD
const locale = Locale.EN
const itemPriceId = 'aura-membership-2-week-USD'
const paymentItems = [
  {
    title: 'Per 7-Day Trial For',
    price: 1.00,
    description: '2-Week Plan',
  },
]

function SubscriptionPage(): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const email = useSelector(selectors.selectEmail)
  const itemPrice = useSelector(selectors.selectPlanById(itemPriceId))
  const handleClick = () => navigate(routes.client.paymentMethod())
  const policyLink = <a href='https://aura.wit.life/' target='_blank' rel='noopener noreferrer'>{t('subscription_policy')}</a>
  console.log({ itemPrice })
  return (
    <>
      <UserHeader email={email} />
      <section className='page'>
        <CallToAction />
        <Countdown start={10}/>
        <PaymentTable items={paymentItems} currency={currency} locale={locale}/>
        <div className='subscription-action'>
          <MainButton onClick={handleClick}>{t('get_access')}</MainButton>
        </div>
        <Policy>{t('subscription_text', { policyLink })}</Policy>
      </section>
    </>
  )
}

export default SubscriptionPage
