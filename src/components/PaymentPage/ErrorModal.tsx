import { useTranslation } from 'react-i18next'
import MainButton from '../MainButton'
import Modal from '../Modal'
import Title from '../Title'
import Policy from '../Policy'

interface ModalProps {
  open: boolean
  onClose: () => void
}

function ErrorModal({ open, onClose }: ModalProps): JSX.Element {
  const { t } = useTranslation()
  const supportLink = <a href='https://aura.wit.life/' target='_blank' rel='noopener noreferrer'>{t('our_support')}</a>
  return (
    <Modal open={open} onClose={onClose}>
      <div className='modal-body error-modal'>
        <div className='ta-c mb-24'>
        <svg fill="#000000" height="60px" width="60px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 27.963 27.963" xmlSpace="preserve">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <g id="c129_exclamation">
                  <path d="M13.983,0C6.261,0,0.001,6.259,0.001,13.979c0,7.724,6.26,13.984,13.982,13.984s13.98-6.261,13.98-13.984 C27.963,6.259,21.705,0,13.983,0z M13.983,26.531c-6.933,0-12.55-5.62-12.55-12.553c0-6.93,5.617-12.548,12.55-12.548 c6.931,0,12.549,5.618,12.549,12.548C26.531,20.911,20.913,26.531,13.983,26.531z"></path>
                  <polygon points="15.579,17.158 16.191,4.579 11.804,4.579 12.414,17.158 "></polygon>
                  <path d="M13.998,18.546c-1.471,0-2.5,1.029-2.5,2.526c0,1.443,0.999,2.528,2.444,2.528h0.056c1.499,0,2.469-1.085,2.469-2.528 C16.441,19.575,15.468,18.546,13.998,18.546z"></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <Title variant='h3'>{t('error_processing')}</Title>
        <blockquote className='blockquote'>{t('please_try_again')}</blockquote>
        <Policy className='mb-24 ta-l' sizing='medium'>{t('any_dificulties', { supportLink })}</Policy>
        <MainButton color='blue' onClick={onClose}>{t('try_again')}</MainButton>
      </div>
    </Modal>
  )
}

export default ErrorModal