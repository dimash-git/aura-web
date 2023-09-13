import { Elements } from '../api'
import { createContext } from 'react'

export type LegalContextValue = Elements.ElementGroupItem

export const LegalContext = createContext<LegalContextValue[]>([])
