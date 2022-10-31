import SocialLinks from './SocialLinks';
import {withTranslation} from "react-i18next";
import './Footer.css';

const Footer = ({t}) => {
    return (
        <div className='footer'>
            <div className='footer__container'>
                <picture className='footer__picture'>
                    <source srcSet={process.env.PUBLIC_URL + '/img/logo/logo-tekst-white.svg'} />
                    <img alt='Login - Linjeforeningen for IT' />
                </picture>
                <SocialLinks />
            </div>
            <p className='footer__p footer__p--msg' dangerouslySetInnerHTML={{__html: t('footer.msg')}} />
            <p className='footer__p' dangerouslySetInnerHTML={{__html: t('footer.copy')}} />
        </div>
    )
}

export default withTranslation('layout')(Footer)
