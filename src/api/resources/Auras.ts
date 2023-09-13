import routes from "@/routes"
import { AuthPayload } from "../types"
import { getAuthHeaders } from "../utils"

export type Payload = AuthPayload

export interface Response {
  user_aura: UserAura
}

export interface UserAura {
  updated_at: string
  viewed_at: string | null
  aurapic: string | null
  stats: UserAuraStat[]
  config: UserAuraConfig
}

export interface UserAuraStat {
  stat: string
  value: number
  label: string
}

export interface UserAuraConfig {
  birthRate: number
  imageURL: string
  particleIntensity: number
  particleIntensityVariation: number
  particleLifeSpan: number
  particleSize: number
  particleSizeVariation: number
  particleVelocity: number
  speedFactor: number
  spreadingAngle: number
  stretchFactor: number
  holes: [{
    from: number
    to: number
  }]
  animations: {
    [key: string]: {
      keyTimes: number[]
      values: number[]
    }
  }
}

export const createRequest = ({ token }: Payload): Request => {
  const url = new URL(routes.server.auras())
  return new Request(url, { method: 'GET', headers: getAuthHeaders(token) })
}
