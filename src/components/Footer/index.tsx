import { useTranslation } from 'react-i18next'
import './styles.css'

type FooterProps = {
  color?: 'white' | 'black'
}

function Footer({ color = 'white' }: FooterProps): JSX.Element {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  const combinedClassNames = ['page-footer', `page-footer--${color}`].filter(Boolean).join(' ')
  return (
    <footer className={combinedClassNames}>
      <p>&copy; {year}, {t('company_name')}</p>
    </footer>
  )
}

export default Footer
