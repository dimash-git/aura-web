import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Title from '../Title'
import routes from '@/routes'
import styles from './styles.module.css'
import { MouseEventHandler, TouchEventHandler, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '@/store'

function FreePeriodInfoPage(): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const updateCoordinates = useCallback((X: number, Y: number) => {
    dispatch(actions.aura.update({
      coordinates: {
        X,
        Y
      }
    }))
  }, [dispatch])

  const handleNext = () => {
    navigate(routes.client.createProfile())
  }

  const mouseDown: MouseEventHandler<HTMLElement> = (e) => {
    const X = e.clientX
    const Y = e.clientY
    updateCoordinates(X, Y)
    handleNext()
  }

  const touchStart: TouchEventHandler<HTMLElement> = (e) => {
    const X = e.touches[0].clientX
    const Y = e.touches[0].clientY
    updateCoordinates(X, Y)
    handleNext()
  }

  return (
    <section className={`${styles.page} page`} onMouseDown={mouseDown} onTouchStart={touchStart}>
      <div className={styles.content}>
        <Title variant='h4' className={styles.title}>{t('touch_screen')}</Title>
      </div>
    </section>
  )
}

export default FreePeriodInfoPage
