import routes from '@/routes'
import { getBaseHeaders } from '../utils'

export interface Payload {
  locale: string
  type: string
}

export interface Response {
  data: {
    variant: string
    element: Element
  }
}

export interface Element {
  type: string
  href: string
  title: string
  url_slug: string
  body: string
}

export const createRequest = ({ locale, type }: Payload): Request => {
  const url = new URL(routes.server.element(type))
  const query = new URLSearchParams({ locale })

  url.search = query.toString()

  return new Request(url, { method: 'GET', headers: getBaseHeaders() })
}
