import { useEffect, useState } from 'react'
import { FormField } from '@/types'
import './styles.css'

const isValidEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase().trim())
}

function EmailInput(props: FormField<string>): JSX.Element {
  const { name, value, placeholder, onValid, onInvalid } = props
  const [email, setEmail] = useState(value)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  useEffect(() => {
    if (isValidEmail(email)) {
      onValid(email)
    } else {
      onInvalid()
    }
  }, [email, onInvalid, onValid])

  return (
    <div className="email-input">
      <input
        name={name}
        type="email"
        value={email}
        onChange={handleChange}
        placeholder=" "
      />
      <span className="email-input__placeholder">{placeholder}</span>
    </div>
  )
}

export default EmailInput
