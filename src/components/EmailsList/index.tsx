import { getRandomArbitrary, getRandomName } from '@/services/random-value'
import EmailItem, { IEmailItem } from '../EmailItem'
import styles from './styles.module.css'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'

const getEmails = (): IEmailItem[] => {
    const emails: IEmailItem[] = []

    for (let index = 0; index < 5; index++) {
        emails.push({
            email: getRandomName(),
            price: [9, 9, 9, 9, 9, 5, 13.67][getRandomArbitrary(0, 7)]
        })
        
    }

    return emails
}


function EmailsList(): JSX.Element {
  const { t } = useTranslation()
  const [countUsers, setCountUsers] = useState(752)
  const [emails, setEmails] = useState(getEmails())
  const [elementIdx, setElementIdx] = useState(0)
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const randomDelay = getRandomArbitrary(3000, 5000)
    const countUsersTimeOut = setTimeout(() => {
        setCountUsers((prevState) => prevState + 1)
    }, randomDelay)
    return () => clearTimeout(countUsersTimeOut)
  }, [countUsers])

  useEffect(() => {
    let randomDelay = getRandomArbitrary(500, 5000)
    if (!elementIdx) {
      randomDelay = 0
    }
    
    const itemsRefInterval = setInterval(() => {
        if (itemsRef.current[elementIdx - 1]) {
          itemsRef.current[elementIdx - 1].remove()
				}
        if (itemsRef.current[elementIdx]?.style) {
          itemsRef.current[elementIdx].classList.add(styles.hidden)
        }
				setEmails((prevState) => {
					const array = prevState.slice(0)
					array.push({
							email: getRandomName(),
							price: [9, 9, 9, 9, 9, 5, 13.67][getRandomArbitrary(0, 7)]
					})
					return array
        })
        setElementIdx((prevState) => prevState + 1)
    }, randomDelay)
    return () => clearInterval(itemsRefInterval)
  }, [emails, elementIdx])

  return (
    <div className={styles.container}>
        <span className={styles['title']}>{t('people_joined_today', { countPeoples: <strong>{countUsers}</strong> })}</span>
        <div className={styles['emails-container']}>
            {emails.map(({email, price}, idx) => (
							<div className={styles['email-item']} ref={(el: HTMLDivElement) => itemsRef.current[idx] = el} key={idx}>
									<EmailItem email={email} price={price} />
							</div>
            ))}
        </div>
    </div>
  )
}

export default EmailsList
