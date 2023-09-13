import { AuthToken } from './types'
import { ErrorResponse, isErrorResponse, ApiError, buildUnknownError } from './errors'

export function createMethod<P, R>(createRequest: (payload: P) => Request) {
  return async (payload: P): Promise<R> => {
    const request = createRequest(payload)
    const response = await fetch(request)
    const data: R | ErrorResponse = await response.json()
    const statusCode = response.status

    if (!response.ok) {
      const body = isErrorResponse<R>(data) ? data : { error: buildUnknownError(statusCode) }
      throw new ApiError({ body, statusCode })
    }

    if (isErrorResponse<R>(data)) {
      throw new ApiError({ body: data, statusCode })
    }

    return data
  }
}

export function getBaseHeaders(): Headers {
  return new Headers({
    'Content-Type': 'application/json',
  })
}

export function getAuthHeaders(token: AuthToken): Headers {
  const headers = getBaseHeaders()
  headers.append('Authorization', `Bearer ${token}`)
  return headers
}
