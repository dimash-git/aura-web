import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, selectors } from '../store'
import { AuthToken, User } from '../api'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: React.PropsWithChildren<unknown>): JSX.Element {
  const dispatch = useDispatch()
  const token = useSelector(selectors.selectToken)
  const user = useSelector(selectors.selectUser)
  const signUp = useCallback((token: AuthToken, user: User.User): AuthToken => {
    dispatch(actions.token.update(token))
    dispatch(actions.user.update(user))
    return token
  }, [dispatch])
  const logout = useCallback(() => dispatch(actions.reset()), [dispatch])
  const auth = useMemo(() => ({
    signUp,
    logout,
    token,
    user: user.id ? user : null
  }), [token, user, signUp, logout])
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}
