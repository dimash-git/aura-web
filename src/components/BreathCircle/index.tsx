import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import routes from '@/routes'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function BreathCircle(): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [text, setText] = useState(t(''))
  const [counter, setCounter] = useState(0)
  const handleNext = () => navigate(routes.client.breathResult())
  
  
  useEffect(() => {
    Promise.resolve()
      .then(() => {
        setText(t('breathIn'))
        return sleep(4000)
      })
      .then(() => {
        setText(t('hold'))
        return sleep(2000)
      })
      .then(() => {
        setText(t('breathOut'))
        return sleep(4000)
      })
      .then(() => {
        setCounter((prevState) => prevState + 1)
        if (counter === 5) {
          handleNext()
        }
      })
  }, [counter])

  return (
    <div className={styles['outer-circle']}>
      <div className={styles['inner-circle']}>
        {text}
      </div>
    </div>
  )
}

export default BreathCircle
