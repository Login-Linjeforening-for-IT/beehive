import config from '@config'
import Tags from '@components/shared/tags/Tags'
import Link from 'next/link'
import { isNew } from '@utils/DatetimeFormatter'
import { formatDeadlineDate } from '@utils/DatetimeFormatter'
import Image from 'next/image'
import Pin from '@components/svg/symbols/Pin'
import WorkHistory from '@components/svg/symbols/WorkHistory'
import Apartment from '@components/svg/symbols/Apartment'
import HourglassBottom from '@components/svg/symbols/HourglassBottom'
import './JobadsListItem.css'
import { cookies } from 'next/headers'

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
export default async function JobadsListItem({ jobad }: any) {
    const lang = (await cookies()).get('lang')?.value || 'no'
  
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
                    <div className='relative h-full aspect-[3/2] 400px:h-[4.5rem] 600px:h-[7rem] 800px:h-[8rem] jobads-item_picture'>
                        {jobad.organization_logo ? (
                            <Image
                                className='jobads-item_img'
                                src={`${config.url.CDN_URL}/img/organizations/${jobad.organization_logo}`}
                                alt={jobad.organization_logo}
                                fill={true}
                            />
                        ) : (
                            <Image 
                                className='jobads-item_img'
                                alt={'fallback image'}
                                src='/assets/img/placeholders/jobad.svg'
                                fill={true}
                            />
                        )}
                    </div>
                    <div className='jobads-item_info'>
                        <div className='jobads-item_name'>{lang === 'en' && jobad.title_en ? jobad.title_en : jobad.title_no}</div>
                        <ul className='jobads-item_details'>
                            <li className='flex flex-row jobads-item_detail'>
                                <HourglassBottom className='w-[1.5rem] h-[1.5rem] fill-[var(--color-text-discreet)] jobads-item_icon'/>
                                {formatDeadlineDate(new Date(jobad.application_deadline), lang)}
                            </li>
                            <li className='flex flex-row jobads-item_detail'>
                                <Apartment className='w-[1.5rem] h-[1.5rem] fill-[var(--color-text-discreet)] jobads-item_icon'/>
                                {lang === 'en' && jobad.organization_name_en ? jobad.organization_name_en : jobad.organization_name_no}
                            </li>
                            {jobad.job_type && 
                                <li className='flex flex-row jobads-item_detail'>
                                    <WorkHistory className='w-[1.5rem] h-[1.5rem] fill-[var(--color-text-discreet)] jobads-item_icon'/>
                                    {getJobTypeLabel(jobad.job_type, lang)}
                                </li>
                            }
                            {jobad.cities && jobad.cities.length > 0 &&
                                <li className='flex flex-row items-center jobads-item_detail'>
                                    <Pin className='w-[1.5rem] h-[1.5rem] fill-[var(--color-text-discreet)] jobads-item_icon' />
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

// eslint-disable-next-line
function getJobTypeLabel(job_type: any, lang = 'no') {
    // @ts-ignore
    const labelNo = jobTypeTranslations['no'][job_type] || job_type
    // @ts-ignore
    const labelEn = jobTypeTranslations['en'][job_type] || labelNo

    return lang === 'en' && labelEn ? labelEn : labelNo
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
