'use client'

import { useContext, useState } from 'react'
import DateTile from '@components/shared/datetile/DateTile'
import Tags from '@components/shared/tags/Tags'
import RenderSmoothImage from '@components/shared/images/rendersmoothimage/RenderSmoothImage'
import DefaultEventBanner from '@svg/defaultbanners/DefaultEventBanner'
import DefaultCtfBanner from '@svg/defaultbanners/DefaultCtfBanner'
import DefaultTekkomBanner from '@svg/defaultbanners/DefaultTekkomBanner'
import DefaultBedpresBanner from '@svg/defaultbanners/DefaultBedpresBanner'
import DefaultSocialBanner from '@svg/defaultbanners/DefaultSocialBanner'
import { isNew } from '@utils/DatetimeFormatter'
import config from '@config'
import Link from 'next/link'
import './EventItem.css'
import { formatEventStartDate, isOngoing } from '@utils/DatetimeFormatter'
import AppContext from '@context/context'

type EventListItemProps = { 
  event: any
  highlight: boolean
  disableTags?: boolean
  variant: string 
}

export default function EventListItem({ event, highlight = true, disableTags = false, variant='list-item' }: EventListItemProps) {
    const [showImage, setShowImage] = useState(true)
    const { lang } = useContext(AppContext)

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
                <div className="event-item_wrapper">
                    {variant === 'list-item' ? (
                        <DateTile
                            startDate={new Date(event.time_start)}
                            endDate={new Date(event.time_end)}
                            color={event.category_color}
                            day={event.category_name_no === 'Fadderuka' ? true : false}
                        />
                    ) : (
                        <>
                            <div className="event-item_date-overlay">
                                <DateTile
                                    startDate={new Date(event.time_start)}
                                    endDate={new Date(event.time_end)}
                                    color={event.category_color}
                                    opacity={0.5}
                                    varient="overlay"
                                    useDayText={event.category_name_no === 'Fadderuka' ? true : false}
                                />
                            </div>
                            <picture className="event-item_picture">
                                {(event.image_small && showImage) ? (
                                    <RenderSmoothImage
                                        className="event-item_img"
                                        alt={event.image_small}
                                        src={config.url.CDN_URL + '/img/events/small/' + event.image_small}
                                        onError={() => setShowImage(false)}
                                    />
                                ) : (
                                    getDefaultBanner(event.category_name_no, event.category_color)
                                )}
                            </picture>
                        </>
                    )}
                    <div className="event-item_info">
                        <div className="event-item_name">{lang ? event.name_en : event.name_no}</div>
                        <ul className="event-item_details">
                            {(event.time_type.toLowerCase() != 'whole_day') &&
                <li className="event-item_detail">
                    <i className="event-item_icon material-symbols-sharp">
                        schedule
                    </i>
                    {event.time_type.toLowerCase() != 'tbd' ? 
                        formatEventStartDate(new Date(event.time_start), lang)
                        :
                        'TBD'
                    }
                </li>
                            }
                            {event.location_name_no && (
                                <li className="event-item_detail">
                                    <i className="event-item_icon material-symbols-sharp">
                                        location_on
                                    </i>
                                    {lang ? event.location_name_en : event.location_name_no}
                                </li>
                            )}
                        </ul>
                        {useTags(event.time_publish, event.highlight, event.canceled, event.full, isOngoing(startDate, endDate)) &&
              <div className="event-item_tags">
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
            <picture className="event-item_picture">
                {(event.image_small && showImage) ? (
                    <RenderSmoothImage
                        className="event-item_img"
                        alt={event.image_small}
                        src={config.url.CDN_URL + '/img/events/small/' + event.image_small}
                        onError={() => setShowImage(false)}
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
        return <DefaultSocialBanner color={color} className="event-item_img" />
    case 'TekKom':
        {/* @ts-ignore */}
        return <DefaultTekkomBanner color={color} className="event-item_img" />
    case 'CTF':
        {/* @ts-ignore */}
        return <DefaultCtfBanner color={color} className="event-item_img" />
    case 'Bedpres':
        {/* @ts-ignore */}
        return <DefaultBedpresBanner color={color} className="event-item_img" />
    default:
        {/* @ts-ignore */}
        return <DefaultEventBanner color={color} className="event-item_img" />
    }
}
