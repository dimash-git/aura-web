import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PaymentIntent } from '@chargebee/chargebee-js-types'
import { useApi, useApiCall, extractErrorMessage, SubscriptionReceipts } from '@/api'
import { usePayment, ApplePayButtonOptions } from '@/payment'
import { useAuth } from '@/auth'
import Loader, { LoaderColor } from '@/components/Loader'
import ErrorText from '@/components/ErrorText'

const currencyCode = 'USD'
const paymentMethod = 'apple_pay'
const buttonId = 'apple-pay-btn'

interface ApplePayButtonProps {
  onSuccess: (receipt: SubscriptionReceipts.SubscriptionReceipt) => void
  onError: (error: Error) => void
}

export function ApplePayButton({ onSuccess, onError }: ApplePayButtonProps): JSX.Element {
  const api = useApi()
  const { i18n } = useTranslation()
  const { token } = useAuth()
  const { applePay } = usePayment()
  const [isMounting, setIsMounting] = useState<boolean>(true)
  const loadData = useCallback(() => {
    return api.createPaymentIntent({ token, paymentMethod, currencyCode })
      .then(({ payment_intent }) => payment_intent)
  }, [api, token])
  const { data, error, isPending } = useApiCall<PaymentIntent>(loadData)

  if (error) console.error(error)

  useEffect(() => {
    if (data === null) return
    const buttonOptions: ApplePayButtonOptions = {
      buttonColor: 'black',
      buttonType: 'plain',
      locale: i18n.language
    }
    applePay?.setPaymentIntent(data)
    applePay?.mountPaymentButton(`#${buttonId}`, buttonOptions)
      .then(() => setIsMounting(false))
      .then(() => applePay?.handlePayment())
      .then((paymentIntent) => {
        return api.createSubscriptionReceipt({
          token, receiptData: paymentIntent.id, autorenewable: true, sandbox: true,
        })
      })
      .then(({ subscription_receipt }: SubscriptionReceipts.Response) => onSuccess(subscription_receipt))
      .catch((error: Error) => onError(error))
  }, [data, applePay, i18n.language, api, token, onSuccess, onError])

  return (
    <div id={buttonId} className='pay-btn'>
      {isPending || isMounting ? <FakeApplePayButton /> : null}
      {error ? <ErrorText message={extractErrorMessage(error)} isShown={true} size='large'/> : null}
    </div>
  )
}

function FakeApplePayButton() {
  return (
    <div className='apple-pay-button-placeholder'>
      <Loader color={LoaderColor.White} />
    </div>
  )
}
