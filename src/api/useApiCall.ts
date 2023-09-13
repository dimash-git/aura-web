import { useState, useEffect } from 'react'
import { ApiError } from './errors'

interface HookResult<T> {
  data: T | null
  error: ApiError | null
  isPending: boolean
  state: ApiCallState
}

type ApiMethod<T> = () => Promise<T>
type ApiCallState = 'idle' | 'pending' | 'success' | 'error'

export function useApiCall<T>(apiMethod: ApiMethod<T>): HookResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<ApiError | null>(null)
  const [state, setState] = useState<ApiCallState>('idle')
  const isPending = state === 'pending'

  useEffect(() => {
    setState('pending')
    apiMethod()
      .then((data: T) => {
        setData(data)
        setState('success')
      })
      .catch((error: ApiError) => {
        setError(error)
        setState('error')
      })
  }, [apiMethod])

  return { isPending, error, data, state }
}
