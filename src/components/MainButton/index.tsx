import './styles.css'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'black' | 'blue'
};


function MainButton({ className, children, color, ...props}: ButtonProps): JSX.Element {
  const colorClass = color ? `main-btn--${color}` : 'main-btn--black'
  const combinedClassNames = ['main-btn', colorClass, className].filter(Boolean).join(' ')
  return <button className={combinedClassNames} {...props}>{children}</button>
}

export default MainButton
