import './styles.css'

interface PolicyProps {
  children: string
  sizing?: 'small' | 'medium' | 'large'
  className?: string
}

const sizes = {
  small: 'policy--small',
  medium: 'policy--medium',
  large: 'policy--large',
}

function Policy({ children, sizing = 'small', className = '' }: PolicyProps): JSX.Element {
  return (
    <div className={`policy ${sizes[sizing]} ${className}`}>
      <p>{children}</p>
    </div>
  )
}

export default Policy
