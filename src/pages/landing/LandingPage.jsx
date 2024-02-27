import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import './LandingPage.css'
import DecoratedPicture from '../../components/picture/DecoratedPicture'
import LoginLogo from '../../components/svg/brandlogos/LoginLogo';
import { config } from '../../Constants'
import {withTranslation} from "react-i18next";
import {useContext} from "react";
import ThemeContext from "../../context/ThemeContext";
import EventCard from '../../components/event/EventCard';
import JobadCard from '../../components/jobad/JobadCard';
import { getEvents, getJobs } from '../../utils/api';


const WelcomeBanner = ({t}) => {
  return (
    <div className='welcome'>
      <div className='welcome__container'>
        <picture className='welcome__pic'>
          <LoginLogo />
        </picture>
        <p className='welcome__text'>{t('landing.welcome')}<br/><span className='welcome__text--gradient'>login.no</span></p>
      </div>
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
        <DecoratedPicture imgurl={config.url.CDN_URL + '/img/styret.jpg'} decorationNr={1} cornerSize={350} w={1420} h={947} />
      </div>

      <div className='landing-info'>
        <div className='landing-info__text'>
          <h2 className='heading-2'>{t('landing.companiesInfo.title')}</h2>
          <p className='p--regular'>{t('landing.companiesInfo.body')}</p>
          <Link className='landing-info__link standard-link standard-link--corner-hover' to='/companies'>{t('landing.readMore')}</Link>
        </div>
        <DecoratedPicture imgurl={config.url.CDN_URL + '/img/cyberdagen_preben.jpg'} decorationNr={3} cornerSize={350} w={1420} h={947} />
      </div>

      <div className='landing-info'>
        <div className='landing-info__text'>
          <h2 className='heading-2'>{t('landing.sponsor.title')}</h2>
          <p className='p--regular'>{t('landing.sponsor.body')}</p>
          <a className='landing-info__link standard-link standard-link--corner-hover' href='https://www.mnemonic.io/' target='_blank'>{t('landing.readMore')}</a>
        </div>
        <DecoratedPicture imgurl={config.url.CDN_URL + getSponsorPath()} decorationNr={0} cornerSize={0} w={400} h={130} />
      </div>
    </>
  )
}


const EventsPreview = ({t}) => {

  const [ events, setEvents ] = useState(null);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(null);

  useEffect(() => {
		(async () => {
			
			const [ eventsData, err ] = await getEvents(null, 3, 0, true);
			if (err) {
				setEvents(err);
				return;
			}
		
			setLoading(false);
			setEvents(eventsData);
		})();
	}, []);

  return (
    <>
      { loading && 
        <div className='dynamic-preview'>
          <h2 className='heading-2 dynamic-preview__heading'>{t('landing.eventsPreview.title')}</h2>
          Loading...
        </div>
      }
      { events && events.length > 0 &&
        <div className='dynamic-preview'>
          <h2 className='heading-2 dynamic-preview__heading'>{t('landing.eventsPreview.title')}</h2>
            <ul className='dynamic-preview__list'>
              {events.map((e) => (
                <li key={e.id}  className='dynamic-preview__list-item'>
                  <EventCard event={e} />
                </li>
              ))}
              {(events.length > 2) &&
                <li className='dynamic-preview__view-more'>
                  <Link to='/events' className='dynamic-preview__view-more-btn standard-button standard-button--primary standard-button--arrow-hover'>
                    {t('landing.eventsPreview.see-all')}
                  </Link>
                </li>
              }
            </ul>
        </div>
      }
    </>
  )
}

const JobadsPreview = ({t}) => {

  const [ jobads, setJobads ] = useState(null);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(null);

  useEffect(() => {
		(async () => {
			
			const [ jobadsData, err ] = await getJobs(null, null, null, null, 3, 0);
			if (err) {
				setJobads(err);
				return;
			}
		
			setLoading(false);
			setJobads(jobadsData);
		})();
	}, []);

  return (
    <>
      { loading && 
        <div className='dynamic-preview'>
          <h2 className='heading-2 dynamic-preview__heading'>{t('landing.eventsPreview.title')}</h2>
          Loading...
        </div>
      }
      {jobads && jobads.length > 0 &&
        <div className='dynamic-preview'>
          <h2 className='heading-2 dynamic-preview__heading'>{t('landing.jobadsPreview.title')}</h2>
            <ul className='dynamic-preview__list'>
              {jobads.map((j) => (
                <li key={j.id}  className='dynamic-preview__list-item'>
                  <JobadCard jobad={j}/>
                </li>
              ))}
              <li className='dynamic-preview__view-more'>
                <Link to='/career' className='dynamic-preview__view-more-btn standard-button standard-button--primary standard-button--arrow-hover'>
                  {t('landing.jobadsPreview.see-all')}
                </Link>
              </li>
            </ul>
        </div>
      }
    </>
  )
}

  
const LandingPage = ({t}) => {

  return (
      <div className='LandingPage'>
        <WelcomeBanner t={t}/>
        <EventsPreview t={t}/>
        <JobadsPreview t={t}/>
        <SmallInfo t={t}/>
      </div>
  );
}

export default withTranslation('landingPage')(LandingPage);
