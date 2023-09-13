import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import routes, { hasCrossButton, hasNavigation, isNotEntrypoint } from '@/routes'
import BackButton from './BackButton'
import iconUrl from './icon.png'
import menuUrl from './menu.png'
import styles from './styles.module.css'

type HeaderProps = {
  openMenu?: () => void
  showBack?: boolean
  showCross?: boolean
  clickCross?: () => void
}

function Header({ openMenu, showBack, showCross, clickCross = () => {undefined}, ...props }: HeaderProps & React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [initialPath, setInitialPath] = useState<string | null>(null);
  const [isNavigated, setIsNavigated] = useState<boolean>(false);
  const showBackButton = isNotEntrypoint(location.pathname)
  const showMenuButton = hasNavigation(location.pathname)
  const showCrossButton = hasCrossButton(location.pathname)

  useEffect(() => {
    if (!initialPath) {
      setInitialPath(location.pathname)
    }
    if (initialPath && location.pathname !== initialPath && !isNavigated) {
      setIsNavigated(true)
    }
  }, [location.pathname, initialPath, isNavigated])

  const goBack = () => {
    if (initialPath && isNotEntrypoint(initialPath) && !isNavigated) {
      navigate(routes.client.root())
    } else {
      navigate(-1)
    }
  }

  return (
    <header className={styles.header} {...props}>
      { (showBackButton || showBack) ? <BackButton className='pa' onClick={goBack} /> : null }
      <img src={iconUrl} alt="logo" width="40" height="40" />
      <span className={styles["header__title"]}>{t('app_name')}</span>
      {(showCrossButton || showCross) ? <img className={styles.cross} src="/cross.png" alt="Cross" onClick={clickCross} /> : null}
      {showMenuButton ? <div className={styles["header__menu-btn"]} onClick={openMenu}>
        <img src={menuUrl} alt="menu" width="40" height="40" />
      </div> : null}
    </header>
  )
}

export default Header
