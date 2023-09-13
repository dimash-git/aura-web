import routes from "@/routes"
import { AuthToken } from "../types"
import { User } from "./User"
import { getBaseHeaders } from "../utils"

export interface Payload {
  email: string
  timezone: string
  locale: string
}

export interface Response {
  auth: {
    token: AuthToken
    payload: JwtPayload
    user: User
  }
}

export interface JwtPayload {
  sub: number
  email: string
  loc: string
  tz: number
  state: string
  iat: number
  exp: number
  jti: string
  type: string
  iss: string
}

export const createRequest = ({ locale, timezone, email }: Payload): Request => {
  const url = new URL(routes.server.token())
  const body = JSON.stringify({ auth: { locale, timezone, email }})
  return new Request(url, { method: 'POST', headers: getBaseHeaders(), body })
}
