import './LandingPage.css'
import DecoratedPicture from '../../components/picture/DecoratedPicture'
import LoginLogo from '../../assets/svg/LoginLogo';
import {Link} from 'react-router-dom'
import { config } from '../../Constants'
import {withTranslation} from "react-i18next";
import {useContext} from "react";
import ThemeContext from "../../context/ThemeContext";

const WelcomeBanner = ({t}) => {

  return (
    <div className='welcome'>
      <picture className='welcome__pic'>
        <LoginLogo />
      </picture>
      <p className='welcome__text'>{t('landing.welcome')} <span className='welcome__text--gradient'>login.no</span>!</p>
    </div>
  )
}

const SmallInfo = ({t}) => {
  const value = useContext(ThemeContext)

  const getSponsorPath = () => {
    if(value.theme === 'light') {
      return '/img/company/mnemonic-logo_dark-nopayoff-2021.svg';
    } else {
      return '/img/company/mnemonic-logo_light-nopayoff-2021.svg';
    }
  }

  return (
    <>
      <div className='landing-info'>
        <div className='landing-info__text'>
          <h2 className='heading-2'>{t('landing.whoAreWe.title')}</h2>
          <p className='p--regular'>{t('landing.whoAreWe.body')}</p>
          <Link className='landing-info__link standard-link standard-link--corner-hover' to='/about'>{t('landing.readMore')}</Link>
        </div>
        <DecoratedPicture imgurl={config.url.CDN_URL + '/img/styret.jpg'} decorationNr={1} cornerSize={400} w={1420} h={947} />
      </div>

      <div className='landing-info'>
        <div className='landing-info__text'>
          <h2 className='heading-2'>{t('landing.sponsor.title')}</h2>
          <p className='p--regular'>{t('landing.sponsor.body')}</p>
          <a className='landing-info__link standard-link standard-link--corner-hover' href='https://www.mnemonic.io/' target='_blank'>{t('landing.readMore')}</a>
        </div>
        <a href='https://www.mnemonic.io/' target='_blank'>
          <DecoratedPicture imgurl={config.url.CDN_URL + getSponsorPath()} decorationNr={1} cornerSize={400} w={1420} h={947} />
        </a>
      </div>

      <div className='landing-info'>
        <div className='landing-info__text'>
          <h2 className='heading-2'>{t('landing.companiesInfo.title')}</h2>
          <p className='p--regular'>{t('landing.companiesInfo.body')}</p>
          <Link className='landing-info__link standard-link standard-link--corner-hover' to='/companies'>{t('landing.readMore')}</Link>
        </div>
        <DecoratedPicture imgurl={config.url.CDN_URL + '/img/cyberdagen_preben.jpg'} decorationNr={3} cornerSize={400} w={1420} h={947} />
      </div>
    </>
  );
}

  
const LandingPage = ({t,i18n}) => {

  return (
      <div className='LandingPage'>
        <WelcomeBanner t={t}/>
        <SmallInfo t={t}/>
      </div>
  );
}

export default withTranslation('landingPage')(LandingPage);
