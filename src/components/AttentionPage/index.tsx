import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Title from '../Title'
import routes from '@/routes'
import styles from './styles.module.css'
import CheckboxWithText from '../CheckboxWithText'
import SpecialWelcomeOffer from '../SpecialWelcomeOffer'

interface AttentionPageProps {
  isOpenModal: boolean
  onCloseSpecialOffer?: () => void
}

function AttentionPage({ isOpenModal, onCloseSpecialOffer }: AttentionPageProps): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const handleNext = () => navigate(routes.client.feedback())

  const onChangeCheckbox = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      handleNext()
    }
  }

  return (
    <section className={`${styles.page} page`}>
      <SpecialWelcomeOffer open={isOpenModal} onClose={onCloseSpecialOffer} />
      <img className={styles.icon} src="/stop-icon.png" alt="stop" />
      <Title variant='h2'>{t('attention')}</Title>
      <p className={styles.text}>{t('attention_page_text')}</p>
      <div className={styles['checkbox-container']}>
        <CheckboxWithText text={t('not_ready_for_information')} onChange={onChangeCheckbox} />
      </div>
    </section>
  )
}

export default AttentionPage
