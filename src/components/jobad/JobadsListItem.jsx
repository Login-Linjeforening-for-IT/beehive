import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from 'react-i18next'
import './JobadsListItem.css'
import fallbackImg from '../../assets/img/placeholders/jobad-logo__placeholder.svg'
import * as DatetimeFormatter from '../../utils/DatetimeFormatter'
import * as Translator from '../../utils/GetTranslation'
import { config } from "../../Constants";
import { isNew } from '../../utils/DatetimeFormatter';
import Tags from '../tags/Tags';

const jobTypeTranslations = {
  no: {
    summer: 'Sommerjobb',
    full: 'Fulltid',
    verv: 'Verv',
    part: 'Deltid'
  },
  en: {
    summer: 'Sommer job',
    full: 'Fulltime',
    verv: 'Voluntary',
    part: 'Parttime'
  }
}

const getJobTypeLabel = (job_type, lang="no") => {
  const labelNo = jobTypeTranslations['no'][job_type] || job_type;
  let labelEn = jobTypeTranslations['en'][job_type] || labelNo;

  return lang === "en" ? labelEn : labelNo;
};


const formatCities = (cities) => {

  const charLim = 30 // limit of characters
  let counter = 0
  let arr = []

  for(var i in cities) {
    counter += cities[i].length + 2 // count number of characters + 2 for comma and space

    if(counter >= charLim) {
      return (
        <>
          {arr.join(', ')}, <span className='jobads-item__detail-overflow-number'>+{cities.length - i}</span>
        </>
      )
    }
    arr.push(cities[i])
  }

  return (arr.join(', '))
}


const JobadsListItem = ({ i18n, t, jobad }) => {

  const useEng = i18n.language === 'en';
  const tr = Translator.getTranslation(useEng);

  const [useFallbackImg, setUseFallbackImg] = useState(false);

  useEffect(() => {
		setUseFallbackImg(false);
	}, [jobad.organization_logo]);
  
  const handleImgError = () => setUseFallbackImg(true);

  const useTags = (publishTime, highlight) => {
    if (highlight) return true;
    if (isNew(publishTime)) return true;
    return false;
  }

  return (
    <Link to={'/career/' + jobad.id}>
      <div className={jobad.highlight ? "jobads-item jobads-item--highlight" : "jobads-item" }>
        <div className={useTags(jobad.time_publish, jobad.highlight) ? "jobads-item__wrapper jobads-item__wrapper--with-tags" : "jobads-item__wrapper" }>
          {useTags(jobad.time_publish, jobad.highlight) && 
            <div className="jobads-item__tags">
              <Tags
                highlight={jobad.highlight}
                timePublish={new Date(jobad.time_publish)}
              />
            </div>
          }
          <picture className='jobads-item__picture'>
            <img className='jobads-item__img'
              alt={jobad.organization_logo}
              src={useFallbackImg ? fallbackImg : config.url.CDN_URL + '/img/organizations/' + jobad.organization_logo}
              onError={handleImgError}
              loading="lazy"
            />
          </picture>
          <div className='jobads-item__info'>
            <div className='jobads-item__name'>{tr(jobad.title_en, jobad.title_no)}</div>
            <ul className='jobads-item__details'>
              <li className='jobads-item__detail'>
                <i className='jobads-item__icon material-symbols-sharp'>hourglass_bottom</i>
                {DatetimeFormatter.formatDeadlineDate(new Date(jobad.application_deadline), useEng ? "en" : "no")}
              </li>
              <li className='jobads-item__detail'>
                <i className='jobads-item__icon material-symbols-sharp'>apartment</i>
                {tr(jobad.organization_name_en, jobad.organization_name_no)}
              </li>
              {jobad.job_type && 
                <li className='jobads-item__detail'>
                  <i className='jobads-item__icon material-symbols-sharp'>work_history</i>
                  {getJobTypeLabel(jobad.job_type, useEng ? 'en' : 'no')}
                </li>
              }
              {jobad.cities && jobad.cities.length > 0 &&
                <li className='jobads-item__detail'>
                  <i className='jobads-item__icon material-symbols-sharp'>location_on</i>
                  {formatCities(jobad.cities)}
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default withTranslation('jobadListPage')(JobadsListItem);