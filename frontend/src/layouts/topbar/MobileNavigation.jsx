import {NavLink} from 'react-router-dom'
import {withTranslation} from 'react-i18next'


const MobileNavigation = ({t, open, setIsOpen}) => {
  const close = () => {
    setIsOpen(false);
  }

  return (
    <nav className={(open ? 'mobile-nav--open ' : '') + 'mobile-nav'}>
      <NavLink onClick={close} to='/about'>
        <li className='mobile-nav__item'>{t('nav.about')}</li>
      </NavLink>
      <NavLink onClick={close} to='events'>
        <li className='mobile-nav__item'>{t('nav.events')}</li>
      </NavLink>
      <NavLink onClick={close} to='companies'>
        <li className='mobile-nav__item'>{t('nav.companies')}</li>
      </NavLink>
    </nav>
  )
}

export default withTranslation('layout')(MobileNavigation)
