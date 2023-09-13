import { PaymentIntent } from '@chargebee/chargebee-js-types'

interface Handler {
  handlePayment: () => Promise<PaymentIntent>
  setPaymentIntent: (paymentIntent: PaymentIntent) => void
}

export interface GooglePayButtonOptions {
  buttonColor: 'default' | 'black' | 'white'
  buttonType: 'long' | 'short' | 'book' | 'buy' | 'checkout' | 'donate' | 'order' | 'pay' | 'plain' | 'subscribe'
  buttonSizeMode: 'static' | 'fill'
  buttonLocale: string
}

export interface PaymentOptions {
  requestPayerEmail: boolean
  requestBillingAddress: boolean
  requestShippingAddress: boolean
}

export interface ApplePayButtonOptions {
  locale: string
  buttonColor: 'black' | 'white' | 'white-outline'
  buttonType: 'add-money' | 'book' | 'buy' | 'check-out' | 'continue' | 'contribute' | 'donate' | 'order' | 'pay' | 'plain' | 'reload' | 'rent' | 'set-up' | 'subscribe' | 'support' | 'tip' | 'top-up'
}

interface ApplePay extends Handler {
  canMakePayments: () => boolean
  mountPaymentButton: (selector: string, options?: ApplePayButtonOptions) => Promise<void>
}

interface GooglePay extends Handler {
  getPaymentIntent: () => PaymentIntent
  updatePaymentIntent: (paymentIntent: PaymentIntent) => void
  mountPaymentButton: (
    selector: string,
    buttonOptions?: GooglePayButtonOptions,
    paymentOptions?: PaymentOptions
  ) => Promise<void>
}

export type ApplePayHandler = ApplePay | null
export type GooglePayHandler = GooglePay | null
