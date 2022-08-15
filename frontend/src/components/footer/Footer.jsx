import SocialLinks from './SocialLinks';
import './Footer.css';

const Footer = () => {
    return (
        <div className="FooterContainer">
            <div>
                <p className="FooterMsg">Nettsiden er i BETA. Endringer skjer fortløpende. Dette medfører at ting ikke alltid fungerer som de skal. Skulle du snuble over en feil så setter vi pris på en <a href="mailto:kontakt@logntnu.no">epost</a>.</p>
                <SocialLinks />
            </div>
            <p className="BottomLine">Opphavsrett &copy; 2022 Login - Linjeforeningen for IT, NO 811 940 372</p>
        </div>
    )
}

export default Footer;
