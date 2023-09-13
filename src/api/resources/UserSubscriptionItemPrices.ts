import routes from "@/routes"
import { AuthPayload } from "../types"
import { getAuthHeaders } from "../utils"

export interface Payload extends AuthPayload {
  locale: string
}

export interface Response {
  item_prices: ItemPrice[]
}

export interface ItemPrice {
  currency_code: string
  external_name: string
  free_quantity: number
  id: string
  is_taxable: boolean
  item_id: string
  item_type: string
  name: string
  object: string
  period: number
  period_unit: string
  price: number
  pricing_model: string
  resource_version: number
  status: string
  created_at: number
  updated_at: number
}

export const createRequest = ({ locale, token }: Payload): Request => {
  const url = new URL(routes.server.subscriptionItems())
  const query = new URLSearchParams({ locale })

  url.search = query.toString()

  return new Request(url, { method: 'GET', headers: getAuthHeaders(token) })
}
