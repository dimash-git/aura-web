import { useTranslation } from 'react-i18next'
import './styles.css'

function CallToAction(): JSX.Element {
  const { t } = useTranslation()
  return (
    <div className='call-to-action mb-24'>
      <h1>{t('cta_title')}</h1>
      <p>{t('cta_subtitle')}</p>
    </div>
  )
}

export default CallToAction
