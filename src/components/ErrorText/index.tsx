import './styles.css'

type ErrorTextProps = {
  message: string | null | undefined
  isShown?: boolean
  size?: 'small' | 'medium' | 'large'
}

function ErrorText({ message, isShown, size }: ErrorTextProps): JSX.Element {
  const classNames = ['error-text', isShown ? 'error--shown' : 'error--hide', size ? `error--${size}` : '']
  return (
    <p className={classNames.filter(Boolean).join(' ')}>
      {message}
    </p>
  )
}

export default ErrorText
