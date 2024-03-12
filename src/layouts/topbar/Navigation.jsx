import React, { useCallback, useRef, useState } from 'react';
import {NavLink} from 'react-router-dom'
import {withTranslation} from "react-i18next";

const Navigation = ({t}) => {

  const navItemRefs = useRef([React.createRef(), React.createRef(), React.createRef()]);

  // each dropdown item will unfocus (blur) whenever it is clicked. 
  // this prevents it from staying visble after removing the mouse.
  // this allows for showing the dropdown on focus and hover without 
  // being focused anfter clicking it which improves accsessebility.
  const handleClick = useCallback(() => {
    navItemRefs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.blur();
      }
    });
  }, [navItemRefs]);

  return (
    <nav className='main-nav'>
      <NavLink to='events'>
        <li className='main-nav__item standard-link--corner-hover'>{t('nav.events')}</li>
      </NavLink>
      <NavLink to='career'>
        <li className='main-nav__item standard-link--corner-hover'>{t('nav.jobad')}</li>
      </NavLink>
      <NavLink to='companies'>
        <li className='main-nav__item standard-link--corner-hover'>{t('nav.companies')}</li>
      </NavLink>
      <div className='main-nav-dropdown'>

        {/* button wrapping the dropdown is ugly as hell, but it improves accsessebility. 
            The button can be focused and using css the children can be displayed, meaning 
            you can navigate trough the dropdown using tab, while also having the dropdown show on hover */}
        <button className='main-nav-dropdown__toggle'>
          <div className='main-nav__item'>
            {t('nav.about')}
            <i className="material-symbols-sharp main-nav-dropdown__toggle-arrow">expand_more</i>
          </div>
          <div className='main-nav-dropdown__wrapper'>
            <ul className="main-nav-dropdown__items">
              <NavLink to='about' ref={navItemRefs.current[0]} onClick={handleClick}>
                <li className='main-nav-dropdown__item standard-link--corner-hover'>{t('nav.general')}</li>
              </NavLink>
              <NavLink to='verv' ref={navItemRefs.current[1]} onClick={handleClick}>
                <li className='main-nav-dropdown__item standard-link--corner-hover'>{t('nav.verv')}</li>
              </NavLink>
              <a title='Wiki' href='https://wiki.login.no' target='_blank' rel='noreferrer' ref={navItemRefs.current[2]} onClick={handleClick}>
                <li className='main-nav-dropdown__item standard-link--corner-hover'>
                  Wiki<i className="material-symbols-sharp wiki__arrow">arrow_outward</i>
                </li>
              </a>
            </ul>
          </div>
        </button>
      </div>
    </nav>
  )
}

export default withTranslation('layout')(Navigation);
