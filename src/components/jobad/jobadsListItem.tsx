import config from '@config'
import Tags from '@components/tags/tags'
import Link from 'next/link'
import { isNew } from '@utils/datetimeFormatter'
import { formatDeadlineDate } from '@utils/datetimeFormatter'
import Image from 'next/image'
import Pin from '@components/svg/symbols/pin'
import WorkHistory from '@components/svg/symbols/workHistory'
import Apartment from '@components/svg/symbols/apartment'
import HourglassBottom from '@components/svg/symbols/hourglassBottom'
import './jobadsListItem.css'
import { cookies } from 'next/headers'
import DefaultJobBanner from '@components/svg/defaultbanners/defaultJobBanner'

export default async function JobadsListItem({ jobad }: {jobad: GetJobProps}) {
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang

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
                    <div className='relative aspect-[5/2] w-[12.5rem] h-[5rem] jobads-item_picture'>
                        {jobad.organization.logo ? (
                            <Image
                                className='jobads-item_img'
                                src={`${config.url.CDN_URL}/img/organizations/${jobad.organization.logo}`}
                                alt={jobad.organization.logo}
                                fill={true}
                            />
                        ) : (
                            <DefaultJobBanner color={'#545b5f'} className='jobads-item_img' transition={false} />
                        )}
                    </div>
                    <div className='jobads-item_info'>
                        <div className='jobads-item_name'>{lang === 'en' && jobad.title_en ? jobad.title_en : jobad.title_no}</div>
                        <ul className='jobads-item_details'>
                            <li className='flex flex-row jobads-item_detail'>
                                <HourglassBottom className='w-[1.5rem] h-[1.5rem] fill-[var(--color-text-discreet)] jobads-item_icon'/>
                                {formatDeadlineDate(new Date(jobad.time_expire), lang)}
                            </li>
                            <li className='flex flex-row jobads-item_detail'>
                                <Apartment className='w-[1.5rem] h-[1.5rem] fill-[var(--color-text-discreet)] jobads-item_icon'/>
                                {lang === 'en' ? jobad.organization.name_en : jobad.organization.name_no}
                            </li>
                            {jobad.job_type &&
                                <li className='flex flex-row jobads-item_detail'>
                                    <WorkHistory className='w-[1.5rem] h-[1.5rem] fill-[var(--color-text-discreet)] jobads-item_icon'/>
                                    {lang === 'en' ? jobad.job_type.name_en : jobad.job_type.name_no}
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

function formatCities(cities: unknown[]) {

    const characterLimit = 30
    let counter = 0
    const arr = []

    for (let i = 0; i < cities.length; i++) {
        counter += (cities[i] as string).length + 2

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
