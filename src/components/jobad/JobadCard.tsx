import config from '@config'
import Tags from '@components/shared/tags/Tags'
import Link from 'next/link'
import Image from 'next/image'
import HourglassBottom from '@components/svg/symbols/HourglassBottom'
import { formatDeadlineDate } from '@utils/DatetimeFormatter'
import { cookies } from 'next/headers'
import './JobadCard.css'

// eslint-disable-next-line
export default async function JobadCard({ jobad, disableTags=false }: any) {
    // const lang = (await cookies()).get('lang')?.value || 'no'
    const lang = (await cookies()).get('lang')?.value || 'no'
    return (
        <Link href={`/career/${jobad.id}`}>
            <div className='grid rounded-lg overflow-hidden w-[50px] h-[50px] relative'>
                <Image
                    src={jobad.organization_logo ? `${config.url.CDN_URL}/img/organizations/${jobad.organization_logo}` : '@assets/img/placeholders/jobad.svg'}
                    alt={jobad.organization_logo}
                    fill={true}
                />
                <div className='jobad-card_name'>{lang ? jobad.title_en : jobad.title_no}</div>
                <ul className='jobad-card_details'>
                    <li className='jobad-card_detail'>
                        <HourglassBottom className='jobad-card_icon'/>
                        {formatDeadlineDate(new Date(jobad.application_deadline), lang ? 'en' : 'no')}
                    </li>
                </ul>
                {!disableTags &&
                <div className='jobad-card_tags'>
                    <Tags
                        highlight={jobad.highlight}
                        timePublish={new Date(jobad.time_publish)}
                        canceled={false}
                        full={false}
                        ongoing={false}
                    />
                </div>
                }
            </div>
        </Link>
    )
}
