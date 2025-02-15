import DateTile from '@components/shared/datetile/DateTile'
import Tags from '@components/shared/tags/Tags'
import DefaultEventBanner from '@svg/defaultbanners/DefaultEventBanner'
import DefaultCtfBanner from '@svg/defaultbanners/DefaultCtfBanner'
import DefaultTekkomBanner from '@svg/defaultbanners/DefaultTekkomBanner'
import DefaultBedpresBanner from '@svg/defaultbanners/DefaultBedpresBanner'
import DefaultSocialBanner from '@svg/defaultbanners/DefaultSocialBanner'
import config from '@config'
import Link from 'next/link'
import Pin from '@components/svg/symbols/Pin'
import Schedule from '@components/svg/symbols/Schedule'
import { isNew } from '@utils/DatetimeFormatter'
import { formatEventStartDate, isOngoing } from '@utils/DatetimeFormatter'
import './EventItem.css'
import Image from 'next/image'
import { cookies } from 'next/headers'

type EventListItemProps = { 
    // eslint-disable-next-line
    event: any
    highlight: boolean
    disableTags?: boolean
    variant: string 
}

export default async function EventListItem({ event, highlight = true, disableTags = false, variant='list-item' }: EventListItemProps) {
    const lang = (await cookies()).get('lang')?.value || 'no'

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

    const startDate = new Date(event.startDate)
    const endDate = new Date(event.endDate)

    return (
        <Link href={`/events/${event.id}`}>
            <div className={`event-item ${highlight ? 'event-item--highlight' : ''} ${variant === 'card' ? 'event-item--card' : 'event-item--list-item'}`}>
                <div className='event-item_wrapper'>
                    {variant === 'list-item' ? (
                        <DateTile
                            startDate={new Date(event.time_start)}
                            endDate={new Date(event.time_end)}
                            color={event.category_color}
                            day={event.category_name_no === 'Fadderuka' ? true : false}
                        />
                    ) : (
                        <>
                            <div className='event-item_date-overlay'>
                                <DateTile
                                    startDate={new Date(event.time_start)}
                                    endDate={new Date(event.time_end)}
                                    color={event.category_color}
                                    opacity={0.5}
                                    varient='overlay'
                                    useDayText={event.category_name_no === 'Fadderuka' ? true : false}
                                />
                            </div>
                            <picture className='event-item_picture'>
                                {event.image_small ? (
                                    <Image
                                        src={config.url.CDN_URL + '/img/events/small/' + event.image_small}
                                        alt={event.image_small}
                                        fill={true}
                                    />
                                ) : (
                                    getDefaultBanner(event.category_name_no, event.category_color)
                                )}
                            </picture>
                        </>
                    )}
                    <div className='event-item_info'>
                        <div className='event-item_name'>{lang ? event.name_en : event.name_no}</div>
                        <ul className='event-item_details'>
                            {(event.time_type.toLowerCase() != 'whole_day') &&
                                <li className='flex'>
                                    <Schedule className='event-item_icon fill-white-500' fill="white" height={22} width={22} />
                                    {event.time_type.toLowerCase() != 'tbd' ? 
                                        formatEventStartDate(new Date(event.time_start), lang)
                                        :
                                        'TBD'
                                    }
                                </li>
                            }
                            {event.location_name_no && (
                                <li className='flex'>
                                    <Pin className='w-[1.5rem] h-[1.5rem] fill-white event-item_icon' />
                                    {lang ? event.location_name_en : event.location_name_no}
                                </li>
                            )}
                        </ul>
                        {useTags(event.time_publish, event.highlight, event.canceled, event.full, isOngoing(startDate, endDate)) &&
                            <div className='event-item_tags'>
                                <Tags
                                    highlight={event.highlight}
                                    timePublish={new Date(event.time_publish)}
                                    canceled={event.canceled}
                                    full={event.full}
                                    ongoing={isOngoing(startDate, endDate)}
                                />
                            </div>
                        }
                    </div>
                    {variant === 'list-item' &&
                        <picture className='event-item_picture'>
                            {event.image_small ? (
                                <Image
                                    src={`${config.url.CDN_URL}/img/events/small/${event.image_small}`}
                                    alt={event.image_small}
                                    fill={true}
                                />
                            ) : (
                                getDefaultBanner(event.category_name_no, event.category_color)
                            )}
                        </picture>
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
    case 'TekKom':
        {/* @ts-ignore */}
        return <DefaultTekkomBanner color={color} className='event-item_img' />
    case 'CTF':
        {/* @ts-ignore */}
        return <DefaultCtfBanner color={color} className='event-item_img' />
    case 'Bedpres':
        {/* @ts-ignore */}
        return <DefaultBedpresBanner color={color} className='event-item_img' />
    default:
        {/* @ts-ignore */}
        return <DefaultEventBanner color={color} className='event-item_img' />
    }
}
