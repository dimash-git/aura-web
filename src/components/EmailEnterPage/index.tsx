import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { actions, selectors } from '@/store'
import { getClientTimezone } from '@/locales'
import { useAuth } from '@/auth'
import { useApi, ApiError, extractErrorMessage } from '@/api'
import Title from '../Title'
import Policy from '../Policy'
import EmailInput from './EmailInput'
import MainButton from '../MainButton'
import Loader, { LoaderColor } from '../Loader'
import ErrorText from '../ErrorText'
import routes from '@/routes'

function EmailEnterPage(): JSX.Element {
  const api = useApi()
  const { user, signUp } = useAuth()
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const email = useSelector(selectors.selectEmail)
  const birthday = useSelector(selectors.selectBirthday)
  const [isDisabled, setIsDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)
  const timezone = getClientTimezone()
  const locale = i18n.language
  const handleValidEmail = (email: string) => {
    dispatch(actions.form.addEmail(email))
    setIsDisabled(false)
  }
  const handleClick = () => {
    // TODO: fix backend error 422 auth with email
    return navigate(routes.client.priceList())
    if (user) {
      return
    }
    setError(null)
    setIsLoading(true)
    api.auth({ email, timezone, locale })
      .then(({ auth: { token, user } }) => signUp(token, user))
      .then((token) => {
        const payload = { user: { profile_attributes: { birthday } }, token }
        return Promise.all([
          api.updateUser(payload),
          api.getSubscriptionItems({ locale, token })
        ])
      })
      .then(([{ user }, { item_prices }]) => {
        dispatch(actions.user.update(user))
        dispatch(actions.status.update('registred'))
        dispatch(actions.subscriptionPlan.setAll(item_prices))
      })
      .then(() => navigate(routes.client.subscription()))
      .catch((error: ApiError) => setError(error))
      .finally(() => setIsLoading(false))
  }


  return (
    <section className='page'>
      <Title variant='h2' className='mt-24'>{t('we_will_email_you')}</Title>
      <EmailInput
        name="email"
        value={email}
        placeholder={t('your_email')}
        onValid={handleValidEmail}
        onInvalid={() => setIsDisabled(true)}
      />
      <p>{t('we_dont_share')}</p>
      <Policy sizing='medium'>
        {t('continue_agree', {
          eulaLink: <a href='https://aura.wit.life/terms' target='_blank' rel='noopener noreferrer'>{t('eula')}</a>,
          privacyLink: <a href='https://aura.wit.life/privacy' target='_blank' rel='noopener noreferrer'>{t('privacy_policy')}</a>,
        })}
      </Policy>
      <MainButton onClick={handleClick} disabled={isDisabled}>
        {isLoading ? <Loader color={LoaderColor.White} /> : t('continue')}
      </MainButton>
      <ErrorText size='medium' isShown={Boolean(error)} message={error ? extractErrorMessage(error) : null} />
    </section>
  )
}

export default EmailEnterPage
