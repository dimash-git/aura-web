import { useTranslation } from 'react-i18next'
import './styles.css'

function Purposes(): JSX.Element {
  const { t } = useTranslation()
  return <small className="purposes">{t('purposes')}</small>
}

export default Purposes
