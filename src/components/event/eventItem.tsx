import DateTile from '@components/datetile/dateTile'
import Tags from '@components/tags/tags'
import DefaultEventBanner from '@svg/defaultbanners/defaultEventBanner'
import DefaultCtfBanner from '@svg/defaultbanners/defaultCtfBanner'
import DefaultTekkomBanner from '@svg/defaultbanners/defaultTekkomBanner'
import DefaultBedpresBanner from '@svg/defaultbanners/defaultBedpresBanner'
import DefaultSocialBanner from '@svg/defaultbanners/defaultSocialBanner'
import config from '@config'
import Link from 'next/link'
import Pin from '@components/svg/symbols/pin'
import Schedule from '@components/svg/symbols/schedule'
import { isNew } from '@utils/datetimeFormatter'
import { formatEventStartDate, isOngoing } from '@utils/datetimeFormatter'
import './eventItem.css'
import Image from 'next/image'
import { cookies } from 'next/headers'

type EventListItemProps = {
    event: GetEventProps
    highlight: boolean
    disableTags?: boolean
    variant: string
}

export default async function EventListItem({ event, highlight = true, disableTags = false, variant='list-item' }: EventListItemProps) {
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang

    // eslint-disable-next-line
    function useTags(publishTime: any, highlight: any, canceled: boolean, full: boolean, ongoing: boolean) {
        if (disableTags) return false
        if (highlight) return true
        if (isNew(publishTime)) return true
        if (canceled) return true
        if (full) return true
        if (ongoing) return true
        return false
    }

    const startDate = new Date(event.time_start)
    const endDate = new Date(event.time_end)

    return (
        <Link href={`/events/${event.id}`}>
            <div className={`event-item ${highlight ? 'event-item--highlight' : ''} ${variant === 'card' ? 'event-item--card' : 'event-item--list-item'}`}>
                <div className='event-item_wrapper'>
                    {variant === 'list-item' ? (
                        <DateTile
                            startDate={new Date(event.time_start)}
                            endDate={new Date(event.time_end)}
                            color={event.category.color}
                            day={event.category.name_no.toLowerCase() === 'fadderuka' ? true : false}
                        />
                    ) : (
                        <div className='relative event-item_picture'>
                            <div className='event-item_date-overlay'>
                                <DateTile
                                    startDate={new Date(event.time_start)}
                                    endDate={new Date(event.time_end)}
                                    color={event.category.color}
                                    opacity={0.5}
                                    varient='overlay'
                                    useDayText={event.category.name_no.toLowerCase() === 'fadderuka' ? true : false}
                                />
                            </div>
                            {event.image_small ? (
                                <Image
                                    src={config.url.CDN_URL + '/img/events/' + event.image_small}
                                    alt={event.image_small}
                                    fill={true}
                                    className='object-cover'
                                />
                            ) : (
                                getDefaultBanner(event.category.name_no, event.category.color)
                            )}
                        </div>
                    )}
                    <div className='event-item_info'>
                        <div className='event-item_name'>{lang === 'en' && event.name_en ? event.name_en : event.name_no}</div>
                        <ul className='event-item_details color-[#e6e6e6]'>
                            {(event.time_type.toLowerCase() != 'whole_day') &&
                                <li className='flex text-[0.9rem]'>
                                    <Schedule className='w-[22px] h-[22px] event-item_icon fill-[var(--color-text-main)]' />
                                    {event.time_type.toLowerCase() != 'to_be_determined' ?
                                        formatEventStartDate(new Date(event.time_start), lang)
                                        :
                                        'TBD'
                                    }
                                </li>
                            }
                            {event.location && (
                                <li className='flex text-[0.9rem]'>
                                    <Pin className='w-6 h-6 fill-[var(--color-text-main)] event-item_icon' />
                                    {lang === 'en' ? event.location.name_en : event.location.name_no}
                                </li>
                            )}
                        </ul>
                        {useTags(event.time_publish, event.highlight, event.canceled, event.is_full, isOngoing(startDate, endDate)) &&
                            <div className='event-item_tags'>
                                <Tags
                                    highlight={event.highlight}
                                    timePublish={new Date(event.time_publish)}
                                    canceled={event.canceled}
                                    full={event.is_full}
                                    ongoing={isOngoing(startDate, endDate)}
                                />
                            </div>
                        }
                    </div>
                    {variant === 'list-item' &&
                        <div className='relative event-item_picture'>
                            {event.image_small ? (
                                <Image
                                    src={`${config.url.CDN_URL}/img/events/${event.image_small}`}
                                    alt={event.image_small}
                                    fill={true}
                                    className='object-cover'
                                />
                            ) : (
                                getDefaultBanner(event.category.name_no, event.category.color)
                            )}
                        </div>
                    }
                </div>
            </div>
        </Link>
    )
}

function getDefaultBanner(category: string, color: string) {
    switch (category) {
        case 'Sosialt':
            {/* @ts-ignore */}
            return <DefaultSocialBanner color={color} className='event-item_img' />
        case 'EvntKom':
            {/* @ts-ignore */}
            return <DefaultSocialBanner color={color} className='event-item_img' />
        case 'TekKom':
            {/* @ts-ignore */}
            return <DefaultTekkomBanner color={color} className='event-item_img' />
        case 'CTF':
            {/* @ts-ignore */}
            return <DefaultCtfBanner color={color} className='event-item_img' />
        case 'BedKom':
            {/* @ts-ignore */}
            return <DefaultBedpresBanner color={color} className='event-item_img' />
        default:
            {/* @ts-ignore */}
            return <DefaultEventBanner color={color} className='event-item_img' />
    }
}
