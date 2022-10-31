import './Contact.css'
import MazeMap from '../../components/mazemap/map';
import {withTranslation} from "react-i18next";

const Contact = ({t,i18n}) => {
  return(
    <div className='contact-card'>
      <h2 className='heading-2'>{t('contact.title')}</h2>
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
          <p className='p--regular'><a href='mailto:kontakt@login.no'>kontakt@login.no</a></p>
        </div>
        <div className='contact-card__map'>
          <MazeMap mazeref={'https://use.mazemap.com/#v=1&campusid=55&sharepoitype=poi&sharepoi=229153&lang=' + i18n.language} />
        </div>
      </div>
    </div>
  )
}

export default withTranslation('companiesPage')(Contact);
