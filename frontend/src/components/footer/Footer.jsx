import SocialLinks from './SocialLinks';
import './Footer.css';
import { config } from '../../Constants';

const Footer = () => {
    return (
        <div className="FooterContainer">
            <div>
                <picture>
                    <source srcSet={ config.url.CDN_URL + '/img/logo/logo-tekst-white.svg' } />
                    <img alt="Login Linjeforeningen for IT" />
                </picture>
                <SocialLinks />
            </div>
            <p className='FooterMsg'>Nettsiden er i BETA. Endringer skjer fortløpende. Dette medfører at ting ikke alltid fungerer som de skal. Skulle du snuble over en feil så setter vi pris på en <a href="mailto:kontakt@logntnu.no">epost</a>.</p>
            <p>Opphavsrett &copy; 2022 Login - Linjeforeningen for IT, NO 811 940 372</p>
        </div>
    )
}

export default Footer;
