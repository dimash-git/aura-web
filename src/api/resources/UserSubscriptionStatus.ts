import routes from "@/routes"
import { AuthPayload } from "../types"
import { getAuthHeaders } from "../utils"

export type Payload = AuthPayload

export interface Response {
  user: {
    has_subscription: boolean
  }
}

export const createRequest = ({ token }: Payload): Request => {
  const url = new URL(routes.server.subscriptionStatus())
  return new Request(url, { method: 'GET', headers: getAuthHeaders(token) })
}
