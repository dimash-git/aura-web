import { useContext, useEffect, useState } from 'react'
import { PaymentContext } from './PaymentContext'
import { ApplePayHandler, GooglePayHandler } from './types'

export const usePayment = () => {
  const chargebee = useContext(PaymentContext)
  const [googlePay, setGooglePay] = useState<GooglePayHandler>(null)
  const [applePay, setApplePay] = useState<ApplePayHandler>(null)

  useEffect(() => {
    Promise.all([
      chargebee.load('google-pay'),
      chargebee.load('apple-pay'),
    ]).then(([googlePay, applePay]) => {
      setGooglePay(googlePay)
      setApplePay(applePay)
    })
  }, [chargebee])

  return { chargebee, googlePay, applePay }
}
