import routes from "@/routes"
import { AuthPayload } from "../types"
import { getAuthHeaders } from "../utils"

export type GetPayload = AuthPayload

export interface PatchPayload extends AuthPayload {
  user: Partial<UserPatch>
}

export interface Response {
  user: User
  meta?: {
    links: {
      self: string
    }
  }
}

export interface UserPatch {
  locale: string
  timezone: string
  profile_attributes: Partial<Pick<UserProfile, 'gender' | 'full_name' | 'relationship_status' | 'birthday'> & {
    birthplace_id: null
    birthplace_attributes: {
      address?: string
      coords?: string
    },
    remote_userpic_url: string
  }>
  daily_push_subs_attributes: [{
    time: string
    daily_push_id: string
  }]
}

export interface User {
  id: string | null | undefined
  username: string | null
  email: string
  locale: string
  state: string
  timezone: string
  new_registration: boolean
  stat: {
    last_online_at: string | null
    prev_online_at: string | null
  }
  profile: UserProfile
  daily_push_subs: Subscription[]
}

export interface UserProfile {
  full_name: string | null
  gender: string | null
  birthday: string | null
  birthplace: UserBirhplace | null
  age: UserAge | null
  sign: UserSign | null
  userpic: UserPic | null
  userpic_mime_type: string | undefined
  relationship_status: string
  human_relationship_status: string
}

export interface UserAge {
  years: number
  days: number
}

export interface UserSign {
  house: number
  ruler: string
  dates: {
    start: {
      month: number
      day: number
    }
    end: {
      month: number
      day: number
    }
  }
  sign: string
  char: string
  polarity: string
  modality: string
  triplicity: string
}

export interface UserPic {
  th: string
  th2x: string
  lg: string
}

export interface UserBirhplace {
  id: string
  address: string
  coords: string
}

export interface Subscription {
  id: string
  daily_push_id: string
  time: string
  updated_at: string
  created_at: string
  last_sent_at: string | null
}

export const createGetRequest = ({ token }: GetPayload): Request => {
  const url = new URL(routes.server.user())
  return new Request(url, { method: 'GET', headers: getAuthHeaders(token) })
}

export const createPatchRequest = ({ token, user }: PatchPayload): Request => {
  const url = new URL(routes.server.user())
  const body = JSON.stringify({ user })
  return new Request(url, { method: 'PATCH', headers: getAuthHeaders(token), body })
}
