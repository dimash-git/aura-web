import './BackButton.css'

function BackButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLDivElement>): JSX.Element {
  const combinedClassNames = ['back-btn', className].filter(Boolean).join(' ')
  return (
    <div className={combinedClassNames} {...props}>
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.7676 12.3203H5.76758" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M12.7676 19.3203L5.76758 12.3203L12.7676 5.32031" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    </div>
  )
}

export default BackButton
