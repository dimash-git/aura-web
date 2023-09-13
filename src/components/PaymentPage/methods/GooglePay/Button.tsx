import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PaymentIntent } from '@chargebee/chargebee-js-types'
import { SubscriptionReceipts, extractErrorMessage, useApi, useApiCall } from '@/api'
import { usePayment, GooglePayButtonOptions } from '@/payment'
import { useAuth } from '@/auth'
import Loader, { LoaderColor } from '@/components/Loader'
import ErrorText from '@/components/ErrorText'

const currencyCode = 'USD'
const paymentMethod = 'google_pay'
const buttonId = 'google-pay-btn'

interface GooglePayButtonProps {
  onSuccess: (receipt: SubscriptionReceipts.SubscriptionReceipt) => void
  onError: (error: Error) => void
}

export function GooglePayButton({ onSuccess, onError }: GooglePayButtonProps): JSX.Element {
  const api = useApi()
  const { i18n } = useTranslation()
  const { token } = useAuth()
  const { googlePay } = usePayment()
  const [isMounting, setIsMounting] = useState<boolean>(true)
  const loadData = useCallback(() => {
    return api.createPaymentIntent({ token, paymentMethod, currencyCode })
      .then(({ payment_intent }) => payment_intent)
  }, [api, token])
  const { data, error, isPending } = useApiCall<PaymentIntent>(loadData)

  if (error) console.error(error)

  useEffect(() => {
    if (data === null) return
    const buttonOptions: GooglePayButtonOptions = {
      buttonColor: 'black',
      buttonType: 'plain',
      buttonLocale: i18n.language,
      buttonSizeMode: 'fill',
    }
    googlePay?.setPaymentIntent(data)
    googlePay?.mountPaymentButton(`#${buttonId}`, buttonOptions)
      .then(() => setIsMounting(false))
      .then(() => googlePay?.handlePayment())
      .then((result) => {
        console.log('Success payment by GooglePay', result)
        // TODO: implement api.createSubscriptionReceipt for GooglePay
      })
      .then(() => onSuccess({} as SubscriptionReceipts.SubscriptionReceipt))
      .catch((error: Error) => onError(error))
  }, [data, googlePay, i18n.language, onSuccess, onError])

  return (
    <div id={buttonId} className='pay-btn'>
      {isPending || isMounting ? <FakeGPayButton /> : null}
      {error ? <ErrorText message={extractErrorMessage(error)} isShown={true} size='large'/> : null}
    </div>
  )
}

function FakeGPayButton() {
  return (
    <div className='gpay-button-fake-loader'>
      <Loader color={LoaderColor.White} />
    </div>
  )
}
