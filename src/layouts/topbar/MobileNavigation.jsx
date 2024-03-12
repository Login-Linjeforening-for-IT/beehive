import { useState } from 'react'
import {NavLink} from 'react-router-dom'
import {withTranslation} from 'react-i18next'


const MobileNavigation = ({t, open, setIsOpen}) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const close = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }

  return (
    <nav className={`mobile-nav${open ? ' mobile-nav--open' : ''}`}>
      <NavLink onClick={close} to='events'>
        <li className='mobile-nav__item'>{t('nav.events')}</li>
      </NavLink>
      <NavLink onClick={close} to='career'>
        <li className='mobile-nav__item'>{t('nav.jobad')}</li>
      </NavLink>
      <NavLink onClick={close} to='companies'>
        <li className='mobile-nav__item'>{t('nav.companies')}</li>
      </NavLink>
      <div className={`mobile-nav-dropdown${isDropdownOpen ? ' mobile-nav-dropdown--open' : ''}`}>
        <button className='mobile-nav-dropdown__toggle' onClick={toggleDropdown}>
          <li className='mobile-nav__item'>
            {t('nav.about')}
            <i className="material-symbols-sharp mobile-nav-dropdown__toggle-arrow">expand_more</i>
          </li>
        </button>
        <div className='mobile-nav-dropdown__items'>
          <NavLink onClick={close} to='about'>
            <li className='mobile-nav-dropdown__item'>
              {t('nav.general')}
            </li>
          </NavLink>
          <NavLink onClick={close} to='verv'>
            <li className='mobile-nav-dropdown__item'>
              {t('nav.verv')}
            </li>
          </NavLink>
          <a title='Wiki' href='https://wiki.login.no' target='_blank' rel='noreferrer'>
            <li className='mobile-nav-dropdown__item'>
              Wiki
              <i className="material-symbols-sharp wiki__arrow">arrow_outward</i>
            </li>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default withTranslation('layout')(MobileNavigation);
