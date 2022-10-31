import './LandingPage.css'
import DecoratedPicture from '../../components/picture/DecoratedPicture'
import LoginLogo from '../../assets/svg/LoginLogo';
import {Link} from 'react-router-dom'
import { config } from '../../Constants'
import {withTranslation} from "react-i18next";

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
  return (
    <>
      <div className='landing-info'>
        <div className='landing-info__text'>
          <h2 className='heading-2 heading-2--top-right-corner'>{t('landing.whoAreWe.title')}</h2>
          <p className='p--regular'>{t('landing.whoAreWe.body')}</p>
          <Link className='landing-info__link' to='/about'>{t('landing.readMore')}</Link>
        </div>
        <DecoratedPicture imgurl={config.url.CDN_URL + '/img/styret.jpg'} decorationNr={1} cornerSize={400} w={1420} h={947} />
      </div>

      <div className='landing-info'>
        <div className='landing-info__text'>
          <h2 className='heading-2 heading-2--top-right-corner'>{t('landing.companiesInfo.title')}</h2>
          <p className='p--regular'>{t('landing.companiesInfo.body')}</p>
          <Link className='landing-info__link' to='/companies'>{t('landing.readMore')}</Link>
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
