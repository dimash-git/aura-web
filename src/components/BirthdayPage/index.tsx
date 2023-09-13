import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { actions, selectors } from '@/store'
import { DatePicker } from '../DateTimePicker'
import MainButton from  '../MainButton'
import Policy from '../Policy'
import Purposes from '../Purposes'
import Title from '../Title'
import routes from '@/routes'
import './styles.css'

function BirthdayPage(): JSX.Element {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const birthdate = useSelector(selectors.selectBirthdate)
  const [isDisabled, setIsDisabled] = useState(true)
  const handleNext = () => navigate(routes.client.didYouKnow())
  const handleValid = (birthdate: string) => {
    dispatch(actions.form.addDate(birthdate))
    setIsDisabled(birthdate === '')
  }

  return (
    <section className='page'>
      <Title variant='h3' className='mt-24'>{t('lets_start')}</Title>
      <Title variant='h2'>{t('date_of_birth')}</Title>
      <DatePicker
        name='birthdate'
        value={birthdate}
        onValid={handleValid}
        onInvalid={() => setIsDisabled(true)}
      />
      <MainButton onClick={handleNext} disabled={isDisabled}>
        {t('next')}
      </MainButton>
      <footer className='footer'>
        <Policy>
          {t('privacy_text', {
            eulaLink: <a href='https://aura.wit.life/terms' target='_blank' rel='noopener noreferrer'>{t('eula')}</a>,
            privacyLink: <a href='https://aura.wit.life/privacy' target='_blank' rel='noopener noreferrer'>{t('privacy_notice')}</a>,
            clickHere: <a href='https://aura.wit.life/' target='_blank' rel='noopener noreferrer'>{t('here')}</a>,
          })}
        </Policy>
        <Purposes />
      </footer>
    </section>
  )
}

export default BirthdayPage
