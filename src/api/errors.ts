export interface FullDomainError {
  title: string
  message?: string
  detail?: string
  source?: {
    pointer: string
    parameter: string
  }
}

export type ShortDomainError = FullDomainError['title']

export interface BaseDomainError {
  base: ShortDomainError[]
}

export interface ErrorListResponse {
  errors: BaseDomainError | FullDomainError[] | ShortDomainError[]
}

export interface SingleErrorResponse {
  error: ShortDomainError
}

export type ErrorResponse = ErrorListResponse | SingleErrorResponse

export type ErrorPayload = {
  body: ErrorResponse
  statusCode: number
}

export type MaybeError = ShortDomainError | FullDomainError | undefined

export const buildUnknownError = (statusCode: number) => `Unknown Error occurred from Server with status code ${statusCode}`

export class ApiError extends Error {
  readonly body: ErrorResponse
  readonly statusCode: number
  constructor(payload: ErrorPayload) {
    super('Caught an error while fetching the API Server endpoint...')
    this.name = 'ApiError'
    this.body = payload.body
    this.statusCode = payload.statusCode
  }
}

export function isErrorResponse<R>(data: R | ErrorResponse): data is ErrorResponse {
  return isSingleErrorResponse<R>(data) || isErrorListResponse<R>(data)
}

export function isSingleErrorResponse<R>(data: R | ErrorResponse): data is SingleErrorResponse {
  return typeof data === 'object' && data !== null && 'error' in data
}

export function isErrorListResponse<R>(data: R | ErrorResponse): data is ErrorListResponse {
  return typeof data === 'object' && data !== null && 'errors' in data
}

export function isShortDomainError(error: MaybeError): error is ShortDomainError {
  return typeof error === 'string'
}

export function extractErrorMessage(apiError: ApiError): string {
  const body = isSingleErrorResponse(apiError.body) ? [apiError.body.error] : apiError.body.errors
  const errors = Array.isArray(body) ? body : body.base
  const firstError = errors.at(0)
  if (firstError === undefined) {
    return buildUnknownError(apiError.statusCode)
  }
  if (isShortDomainError(firstError)) {
    return firstError
  }
  if ('message' in firstError && firstError.message) {
    return firstError.message
  }
  return firstError.title
}
