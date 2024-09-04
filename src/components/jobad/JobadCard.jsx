import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next'
import { config } from "../../Constants";

import fallbackImg from '../../assets/img/placeholders/jobad-logo__placeholder.svg'
import * as DatetimeFormatter from '../../utils/DatetimeFormatter'
import * as Translator from '../../utils/GetTranslation'

import Tags from '../tags/Tags';
import RenderSmoothImage from '../images/rendersmoothimage/RenderSmoothImage';

import './JobadCard.css'


const JobadCard = ({ i18n, jobad, disableTags=false }) => {

  const useEng = i18n.language === 'en';
  const tr = Translator.getTranslation(useEng);

  const [useFallbackImg, setUseFallbackImg] = useState(false);

  useEffect(() => {
		setUseFallbackImg(false);
	}, [jobad.organization_logo]);

  return (
    <Link to={'/career/' + jobad.id}>
      <div className='jobad-card'>
        <picture className='jobad-card__picture'>
          {(jobad.organization_logo && !useFallbackImg) ? (
            <RenderSmoothImage
              className="jobad-card__img"
              alt={jobad.organization_logo}
              src={config.url.CDN_URL + '/img/organizations/' + jobad.organization_logo}
              onError={() => setUseFallbackImg(true)}
              transition={false}
            />
          ) : (
            <img className='jobad-card__img'
              alt={jobad.organization_logo}
              src={fallbackImg}
            />
          )}
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