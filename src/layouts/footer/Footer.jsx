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
      <div className='footer__flex-container'>
        <picture className='footer__picture footer__picture-login'>
          <source srcSet={process.env.PUBLIC_URL + '/img/logo/logo-tekst-white.svg'} />
          <img alt='Login - Linjeforeningen for IT' />
        </picture>
        <a href='https://www.mnemonic.io/' target='_blank' className='footer__picture footer__picture-sponsor'>
          <picture>
            <source srcSet={config.url.CDN_URL + '/img/company/mnemonic-logo_light-nopayoff-2021.svg '} />
            <img alt='mnemonic' />
          </picture>
          <p>{t('footer.sponsor')}</p>
        </a>
      </div>
      <SocialLinks />
      <p className='footer__p' dangerouslySetInnerHTML={{ __html: ` ${t('footer.copy1')} ${currentYear} ${t('footer.copy2')}` }} />
      {version!=="undefined" ? <p className='footer__p'>{version}</p> : null}
    </div>
  );
}

export default withTranslation('layout')(Footer);