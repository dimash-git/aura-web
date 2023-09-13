import { useEffect, useState } from 'react'
import { FormField } from '@/types'
import styles from './styles.module.css'

const isValidName = (name: string) => {
  return name.length > 0 && name.length < 30
}

function NameInput(props: FormField<string>): JSX.Element {
  const { name, value, placeholder, onValid, onInvalid } = props
  const [userName, setUserName] = useState(value)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }

  useEffect(() => {
    if (isValidName(userName)) {
      onValid(userName)
    } else {
      onInvalid()
    }
  }, [userName, onInvalid, onValid])

  return (
    <div className={styles['name-input-container']}>
      <input
        name={name}
        type="text"
        value={userName}
        onChange={handleChange}
        placeholder={placeholder ?? ' '}
      />
    </div>
  )
}

export default NameInput
