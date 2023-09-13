import { useCallback, useEffect, useRef, useState, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CardCVV, CardComponent, CardExpiry, CardNumber, Provider
} from '@chargebee/chargebee-js-react-wrapper'
import ChargebeeComponents from '@chargebee/chargebee-js-react-wrapper/dist/components/ComponentGroup'
import { PaymentIntent } from '@chargebee/chargebee-js-types'
import { usePayment } from '@/payment'
import { useApi, SubscriptionReceipts, useApiCall } from '@/api'
import { useAuth } from '@/auth'
import Modal from '@/components/Modal'
import Title from '@/components/Title'
import MainButton from '@/components/MainButton'
import Loader from '@/components/Loader'
import visa from './visa.svg'
import mastercard from './mastercard.svg'
import amex from './amex.svg'
import diners from './diners.svg'
import discover from './discover.svg'
import { cardStyles } from './styles'

interface CardModalProps {
  open: boolean
  onClose: () => void
  onSuccess: (receipt: SubscriptionReceipts.SubscriptionReceipt) => void
  onError: (error: Error) => void
}

interface Field {
  cardType: string | undefined
  complete: boolean
  empty: boolean
  error: Error | undefined
  field: 'number' | 'expiry' | 'cvv'
  key: string | undefined
  type: string
}

type Status = 'idle' | 'loading' | 'filling' | 'subscribing' | 'ready' | 'success' | 'error'

const initCompletedFields = {
  number: false,
  expiry: false,
  cvv: false,
}

type CompletedFields = typeof initCompletedFields

const isReady = (fields: CompletedFields) => Object.values(fields).every((complete: boolean) => complete)

const currencyCode = 'USD'
const paymentMethod = 'card'
const itemPriceId = 'aura-membership-2-week-USD'

export function CardModal({ open, onClose, onSuccess, onError }: CardModalProps): JSX.Element {
  const api = useApi()
  const cardRef = useRef<ChargebeeComponents>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [fields, setFields] = useState(initCompletedFields)
  const { token, user } = useAuth()
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const isInit = status === 'idle'
  const isLoading = status === 'loading'
  const { chargebee } = usePayment()
  const loadData = useCallback(() => {
    return api.createPaymentIntent({ token, paymentMethod, currencyCode })
      .then(({ payment_intent }) => payment_intent)
  }, [api, token])
  const { data, error } = useApiCall<PaymentIntent>(loadData)
  const handleReady = () => setStatus('filling')
  const handleClose = () => {
    setStatus('loading')
    onClose()
  }
  const handleChange = ({ field, complete, error }: ChangeEvent & Field) => {
    setFields((state) => ({ ...state, [field]: complete && !error }))
  }
  const payWithCard = () => {
    if (data === null) return
    setStatus('subscribing')
    cardRef.current?.authorizeWith3ds(data, { email: user?.email }, {})
      .then((paymentIntent: PaymentIntent) => {
        return api.createSubscriptionReceipt({ token, itemPriceId, gwToken: paymentIntent.id })
      })
      .then(({ subscription_receipt }: SubscriptionReceipts.Response) => {
        setStatus('success')
        onSuccess(subscription_receipt)
      })
      .catch((error: Error) => {
        setStatus('error')
        onError(error)
      })
  }

  if (error) console.error(error)

  useEffect(() => {
    if (status !== 'filling' && status !== 'ready' && status !== 'error') return
    setStatus(isReady(fields) ? 'ready' : 'filling')
  }, [fields, status])

  useEffect(() => {
    if (isInit) setStatus('loading')
  }, [isInit])

  return (
    <Modal open={open} onClose={handleClose}>
      { isLoading ? <div className='payment-loader'><Loader /></div> : null}
      <div style={{ display: isLoading ? 'none' : 'block' }}>
        <div className='payment-modal-header'>
          <Title variant='h3' className='mb-0'>{t('card')}</Title>
          <div className='payment-card-list'>
            <img src={visa} alt='Visa Card' />
            <img src={mastercard} alt='Mastercard Card' />
            <img src={amex} alt='Amex Card' />
            <img src={diners} alt='Diners Card' />
            <img src={discover} alt='Discover Card' />
          </div>
        </div>
        <Provider cbInstance={chargebee}>
          <CardComponent ref={cardRef} locale={locale} styles={cardStyles} onReady={handleReady}>
            <div className="payment-input"><CardNumber onChange={handleChange} /></div>
            <div className='payment-group'>
              <div className="payment-input"><CardExpiry onChange={handleChange} /></div>
              <div className="payment-input"><CardCVV onChange={handleChange} /></div>
            </div>
          </CardComponent>
        </Provider>
        <p className='payment-inforamtion'>{t('charged_only')}</p>
        <MainButton color='blue' onClick={payWithCard} disabled={status !== 'ready'}>
          { status === 'subscribing' ? <Loader /> : <><LockIcon />{t('start_trial')}</> }
        </MainButton>
      </div>
    </Modal>
  )
}

function LockIcon(): JSX.Element {
  return (
    <svg width="13" height="16" viewBox="0 0 13 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5556 6.24219H1.44444C0.6467 6.24219 0 6.97481 0 7.87855V13.6058C0 14.5096 0.6467 15.2422 1.44444 15.2422H11.5556C12.3533 15.2422 13 14.5096 13 13.6058V7.87855C13 6.97481 12.3533 6.24219 11.5556 6.24219Z"></path>
        <path fillRule="evenodd" clipRule="evenodd" d="M6.5 0.242188C4.29086 0.242188 2.5 2.03305 2.5 4.24219V8.24219H10.5V4.24219C10.5 2.03305 8.70914 0.242188 6.5 0.242188ZM6.5 1.24219C4.84315 1.24219 3.5 2.58533 3.5 4.24219V7.24219H9.5V4.24219C9.5 2.58533 8.15685 1.24219 6.5 1.24219Z"></path>
      </svg>
  )
}
