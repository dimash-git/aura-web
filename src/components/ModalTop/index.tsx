import { ReactNode } from 'react'
import styles from './styles.module.css'

interface ModalProps {
  children: ReactNode
  open?: boolean
  onClose?: () => void
}

function ModalTop({ open, children, onClose }: ModalProps): JSX.Element {
  const handleClose = (event: React.MouseEvent) => {
    if (event.target !== event.currentTarget) return
    onClose?.()
  }
  if (!open) return <></>
  return (
    <div className={styles.modal} onClick={handleClose}>
      <div className={styles['modal-content']}>
        {children}
      </div>
    </div>
  )
}

export default ModalTop
