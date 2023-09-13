import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './styles.css'

type CountdownProps = {
  start: number
}

function Countdown({ start }: CountdownProps): JSX.Element {
  const { t } = useTranslation()
  const [time, setTime] = useState(start * 60 - 1)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    if (time === 0) return
    const timer = setTimeout(() => setTime(time - 1), 1000)
    return () => clearTimeout(timer)
  }, [time])

  return (
    <div className="countdown mb-24">
      <p>{t('reserved_for')}{formatTime(time)}</p>
    </div>
  )
}

export default Countdown
