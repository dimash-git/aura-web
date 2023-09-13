import { createContext } from 'react'
import type { ApiContextValue } from './api'

export const ApiContext = createContext<ApiContextValue>({} as ApiContextValue)
