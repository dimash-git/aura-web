import { useTranslation } from 'react-i18next'
import './styles.css'

function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <div className='not-found-page'>
      <h1>{t('oops')}</h1>
      <p>{t('unexpected_error')}</p>
    </div>
  )
}

export default NotFoundPage
