import { PropsWithChildren, HTMLAttributes } from 'react'
import './styles.css'

type TitleProps = PropsWithChildren<{
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
} & HTMLAttributes<HTMLElement>>


function Title({ children, variant, className, ...props }: TitleProps): JSX.Element {
  const combinedClassNames = ['title', className].filter(Boolean).join(' ')
  const Tag = variant ?? 'h1'
  return (
    <Tag className={combinedClassNames} {...props}>{ children }</Tag>
  )
}

export default Title
