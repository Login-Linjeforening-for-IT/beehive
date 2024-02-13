import './Contact.css'
import MazeMap from '../../components/mazemap/map';
import {withTranslation} from "react-i18next";

const Contact = ({t}) => {
  return(
    <div className='contact-card'>
      <h2 className='policy-section__header heading-2'>
        <i className='policy-section__header-icon material-symbols-sharp'>travel_explore</i>
        <span>{t('contact.title')}</span>
      </h2>
      <div className='contact-card__info'>
        <div className='contact-card__text'>
          <h4 className='heading-4'>{t('contact.address')}:</h4>
          <p className='p--regular'>Login - Linjeforeningen for IT
            <br/>
            Teknologivegen 22
            <br/>
            Bygg A, rom 155
            <br/>
            2815 GJØVIK
          </p>
          <h4 className='heading-4'>{t('contact.email')}:</h4>
          <p className='p--regular'><a className='standard-link standard-link--underscore-hover' href='mailto:kontakt@login.no'>kontakt@login.no</a></p>
        </div>
        <div className='contact-card__map'>
          <MazeMap 
            campusID={55}
            poi={229153}
          />
        </div>
      </div>
    </div>
  )
}

export default withTranslation('policy')(Contact);
