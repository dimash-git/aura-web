import routes from "@/routes"
import { AuthPayload } from "../types"
import { getAuthHeaders } from "../utils"

export interface GetPayload extends AuthPayload {
  id: string
}

export interface ChargebeeReceiptPayload extends AuthPayload {
  itemPriceId: string
  gwToken: string
  referenceId?: string
}

export interface AppleReceiptPayload extends AuthPayload {
  receiptData: string
  autorenewable?: boolean
  sandbox?: boolean
}

export type Payload = ChargebeeReceiptPayload | AppleReceiptPayload

export interface Response {
  subscription_receipt: SubscriptionReceipt
}

export interface SubscriptionReceipt {
  id: string
  user_id: number
  status: number
  expires_at: null | string
  requested_at: string
  created_at: string
  data: {
    input: {
      subscription_items: [
        {
          item_price_id: string
        }
      ],
      payment_intent: {
        gw_token: string
        gateway_account_id: string
      }
    },
    app_bundle_id: string
    autorenewable: boolean
    error: string
  }
}

function createRequest({ token, itemPriceId, gwToken, referenceId }: ChargebeeReceiptPayload): Request
function createRequest({ token, receiptData, autorenewable = true, sandbox = true }: AppleReceiptPayload): Request
function createRequest(payload: Payload): Request
function createRequest(payload: Payload): Request {
  const url = new URL(routes.server.subscriptionReceipts())
  const data = isChargebeeReceipt(payload) ? {
    way: 'chargebee',
    subscription_receipt: {
      item_price_id: payload.itemPriceId,
      gw_token: payload.gwToken,
      reference_id: payload.referenceId,
    }
  } : {
    way: 'apple',
    subscription_receipt: {
      receipt_data: payload.receiptData,
      autorenewable: payload.autorenewable,
      sandbox: payload.sandbox,
    }
  }
  const body = JSON.stringify(data)
  return new Request(url, { method: 'POST', headers: getAuthHeaders(payload.token), body })
}

function isChargebeeReceipt(payload: Payload ): payload is ChargebeeReceiptPayload {
  return 'itemPriceId' in payload && 'gwToken' in payload
}

function createGetRequest({ id, token }: GetPayload): Request {
  const url = new URL(routes.server.subscriptionReceipt(id))
  return new Request(url, { method: 'GET', headers: getAuthHeaders(token) })
}

export { createRequest, createGetRequest }
