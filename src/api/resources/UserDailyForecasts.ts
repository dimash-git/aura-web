import routes from "@/routes"
import { AuthPayload } from "../types"
import { getAuthHeaders } from "../utils"

export type Payload = AuthPayload

export interface Response {
  user_daily_forecast: UserDailyForecast
}

export interface UserDailyForecast {
  day: string
  updated_at: string
  viewed_at: string | null
  sign_id: number
  forecasts: Forecast[]
}

export interface Forecast {
  category_name: string
  category: string
  body: string
}

export const createRequest = ({ token }: Payload): Request => {
  const url = new URL(routes.server.dailyForecasts())
  return new Request(url, { method: 'GET', headers: getAuthHeaders(token) })
}
