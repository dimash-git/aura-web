import { PaymentIntent } from '@chargebee/chargebee-js-types'
import { AuthPayload } from '../types'
import { getAuthHeaders } from '../utils'
import routes from '@/routes'

export interface Payload extends AuthPayload {
  paymentMethod: PaymentMethod
  currencyCode: CurrencyCode
}

export interface Response {
  payment_intent: PaymentIntent
  customer: Customer
}

export type PaymentMethod = 'apple_pay' | 'google_pay' | 'card'
export type CurrencyCode = 'USD'

export interface Customer {
  id: string
  email: string
  auto_collection: 'on' | 'off'
  net_term_days: number
  allow_direct_debit: boolean
  taxability: 'taxable' | 'exempt'
  created_at: number
  updated_at: number
  pii_cleared: 'active' | 'scheduled_for_clear' | 'cleared'
  channel: 'web' | 'app_store' | 'play_store'
  resource_version: number
  deleted: boolean
  card_status: 'no_card' | 'valid' | 'expiring' | 'expired'
  promotional_credits: number
  refundable_credits: number
  excess_payments: number
  unbilled_charges: number
  preferred_currency_code: CurrencyCode
}

export const createRequest = ({ token, paymentMethod, currencyCode }: Payload): Request => {
  const url = new URL(routes.server.paymentIntents())
  const body = JSON.stringify({
    payment_intent: {
      payment_method_type: paymentMethod,
      currency_code: currencyCode,
    }
  })
  return new Request(url, { method: 'POST', headers: getAuthHeaders(token), body })
}
