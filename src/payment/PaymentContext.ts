import { createContext } from 'react'
import { ChargebeeInstance } from '@chargebee/chargebee-js-types'

export const PaymentContext = createContext<ChargebeeInstance>({} as ChargebeeInstance)
