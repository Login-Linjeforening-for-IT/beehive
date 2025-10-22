import config from '@config'
import Tags from '@components/shared/tags/Tags'
import Link from 'next/link'
import Image from 'next/image'
import HourglassBottom from '@components/svg/symbols/HourglassBottom'
import { formatDeadlineDate } from '@utils/DatetimeFormatter'
import { cookies } from 'next/headers'
import './JobadCard.css'
import Pin from '@components/svg/symbols/Pin'
import DefaultJobBanner from '@components/svg/defaultbanners/DefaultJobBanner'

type JobadCardProps = {
    jobad: GetJobProps
    highlight?: boolean
    disableTags?: boolean
}

export default async function JobadCard({ jobad, highlight = true, disableTags = false }: JobadCardProps) {
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang
    return (
        <Link href={`/career/${jobad.id}`}>
            <div className={`jobad-card ${highlight ? 'jobad-card--highlight' : ''}`}>
                <div className='jobad-card_wrapper'>
                    <div className='relative jobad-card_picture'>
                        {jobad.banner_image || jobad.organization.logo ? (
                            <Image
                                src={jobad.organization.logo ? `${config.url.CDN_URL}/img/organizations/${jobad.organization.logo}` : `${config.url.CDN_URL}/img/jobs/${jobad.banner_image}`}
                                alt={jobad.banner_image ?? 'Job banner image'}
                                fill={true}
                                className='object-cover jobad-card_img'
                            />
                        ) : (
                            <DefaultJobBanner color={'#545b5f'} className='jobad-card_img' transition={false} />
                        )}
                    </div>
                    <div className='jobad-card_info'>
                        <div className='jobad-card_name'>{lang === 'en' && jobad.title_en ? jobad.title_en : jobad.title_no}</div>
                        <ul className='jobad-card_details'>
                            <li className='flex jobad-card_detail'>
                                <HourglassBottom className='jobad-card_icon w-6 fill-[var(--color-text-regular)]'/>
                                {formatDeadlineDate(new Date(jobad.time_expire), lang)}
                            </li>
                            {jobad.cities && (
                                <li className='flex jobad-card_detail'>
                                    <Pin className='jobad-card_icon w-6 fill-[var(--color-text-regular)]'/>
                                    {jobad.cities.join(' ')}
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
