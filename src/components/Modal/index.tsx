import { ReactNode } from 'react'
import './styles.css'

interface ModalProps {
  children: ReactNode
  open?: boolean
  onClose?: () => void
}

function Modal({ open, children, onClose }: ModalProps): JSX.Element {
  const handleClose = (event: React.MouseEvent) => {
    if (event.target !== event.currentTarget) return
    onClose?.()
  }
  if (!open) return <></>
  return (
    <div className='modal' onClick={handleClose}>
      <div className='modal-content'>
        <button className='modal-close-btn' onClick={handleClose} />
        {children}
      </div>
    </div>
  )
}

export default Modal
