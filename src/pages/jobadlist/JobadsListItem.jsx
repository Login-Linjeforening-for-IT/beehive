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

const JobadsListItem = ({jobad, t}) => {

  const {i18n} = useTranslation()
  const useEng = i18n.language === 'en'
  const tr = getTranslation(useEng);

  const deadline = new Date(jobad.deadline);

  const [imgSrc, setImgSrc] = useState(ImageLinker.getCDNLink(jobad.organization.logo));
  const handleError = () => setImgSrc(fallbackImg)

  return (
    <div className='jobads-item'>
      <picture className='jobads-item__picture jobads-item__picture--new'>
        {isNew(jobad.time_publish) &&
          <div className='jobads-item__new-sticker'>{t('newSticker')}</div>
        }
        <img className='jobads-item__img' alt={jobad.organization.logo}  src={imgSrc} onError={handleError} />
      </picture>
      <div className='jobads-item__info'>
        <div className='jobads-item__name'>{tr(jobad.name_en, jobad.name_no)}</div>
        <ul className='jobads-item__details'>
          <li className='jobads-item__detail'>
            <i className='jobads-item__icon material-symbols-sharp'>hourglass_bottom</i>
            {DatetimeFormatter.formatDateDT(deadline, useEng ? "en" : "no")}
          </li>
          <li className='jobads-item__detail'>
            <i className='jobads-item__icon material-symbols-sharp'>apartment</i>
            {tr(jobad.organization.name_en, jobad.organization.name_no)}
          </li>
          {(jobad.position_title_no || jobad.type_no) && 
            <li className='jobads-item__detail'>
              <i className='jobads-item__icon material-symbols-sharp'>badge</i>
              {tr(jobad.position_title_en, jobad.position_title_no)}, {t(jobad.type_en, jobad.type_no)}
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
  )
}

export default withTranslation('jobadListPage')(JobadsListItem);