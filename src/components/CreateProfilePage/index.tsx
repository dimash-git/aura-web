import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useTranslation } from 'react-i18next'
import ProcessFlow from "./ProcessFlow"
import routes from "@/routes"
import styles from './styles.module.css'
import { useSelector } from "react-redux"
import { selectors } from "@/store"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function CreateProfilePage(): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const auraCoordinates = useSelector(selectors.selectAuraCoordinates)
  const progressbarRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [auraCoordinatesCounted, setAuraCoordinatesCounted] = useState({
    x: auraCoordinates.X - 125,
    y: auraCoordinates.Y - 125
  })

  useEffect(() => {
    setTimeout(() => {
      setAuraCoordinatesCounted(
        {
          x: (progressbarRef?.current?.offsetLeft || 0) + (pageRef?.current?.parentElement?.parentElement?.offsetLeft || 0),
          y: (progressbarRef?.current?.offsetTop || 0) + 50
        }
      )
    }, 1000);
  }, [progressbarRef])
  
  const processItems = [
    { task: () => sleep(3300).then(() => setProgress(23)), label: t('money_energy') },
    { task: () => sleep(2550).then(() => setProgress(48)), label: t('sexual_energy') },
    { task: () => sleep(3789).then(() => setProgress(65)), label: t('black_energy') },
    { task: () => sleep(3789).then(() => setProgress(98)), label: t('relations_energy') },
  ]
  const handleDone = () => Promise.resolve()
    .then(() => setProgress(100))
    .then(() => sleep(1000))
    .then(() => navigate(routes.client.attention()))

  return (
    <section className={`${styles.page} page`} ref={pageRef}>
      <div className={styles.progressbar} ref={progressbarRef}>
        <div style={{ top: `${auraCoordinatesCounted.y}px`, left: `${auraCoordinatesCounted.x}px` }} className={styles.aura}></div>
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          strokeWidth={4}
          styles={buildStyles({
            strokeLinecap: 'butt',
            textSize: '12px',
            trailColor: "#555",
            pathColor: '#fff',
            textColor: '#fff',
            pathTransitionDuration: 1,
          })}
          className={styles['circular-progressbar']}
        />
      </div>
      <ProcessFlow items={processItems} onDone={handleDone} />
    </section>
  )
}

export default CreateProfilePage
