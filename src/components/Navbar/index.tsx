import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAuth } from '@/auth'
import { useLegal } from '@/legal'
import routes from '@/routes'
import './styles.css'

type NavbarProps = {
  isOpen: boolean
  closeMenu: () => void
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

function Navbar({ isOpen, closeMenu }: NavbarProps): JSX.Element {
  const { logout } = useAuth()
  const { t } = useTranslation()
  const legal = useLegal()
  const combinedClassNames = ['navbar', isOpen && 'navbar--open'].filter(Boolean).join(' ')
  return (
    <aside className={combinedClassNames}>
      <div className='navbar__overlay' onClick={closeMenu}></div>
      <div className='navbar__panel'>
        <div className="navbar__close-btn" onClick={closeMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <title>cross</title>
            <path d="M10.051 12l-10.051 10.051 1.949 1.949 10.051-10.051 10.051 10.051 1.949-1.949-10.051-10.051 10.051-10.051-1.949-1.949-10.051 10.051-10.051-10.051-1.949 1.949 10.051 10.051z"></path>
          </svg>
        </div>
        <nav className='navbar__nav'>
          {legal?.map((item) => (
            <Link key={item.type} to={routes.client.legal(item.type)} onClick={closeMenu}>
              {capitalize(item.title)}
            </Link>
          ))}
          <a href='https://aura.wit.life/' onClick={closeMenu} target='_blank' rel='noopener noreferrer'>
            {t('contact_us')}
          </a>
          <hr />
          <a href='#' onClick={logout}>Log Out</a>
        </nav>
      </div>
    </aside>
  )
}

export default Navbar
