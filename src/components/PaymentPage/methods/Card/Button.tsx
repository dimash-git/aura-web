
import { useTranslation } from 'react-i18next'
import MainButton from '@/components/MainButton'
import card from './card.svg'

interface CardButtonProps {
  onClick: () => void
}

export function CardButton({ onClick }: CardButtonProps): JSX.Element {
  const { t } = useTranslation()
  return (
    <MainButton color='blue' onClick={onClick}>
      <img className='payment-card' src={card} alt='Credit / Debit Card' />
      {t('card')}
    </MainButton>
  )
}
