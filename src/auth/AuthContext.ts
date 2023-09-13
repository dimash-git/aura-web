import { createContext } from 'react'
import { AuthToken, User } from '../api'

export interface AuthContextValue {
  user: User.User | null
  token: AuthToken
  logout: () => void
  signUp: (token: AuthToken, user: User.User) => AuthToken
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)
