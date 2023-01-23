import SocialLinks from './SocialLinks';
import {withTranslation} from "react-i18next";
import './Footer.css';
import {config} from "../../Constants";

const Footer = ({t}) => {
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
              <SocialLinks />
            </div>
            <SocialLinks />
            <p className='footer__p' dangerouslySetInnerHTML={{__html: t('footer.msg')}} />
            <p className='footer__p' dangerouslySetInnerHTML={{__html: t('footer.copy')}} />
        </div>
    )
}

export default withTranslation('layout')(Footer)
