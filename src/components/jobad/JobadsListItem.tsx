'use client'

import { useState, useEffect, useContext } from 'react'
import './JobadsListItem.css'
import config from '@config'
import Tags from '@components/shared/tags/Tags'
import RenderSmoothImage from '@components/shared/images/rendersmoothimage/RenderSmoothImage'
import Link from 'next/link'
import { isNew } from '@utils/DatetimeFormatter'
import { formatDeadlineDate } from '@utils/DatetimeFormatter'
import Image from 'next/image'
import AppContext from '@context/context'
import Pin from '@components/svg/symbols/Pin'

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

// eslint-disable-next-line
function getJobTypeLabel(job_type: any, lang = 'no') {
    // @ts-ignore
    const labelNo = jobTypeTranslations['no'][job_type] || job_type
    // @ts-ignore
    const labelEn = jobTypeTranslations['en'][job_type] || labelNo

    return lang === 'en' ? labelEn : labelNo
}

// eslint-disable-next-line
function formatCities(cities: any[]) {

    const characterLimit = 30
    let counter = 0
    const arr = []

    for (let i = 0; i < cities.length; i++) {
        counter += cities[i].length + 2

        if (counter >= characterLimit) {
            return (
                <>
                    {arr.join(', ')}, <span className='jobads-item_detail-overflow-number'>+{cities.length - i}</span>
                </>
            )
        }
        arr.push(cities[i])
    }

    return (arr.join(', '))
}

// eslint-disable-next-line
export default function JobadsListItem({ jobad }: any) {
    const [useFallbackImg, setUseFallbackImg] = useState(false)
    const { lang } = useContext(AppContext)

    useEffect(() => {
        setUseFallbackImg(false)
    }, [jobad.organization_logo])
  
    // eslint-disable-next-line
    function useTags(publishTime: any, highlight: any) {
        if (highlight) return true
        if (isNew(publishTime)) return true
        return false
    }

    return (
        <Link href={`/career/${jobad.id}`}>
            <div className={jobad.highlight ? 'jobads-item jobads-item--highlight' : 'jobads-item' }>
                <div className={useTags(jobad.time_publish, jobad.highlight) ? 'jobads-item_wrapper jobads-item_wrapper--with-tags' : 'jobads-item_wrapper' }>
                    {useTags(jobad.time_publish, jobad.highlight) && 
            <div className='jobads-item_tags'>
                <Tags
                    highlight={jobad.highlight}
                    timePublish={new Date(jobad.time_publish)}
                    canceled={false}
                    full={false}
                    ongoing={false}
                />
            </div>
                    }
                    <picture className='jobads-item_picture'>
                        {(jobad.organization_logo && !useFallbackImg) ? (
                            <RenderSmoothImage
                                className='jobads-item_img'
                                alt={jobad.organization_logo}
                                src={`${config.url.CDN_URL}/img/organizations/${jobad.organization_logo}`}
                                onError={() => setUseFallbackImg(true)}
                                transition={false}
                            />
                        ) : (
                            <Image 
                                className='jobads-item_img'
                                alt={jobad.organization_logo}
                                src='@assets/img/placeholders/jobad.svg'
                                fill={true}
                            />
                        )}
                    </picture>
                    <div className='jobads-item_info'>
                        <div className='jobads-item_name'>{lang === 'en' ? jobad.title_en : jobad.title_no}</div>
                        <ul className='jobads-item_details'>
                            <li className='jobads-item_detail'>
                                <i className='jobads-item_icon material-symbols-sharp'>hourglass_bottom</i>
                                {formatDeadlineDate(new Date(jobad.application_deadline), lang)}
                            </li>
                            <li className='jobads-item_detail'>
                                <i className='jobads-item_icon material-symbols-sharp'>apartment</i>
                                {lang === 'en' ? jobad.organization_name_en : jobad.organization_name_no}
                            </li>
                            {jobad.job_type && 
                                <li className='jobads-item_detail'>
                                    <i className='jobads-item_icon material-symbols-sharp'>work_history</i>
                                    {getJobTypeLabel(jobad.job_type, lang)}
                                </li>
                            }
                            {jobad.cities && jobad.cities.length > 0 &&
                                <li className='flex flex-row items-center jobads-item_detail'>
                                    <Pin size='1.5rem' fill='white' className='jobads-item_icon' />
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
