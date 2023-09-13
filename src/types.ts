import { Chargebee } from '@chargebee/chargebee-js-types'

declare global {
  interface Window {
    Chargebee: typeof Chargebee
  }
}

export interface FormField<T> {
  name: string
  value: T
  label?: string | null
  placeholder?: string | null
  inputClassName?: string
  onValid: (value: string) => void
  onInvalid: () => void
}

export interface SignupForm {
  email: string
  birthdate: string
  birthtime: string
}

export type UserStatus = 'lead' | 'registred' | 'subscribed' | 'unsubscribed'
