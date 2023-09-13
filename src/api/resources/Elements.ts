import routes from "@/routes"
import { getBaseHeaders } from "../utils"

export interface Payload {
  locale: string
}

export interface Response {
  data: {
    variant: string
    groups: ElementGroup[]
  }
}

export interface ElementGroup {
  name: string
  items: ElementGroupItem[]
}

export interface ElementGroupItem {
  type: string
  href: string
  title: string
  url_slug: string
  [key: string]: string
}

export const createRequest = ({ locale }: Payload): Request => {
  const url = new URL(routes.server.elements())
  const query = new URLSearchParams({ locale })

  url.search = query.toString()

  return new Request(url, { method: 'GET', headers: getBaseHeaders() })
}
