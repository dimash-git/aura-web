import routes from '@/routes'
import { getBaseHeaders } from '../utils'

export interface Payload {
  bundleId: 'com.life.aura' | 'com.life.gusebamps' | 'auraweb'
}

export interface Response {
  data: {
    subscription_popup: boolean
    locale: string
    alerts: Alert
    active_iaps: ActiveIAps[]
    version: string
    apple_music_api: AppleMusicApi
    chargebee: ChargebeeConfig
    first_open_subscription_popup: boolean
    runs_before_subscription_popup: number
    appirater_alerts: AppiraterAlertAppiraterAlert[]
  }
}

export interface ActiveIAps {
  bundle_id:	string
  active:	boolean
  subscription_type: 'trial' | 'monthly' | 'yearly'
}

export interface AppiraterAlertAppiraterAlert {
  id: string
  type: string
  body: string
  label: string
  cancel: string
  title: string
  uses_until_prompt: string
  days_until_prompt: string
  time_before_reminding: string
  significant_events_until_prompt: string
  show: boolean
  apple_id: string
  appirater_link: string
  appirater_pro_link: string
}

export interface Alert {
  description: string
}

export interface AppleMusicApi {
  jwt: string
}

export interface ChargebeeConfig {
  site: string
  publishableKey: string
  gatewayAccountId: string
}

export const createRequest = ({ bundleId }: Payload): Request => {
  const url = new URL(routes.server.apps(bundleId))
  return new Request(url, { method: 'GET', headers: getBaseHeaders() })
}
