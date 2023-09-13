import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectors } from '@/store'
import { usePayment } from '@/payment'
import { actions } from '@/store'
import {
  ApplePayBanner,
  ApplePayButton,
  GooglePayBanner,
  GooglePayButton,
  CardButton,
  CardModal
} from './methods'
import ErrorModal from './ErrorModal'
import UserHeader from '../UserHeader'
import Title from '../Title'
import Loader from '../Loader'
import secure from './secure.png'
import routes from '@/routes'
import './styles.css'

function PaymentPage(): JSX.Element {
  const { t } = useTranslation()
  const { applePay } = usePayment()
  const [openCardModal, setOpenCardModal] = useState(false)
  const [openErrorModal, setOpenErrorModal] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoading = applePay === null
  const isApplePayAvailable = import.meta.env.PROD && applePay?.canMakePayments()
  const email = useSelector(selectors.selectEmail)
  const onSuccess = useCallback(() => {
    dispatch(actions.status.update('subscribed'))
    navigate(routes.client.wallpaper())
  }, [dispatch, navigate])
  const onError = useCallback((error: Error) => {
    console.error(error)
    setOpenErrorModal(true)
  }, [])

  return (
    <>
      <UserHeader email={email} />
      <section className='page'>
        { isLoading ? <Loader /> : (
          <>
            <div className='page-header'>
              { isApplePayAvailable ? <ApplePayBanner /> : <GooglePayBanner /> }
              <img src={secure} alt='100% Secure' />
            </div>
            <Title variant='h1' className='mb-45'>{t('choose_payment')}</Title>
            { isApplePayAvailable
              ?
              <ApplePayButton onSuccess={onSuccess} onError={onError} />
              :
              <GooglePayButton onSuccess={onSuccess} onError={onError} /> }
            <div className='payment-divider'>{t('or').toUpperCase()}</div>
            <CardButton onClick={() => setOpenCardModal(true)} />
            <p className='payment-warining'>
              {t('will_be_charged', { strongText: <strong>{t('trial_price')}</strong> })}
            </p>
            <CardModal
              open={openCardModal}
              onClose={() => setOpenCardModal(false)}
              onSuccess={onSuccess}
              onError={onError}
            />
            <ErrorModal open={openErrorModal} onClose={() => setOpenErrorModal(false)} />
          </>
        )}
      </section>
    </>
  )
}

export default PaymentPage
