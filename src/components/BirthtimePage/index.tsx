import { useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { actions, selectors } from '@/store'
import { TimePicker } from "../DateTimePicker"
import Title from "../Title"
import MainButton from "../MainButton"
import routes from "@/routes"
import './styles.css'

function BirthtimePage(): JSX.Element {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const birthtime = useSelector(selectors.selectBirthtime)
  const handleNext = () => navigate(routes.client.createProfile())
  const handleChange = (value: string) => dispatch(actions.form.addTime(value))
  return (
    <section className='page'>
      <Title variant="h2" className="mt-24">{t('born_time_question')}</Title>
      <p className="description">{t('nasa_data_using')}</p>
      <TimePicker value={birthtime} onChange={handleChange}/>
      <MainButton onClick={handleNext}>{t('next')}</MainButton>
    </section>
  )
}

export default BirthtimePage
