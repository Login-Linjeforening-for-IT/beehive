import { useState, useEffect } from 'react';
import { withTranslation, useTranslation } from 'react-i18next'
import * as ImageLinker from '../../utils/ImageLinker'
import './JobadsListItem.css'
import fallbackImg from './jobad-fallback-logo.svg'
import * as DatetimeFormatter from '../../utils/DatetimeFormatter'

const getTranslation = (useEng) => {
  if(!useEng) return (_, no) => {
    return no
  }

  return (en, no) => {
    return en ? en : no
  }
}

const isNew = (publishedDate) => {

  let difLim = 7 * 24 * 60 * 60 * 1000 // one week
  let dateNow = new Date()

  return (dateNow - Date.parse(publishedDate)) < difLim;
}

const formatCities = (cities) => {

  const charLim = 30 // limit of characters
  let counter = 0
  let arr = []

  for(var i in cities) {
    counter += cities[i].length + 2 // count number of characters + 2 (, )

    if(counter >= charLim) {
      return (
        <>
          {arr.join(', ')}, <span className='jobads-item__detail-overflowNum'>+{cities.length - i}</span>
        </>
      )
    }
    arr.push(cities[i])
  }

  return (arr.join(', '))
}


const JobadsListItem = ({ i18n, jobad, t}) => {

  const useEng = i18n.language === 'en';
  const tr = getTranslation(useEng);

  const [imgSrc, setImgSrc] = useState(ImageLinker.getCDNLink(jobad.organization_logo));
  const handleError = () => setImgSrc(fallbackImg)

  return (
    <div className={jobad.highlight ? "jobads-item jobads-item--highlight" : "jobads-item" }>
      <div className="jobads-item__wrapper">
        <picture className='jobads-item__picture'>
          <img className='jobads-item__img' alt={jobad.organization_logo}  src={imgSrc} onError={handleError} />
        </picture>
        <div className='jobads-item__info'>
          <div className="jobads-item__tags">
            {isNew(jobad.time_publish) &&
              <div className='jobads-item__tag tag--primary'>{t("new")}</div>
            }
            {jobad.highlight &&
              <div className="jobads-item__tag tag--primary">{t("highlight")}</div>
            }
          </div>
          <div className='jobads-item__name'>{tr(jobad.title_en, jobad.title_no)}</div>
          <ul className='jobads-item__details'>
            <li className='jobads-item__detail'>
              <i className='jobads-item__icon material-symbols-sharp'>hourglass_bottom</i>
              {DatetimeFormatter.formatDateDT(new Date(jobad.application_deadline), useEng ? "en" : "no")}
            </li>
            <li className='jobads-item__detail'>
              <i className='jobads-item__icon material-symbols-sharp'>apartment</i>
              {tr(jobad.organization_name_en, jobad.organization_name_no)}
            </li>
            {(jobad.title_no || jobad.type_no) && 
              <li className='jobads-item__detail'>
                <i className='jobads-item__icon material-symbols-sharp'>badge</i>
                {tr(jobad.position_title_en, jobad.position_title_no)}, {jobad.job_type}
              </li>
            }
            {jobad.cities.length > 0 &&
              <li className='jobads-item__detail'>
                <i className='jobads-item__icon material-symbols-sharp'>location_on</i>
                {formatCities(jobad.cities)}
              </li>
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default withTranslation('jobadListPage')(JobadsListItem);