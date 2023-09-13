import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Title from '../Title'
import routes from '@/routes'
import styles from './styles.module.css'
import ModalTop from '../ModalTop'
import Header from '../Header'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '@/store'

interface ModalTopProps {
  open: boolean
  onClose?: () => void
}

function SpecialWelcomeOffer({ open, onClose }: ModalTopProps): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const updateSelectedPrice = useCallback((selectedPrice: number | null) => {
    dispatch(actions.payment.update({
      selectedPrice
    }))
  }, [dispatch])
  const handleNext = () => {
    updateSelectedPrice(1)
    navigate(routes.client.emailEnter())
  }
  

  return (
    <>
      {open ? (
        <ModalTop open={open} onClose={onClose || handleNext}>
          <Header showBack={false} showCross={true} clickCross={onClose || handleNext} />
          <div className={styles.content}>
            <span className={styles['welcome-offer']}>{t('special_welcome_offer')}</span>
            <Title variant='h1'>{t('get_100_off')}</Title>
            <div className={styles['discount-container']}>
              <span className={styles['red-price']}>$9.99</span>
              <span className={styles['price']}>$0.00</span>
            </div>
            <button className={styles.button} onClick={onClose || handleNext}>{t('get_discount')}</button>
          </div>
        </ModalTop>
      ): null}
    </>
  )
}

export default SpecialWelcomeOffer
