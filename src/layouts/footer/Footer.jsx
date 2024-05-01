import React from 'react';
import SocialLinks from './SocialLinks';
import { withTranslation } from "react-i18next";
import './Footer.css';
import { config } from "../../Constants";

var version = process.env.REACT_APP_FRONTEND_VERSION;

const Footer = ({ t }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <div className='footer'>
      <div className='footer-logos'>
        <div className='footer-logos__item'>
          <picture className='footer-logos__item-picture'>
            <source srcSet={process.env.PUBLIC_URL + '/img/logo/logo-tekst-white.svg'} />
            <img className='footer-logos__item-image' alt='Login - Linjeforeningen for IT' />
          </picture>
        </div>
        <div className='footer-logos__item'>
          <a href='https://www.mnemonic.io/' target='_blank'>
            <picture className='footer-logos__item-picture'>
              <source srcSet={config.url.CDN_URL + '/img/company/mnemonic-logo_light-nopayoff-2021.svg '} />
              <img className='footer-logos__item-image' alt='mnemonic' />
            </picture>
          </a>
          <p className='footer-logos__item-text'>{t('footer.sponsor')}</p>
        </div>
      </div>
      <div className='footer-contact-info'>
        <div className='footer-contact-info__section'>
          <h4 className='footer-contact-info__header'>{t('footer.contactInfo.address.header')}</h4>
          <p className='footer-contact-info__text'>
            {t('footer.contactInfo.address.info1')}
            <br/>
            {t('footer.contactInfo.address.info2')}
            <br/>
            {t('footer.contactInfo.address.info3')}
          </p>
        </div>
        <div className='footer-contact-info__section'>
          <h4 className='footer-contact-info__header'>{t('footer.contactInfo.email')}</h4>
          <p className='footer-contact-info__text'>
            <a className='footer-contact-info__link standard-link--underscore-hover' href='mailto:kontakt@login.no'>kontakt@login.no</a>
          </p>
        </div>
      </div>
      <SocialLinks />
      <div className='footer-bottom'>
        <p className='footer-bottom__text' dangerouslySetInnerHTML={{ __html: ` ${t('footer.copy1')} ${currentYear} ${t('footer.copy2')}` }} />
        {typeof version !== 'undefined' ?
          <a 
            className='footer-bottom__version-tag'
            target='_blank'
            href={'https://git.logntnu.no/tekkom/web/beehive/frontend/-/tags/' + version} 
          >
            v{version}
          </a>
          : null
        }
      </div>
    </div>
  );
}

export default withTranslation('layout')(Footer);