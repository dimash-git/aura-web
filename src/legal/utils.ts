import { Elements } from '../api'

const isMain = (element: Elements.ElementGroup) => element.name === 'main'
export const buildLegal = (resp: Elements.Response): Elements.ElementGroupItem[] => {
  const element = resp.data.groups.find(isMain)
  return element?.items || []
}
