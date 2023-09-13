import routes from "@/routes"
// import { AuthPayload } from "../types"
// import { getAuthHeaders } from "../utils"

export interface Payload {
  locale: string
}

export interface Response {
  asset_categories: AssetCategory[]
}

export interface AssetCategory {
  id: number
  name: string
  slug: string
  path: string
}

export const createRequest = ({ locale }: Payload): Request => {
  const url = new URL(routes.server.assetCategories())
  const query = new URLSearchParams({ locale })

  url.search = query.toString()

  return new Request(url, { method: 'GET' })
}
