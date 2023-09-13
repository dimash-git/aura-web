import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useApi, useApiCall, Element } from '@/api'
import { useCallback } from 'react'
import parse from 'html-react-parser'
import Loader from '../Loader'
import NotFoundPage from '../NotFoundPage'
import './styles.css'

function StaticPage(): JSX.Element {
  const { i18n } = useTranslation()
  const { typeId } = useParams()
  const api = useApi()
  const locale = i18n.language
  const loadData = useCallback(() => {
    const type = typeId || ''
    return api.getElement({ type, locale })
      .then((resp: Element.Response) => resp.data.element)
  }, [api, typeId, locale])
  const { data, isPending, error } = useApiCall<Element.Element>(loadData)
  const content = data ? parse(data.body) : null

  return (
    <section className='page page-static'>
      {isPending ? <Loader /> : <div className='page-static__content'>{content}</div>}
      {error && <NotFoundPage />}
    </section>
  )
}

export default StaticPage
