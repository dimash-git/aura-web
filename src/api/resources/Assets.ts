import routes from "@/routes"
import { AssetCategory } from "./AssetCategories"
// import { AuthPayload } from "../types"
// import { getAuthHeaders } from "../utils"

// export interface Payload extends AuthPayload {
export interface Payload {
  category: string
  page?: number
  perPage?: number
}

export interface Response {
  asset_category: AssetCategory
  assets: Asset[]
}

export interface Asset {
  id: string
  url: string
  asset_data: AssetData
}

export interface AssetData {
  id: string
  storage: string
  metadata: AssetMetadata
}

export interface AssetMetadata {
  size: number
  width: number
  height: number
  filename: string
  mime_type: string
}

export const createRequest = ({ category, page, perPage }: Payload): Request => {
  const url = new URL(routes.server.assets(category))
  const query = new URLSearchParams()

  if (page && perPage) {
    query.append('page', page.toString())
    query.append('per_page', perPage.toString())
  }

  url.search = query.toString()

  return new Request(url, { method: 'GET' })
}
