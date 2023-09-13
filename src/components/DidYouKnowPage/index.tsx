import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import MainButton from  '../MainButton'
import Title from '../Title'
import routes from '@/routes'
import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import { selectors } from '@/store'
import { getZodiacSignByDate } from '@/services/zodiac-sign'
import SpecialWelcomeOffer from '../SpecialWelcomeOffer'
import { useState } from 'react'

function DidYouKnowPage(): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const handleNext = () => navigate(routes.client.freePeriodInfo())
  const [isOpenModal, setIsOpenModal] = useState(false)
  const handleSpecialOffer = () => {
    setIsOpenModal(true)
  }
  const birthdate = useSelector(selectors.selectBirthdate)
  const zodiacSign = getZodiacSignByDate(birthdate)
  

  return (
    <section className={`${styles.page} page`}>
      <SpecialWelcomeOffer open={isOpenModal} />
      <div className={styles.content}>
        <Title variant='h1'>{t('did_you_know')}</Title>
        <p className={styles.zodiacInfo}>
            {t('zodiac_sign_info', { zodiacSign })}
        </p>
      </div>
      <footer className={styles.footer}>
        <MainButton onClick={handleNext}>
            {t('learn_about_my_energy')}
        </MainButton>
        <span className={styles.skip} onClick={handleSpecialOffer}>{t('skip_for_now')}</span>
      </footer>
    </section>
  )
}

export default DidYouKnowPage
