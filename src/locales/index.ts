import { Elements } from '../api'
import dev from './dev.ts'

export const getClientLocale = () => navigator.language.split('-')[0]
export const getClientTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone
export const fallbackLng = 'dev'

const omitKeys = ['href', 'title', 'url_slug', 'type']
const isWeb = (group: Elements.ElementGroup) => group.name === 'web'
const cleanUp = (element: Partial<Elements.ElementGroupItem> = {}) => {
  return Object.entries(element)
    .filter(([key]) => !omitKeys.includes(key))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
}
export const buildResources = (resp: Elements.Response) => {
  const element = resp.data.groups.find(isWeb)?.items.at(0)
  const translation = cleanUp(element)
  const lng = getClientLocale()
  return { [lng]: { translation }, dev }
}
