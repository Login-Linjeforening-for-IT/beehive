import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import './LandingPage.css'
import DecoratedPicture from '../../components/picture/DecoratedPicture'
import LoginLogo from '../../components/svg/brandlogos/LoginLogo';
import { config } from '../../Constants'
import {withTranslation} from "react-i18next";
import {useContext} from "react";
import ThemeContext from "../../context/ThemeContext";
import EventCardSkeleton from "../../components/event/EventCardSkeleton";
import JobadCard from '../../components/jobad/JobadCard';
import JobadCardSkeleton from "../../components/jobad/JobadCardSkeleton";
import { getEvents, getJobs } from '../../utils/api';
import EventListItem from "../../components/event/EventItem";


const WelcomeBanner = ({ t }) => {
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

const SmallInfo = ({ t }) => {
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
        <DecoratedPicture imgurl={config.url.CDN_URL + '/img/styret.jpg'} variant={1} cornerSize={350} w={1420} h={947} />
      </div>

      <div className='landing-info'>
        <div className='landing-info__text'>
          <h2 className='heading-2'>{t('landing.companiesInfo.title')}</h2>
          <p className='p--regular'>{t('landing.companiesInfo.body')}</p>
          <Link className='landing-info__link standard-link standard-link--corner-hover' to='/companies'>{t('landing.readMore')}</Link>
        </div>
        <DecoratedPicture imgurl={config.url.CDN_URL + '/img/cyberdagen_preben.jpg'} variant={3} cornerSize={350} w={1420} h={947} />
      </div>

      <div className='landing-info'>
        <div className='landing-info__text'>
          <h2 className='heading-2'>{t('landing.sponsor.title')}</h2>
          <p className='p--regular'>{t('landing.sponsor.body')}</p>
          <a className='landing-info__link standard-link standard-link--corner-hover' href='https://www.mnemonic.io/' target='_blank'>{t('landing.readMore')}</a>
        </div>
        <DecoratedPicture imgurl={config.url.CDN_URL + getSponsorPath()} variant={0} cornerSize={0} w={400} h={130} />
      </div>
    </>
  )
}

const EndCard = ({ t, path }) => {
  return (
    <li className='dynamic-preview-list__item dynamic-preview-end-card'>
      <Link to={path} className='dynamic-preview-end-card__btn'>
        <div className='dynamic-preview-end-card__arrow-container'>
          <div className="dynamic-preview-end-card__arrow"></div>
        </div>
        <div className='dynamic-preview-end-card__text'>
          {t('landing.eventsPreview.see-all')}
        </div>
      </Link>
    </li>
  )
}

const EventsPreview = ({ t }) => {

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
        <>
          <section className='dynamic-preview'>
            <div className='dynamic-preview-heading'>
              <h2 className='dynamic-preview-heading__title'>{t('landing.eventsPreview.title')}</h2>
              <Link to='/events' className='dynamic-preview-heading__link'>
                {t('landing.eventsPreview.see-all')}
              </Link>
            </div>
            <ul className='dynamic-preview-list'>
              <li className='dynamic-preview-list__item'>
                <EventCardSkeleton/>
              </li>
              <li className='dynamic-preview-list__item'>
                <EventCardSkeleton/>
              </li>
              <li className='dynamic-preview-list__item'>
                <EventCardSkeleton/>
              </li>
              <EndCard t={t} path='/events'/>
            </ul>
          </section>
          <hr className='dynamic-preview-seperator' />
        </>
      }
      { events && events.length > 0 &&
        <>
          <section className='dynamic-preview'>
            <div className='dynamic-preview-heading'>
              <h2 className='dynamic-preview-heading__title'>{t('landing.eventsPreview.title')}</h2>
              <Link to='/events' className='dynamic-preview-heading__link'>
                {t('landing.eventsPreview.see-all')}
              </Link>
            </div>
            <ul className='dynamic-preview-list'>
              {events.map((e) => (
                <li key={e.id}  className='dynamic-preview-list__item'>
                  <EventListItem event={e} variant="card" highlight={false}/>
                </li>
              ))}
              {(events.length > 2) && <EndCard t={t} path='/events' />}
            </ul>
          </section>
          <hr className='dynamic-preview-seperator' />
        </>
      }
    </>
  )
}

const JobadsPreview = ({ t }) => {

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
        <>
          <section className='dynamic-preview'>
            <div className='dynamic-preview-heading'>
              <h2 className='dynamic-preview-heading__title'>{t('landing.jobadsPreview.title')}</h2>
              <Link to='/career' className='dynamic-preview-heading__link'>
                {t('landing.eventsPreview.see-all')}
              </Link>
            </div>
            <ul className='dynamic-preview-list'>
              <li className='dynamic-preview-list__item'>
                <JobadCardSkeleton/>
              </li>
              <li className='dynamic-preview-list__item'>
                <JobadCardSkeleton/>
              </li>
              <li className='dynamic-preview-list__item'>
                <JobadCardSkeleton/>
              </li>
              <EndCard t={t} path='/career'/>
            </ul>
          </section>
          <hr className='dynamic-preview-seperator' />
        </>
      }
      { jobads && jobads.length > 0 &&
        <>
          <section className='dynamic-preview'>
            <div className='dynamic-preview-heading'>
              <h2 className='dynamic-preview-heading__title'>{t('landing.jobadsPreview.title')}</h2>
              <Link to='/career' className='dynamic-preview-heading__link'>
                {t('landing.eventsPreview.see-all')}
              </Link>
            </div>
              <ul className='dynamic-preview-list'>
                {jobads.map((e) => (
                  <li key={e.id}  className='dynamic-preview-list__item'>
                    <JobadCard jobad={e} />
                  </li>
                ))}
                {(jobads.length > 2) && <EndCard t={t} path='/career'/> }
              </ul>
          </section>
          <hr className='dynamic-preview-seperator' />
        </>
      }
    </>
  )
}

  
const LandingPage = ({ t }) => {

  return (
      <div>
        <WelcomeBanner t={t}/>
        <EventsPreview t={t}/>
        <JobadsPreview t={t}/>
        <SmallInfo t={t}/>
      </div>
  );
}

export default withTranslation('landingPage')(LandingPage);
