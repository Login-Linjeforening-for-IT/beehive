import config from '@config'
import Tags from '@components/shared/tags/Tags'
import Link from 'next/link'
import Image from 'next/image'
import HourglassBottom from '@components/svg/symbols/HourglassBottom'
import { formatDeadlineDate } from '@utils/DatetimeFormatter'
import { cookies } from 'next/headers'
import './JobadCard.css'
import Pin from '@components/svg/symbols/Pin'

// eslint-disable-next-line
export default async function JobadCard({ jobad, highlight = true, disableTags = false }: any) {
    const lang = (await cookies()).get('lang')?.value || 'no'
    return (
        <Link href={`/career/${jobad.id}`}>
            <div className={`jobad-card ${highlight ? 'jobad-card--highlight' : ''}`}>
                <div className='jobad-card_wrapper'>
                    <div className='relative jobad-card_picture'>
                        {jobad.organization_logo ? (
                            <Image
                                src={`${config.url.CDN_URL}/img/organizations/${jobad.organization_logo}`}
                                alt={jobad.organization_logo}
                                fill={true}
                                className='object-contain jobad-card_img'
                            />
                        ) : (
                            <Image
                                src={'/assets/img/placeholders/jobad.svg'}
                                alt={'Jobad placeholder'}
                                fill={true}
                                className='object-contain jobad-card_img'
                            />
                        )}
                    </div>
                    <div className='jobad-card_info'>
                        <div className='jobad-card_name'>{lang === 'en' && jobad.title_en ? jobad.title_en : jobad.title_no}</div>
                        <ul className='jobad-card_details'>
                            <li className='flex jobad-card_detail'>
                                <HourglassBottom className='jobad-card_icon w-6 fill-[var(--color-text-regular)]'/>
                                {formatDeadlineDate(new Date(jobad.application_deadline), lang)}
                            </li>
                            {jobad.location && (
                                <li className='flex jobad-card_detail'>
                                    <Pin className='jobad-card_icon w-6 fill-[var(--color-text-regular)]'/>
                                    {jobad.location}
                                </li>
                            )}
                        </ul>
                        {!disableTags && (
                            <div className='jobad-card_tags'>
                                <Tags
                                    highlight={jobad.highlight}
                                    timePublish={new Date(jobad.time_publish)}
                                    canceled={false}
                                    full={false}
                                    ongoing={false}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}
