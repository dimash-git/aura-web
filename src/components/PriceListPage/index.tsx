import { useNavigate } from 'react-router-dom'
import routes from '@/routes'
import styles from './styles.module.css'
import UserHeader from '../UserHeader'
import { useSelector } from 'react-redux'
import { selectors } from '@/store'
import Title from '../Title'
import { useTranslation } from 'react-i18next'
import EmailsList from '../EmailsList'
import PriceList from '../PriceList'

function PriceListPage(): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const selectedPrice = useSelector(selectors.selectSelectedPrice)
  
  const email = useSelector(selectors.selectEmail)
  const handleNext = () => {
    navigate(routes.client.home())
  }

  return (
    <>
        <UserHeader email={email} />
        <section className={`${styles.page} page`}>
            <Title className={styles.title} variant='h2'>{t('choose_your_own_fee')}</Title>
            <p className={styles.slogan}>{t('should_not_get', { strongText: <strong>{t('money')}</strong> })}</p>
            <div className={styles['emails-list-container']}>
                <EmailsList />
            </div>
            <div className={styles['price-list-container']}>
                <PriceList activeItem={selectedPrice} click={handleNext} />
            </div>
        </section>
    </>
  )
}

export default PriceListPage
