import { useState } from 'react';
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next'
import './JobadCard.css'
import fallbackImg from '../../assets/img/placeholders/jobad-logo__placeholder.svg'
import Tags from '../tags/Tags';
import * as DatetimeFormatter from '../../utils/DatetimeFormatter'
import * as Translator from '../../utils/GetTranslation'
import { config } from "../../Constants";


const JobadCard = ({ i18n, jobad, disableTags=false }) => {

  const useEng = i18n.language === 'en';
  const tr = Translator.getTranslation(useEng);

  const [useFallbackImg, setUseFallbackImg] = useState(false);
  const handleImgError = () => setUseFallbackImg(true);

  return (
    <Link to={'/career/' + jobad.id}>
      <div className='jobad-card'>
        <picture className='jobad-card__picture'>
          <img className='jobad-card__img'
            alt={jobad.organization_logo}
            src={useFallbackImg ? fallbackImg : config.url.CDN_URL + '/img/organizations/' + jobad.organization_logo}
            onError={handleImgError}
            loading="lazy"
          />
        </picture>
        <div className='jobad-card__name'>{tr(jobad.title_en, jobad.title_no)}</div>
        <ul className='jobad-card__details'>
          <li className='jobad-card__detail'>
            <i className='jobad-card__icon material-symbols-sharp'>hourglass_bottom</i>
            {DatetimeFormatter.formatDeadlineDate(new Date(jobad.application_deadline), useEng ? "en" : "no")}
          </li>
        </ul>
        {!disableTags &&
          <div className="jobad-card__tags">
            <Tags
              highlight={jobad.highlight}
              timePublish={new Date(jobad.time_publish)}
            />
          </div>
        }
      </div>
    </Link>
  )
}

export default withTranslation('jobadListPage')(JobadCard);