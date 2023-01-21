import { NavLink } from 'react-router-dom'
import {withTranslation} from "react-i18next";

const Navigation = ({t}) => {
    return (
        <nav className='main-nav'>
          <NavLink to='/about'>
            <li className='main-nav__item standard-link--corner-hover'>{t('nav.about')}</li>
          </NavLink>
          <NavLink to='events'>
            <li className='main-nav__item standard-link--corner-hover'>{t('nav.events')}</li>
          </NavLink>
          <NavLink to='companies'>
            <li className='main-nav__item standard-link--corner-hover'>{t('nav.companies')}</li>
          </NavLink>
        </nav>
    )
}

export default withTranslation('layout')(Navigation);
