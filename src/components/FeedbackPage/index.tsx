import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import routes from '@/routes'
import styles from './styles.module.css'
import MainButton from '../MainButton'

function FeedbackPage(): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const handleNext = () => navigate(routes.client.emailEnter())

  return (
    <section className={`${styles.page} page`}>
      <div className={styles.images}>
        <img className={styles['profile-picture']} src="/profile-picture-feedback.png" alt="profile picture" />
        <img className={styles.stars} src="/5-stars.png" alt="stop" />
      </div>
      <p className={styles.text}>{t('feedback')}</p>
      <MainButton onClick={handleNext}>
        {t('next')}
      </MainButton>
    </section>
  )
}

export default FeedbackPage
