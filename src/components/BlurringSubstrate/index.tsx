import styles from './styles.module.css'

interface IBlurringSubstrateProps {
    className?: string
    style?: React.CSSProperties
    children: JSX.Element
    clickHandler?: () => void
}

function BlurringSubstrate({ className, children, style, clickHandler }: IBlurringSubstrateProps): JSX.Element {

  return (
    <div style={{ ...style }} className={`${styles['blurring-substrate']} ${className || ''}`} onClick={clickHandler} >
      {children}
    </div>
  )
}

export default BlurringSubstrate
