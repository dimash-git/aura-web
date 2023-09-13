import routes from "@/routes"
import { AuthPayload } from "../types"
import { getAuthHeaders } from "../utils"

export interface Payload extends AuthPayload {
  embed?: boolean
  locale: string
  itemPriceId: string
}

export interface Response {
  hosted_page: string
}

export interface HostedPage {
  id: string
  url: string
  embed: boolean
  type: string
  object: string
  state: string
  resource_version: number
  created_at: number
  updated_at: number
  expires_at: number
}

export const createRequest = ({ locale, token, itemPriceId, embed = false }: Payload): Request => {
  const url = new URL(routes.server.subscriptionCheckout())
  const query = new URLSearchParams({ locale, item_price_id: itemPriceId, embed: embed.toString() })

  url.search = query.toString()

  return new Request(url, { method: 'GET', headers: getAuthHeaders(token) })
}
