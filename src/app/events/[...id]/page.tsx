import config from '@config'
import DateTile from '@components/shared/datetile/DateTile'
import DropDownBox from '@components/shared/dropdownbox/DropDownBox'
import MazeMapEmbed from '@components/shared/mazemap/MazeMapEmbed'
import EventSignUp from '../EventSignUp'
import Article from '@components/shared/article/Article'
import MarkdownRender from '@components/shared/markdownrender/MarkdownRender'
import DefaultEventBanner from '@components/svg/defaultbanners/DefaultEventBanner'
import DefaultCtfBanner from '@components/svg/defaultbanners/DefaultCtfBanner'
import DefaultTekkomBanner from '@components/svg/defaultbanners/DefaultTekkomBanner'
import DefaultBedpresBanner from '@components/svg/defaultbanners/DefaultBedpresBanner'
import DefaultSocialBanner from '@components/svg/defaultbanners/DefaultSocialBanner'
import no from '@text/eventPage/no.json'
import en from '@text/eventPage/en.json'
import ArrowOutward from '@components/svg/symbols/ArrowOutward'
import Pin from '@components/svg/symbols/Pin'
import SVGLink from '@components/svg/symbols/Link'
import LiveTv from '@components/svg/symbols/LiveTv'
import Person from '@components/svg/symbols/Person'
import Gavel from '@components/svg/symbols/Gavel'
import Category from '@components/svg/symbols/Category'
import Schedule from '@components/svg/symbols/Schedule'
import { getEvent } from '@utils/api'
import { formatEventStatusDate, formatTimeHHMM, isOngoing } from '@utils/DatetimeFormatter'
import { cookies } from 'next/headers'
import './page.css'
import Link from 'next/link'
import Image from 'next/image'

type InnerEventProps = {
    event: EventProps
}

type EventBannerProps = {
    // eslint-disable-next-line
    event: any
}

export default async function EventPage({ params }: PromisedPageProps) {
    const id = (await params).id
    const event = (await getEvent(id))

    return (
        <>
            <div className='event-page'>
                {event && <Event event={event} />}
            </div>
        </>
    )
}

async function Event({event}: InnerEventProps) {
    const lang = (await cookies()).get('lang')?.value || 'no'
    // eslint-disable-next-line
    const text: any = lang === 'no' ? no : en

    return (
        <>
            <div className='event-details'>
                <div className='event-datetime-display'>
                    <DateTile
                        // @ts-ignore
                        startDate={new Date(event.event.time_start)}
                        // @ts-ignore
                        endDate={new Date(event.event.time_end)}
                        // @ts-ignore
                        color={event.category.color}
                    />
                    <div className='event-datetime-display_right'>
                        <div className='event-datetime-display_day'>
                            {isOngoing(
                                // @ts-ignore
                                new Date(event.event.time_start),
                                // @ts-ignore
                                new Date(event.event.time_end)
                            ) && 
                            // @ts-ignore
                    <span className='event-datetime-display_live-dot' />
                            }
                            {formatEventStatusDate(
                                // @ts-ignore
                                new Date(event.event.time_start),
                                // @ts-ignore
                                new Date(event.event.time_end),
                                lang
                            )}
                        </div>
                        {/* @ts-ignore */}
                        {event.event.time_type !== 'whole_day' &&
                    <div className='flex flex-row items-center event-datetime-display_time'>
                        <Schedule className='w-[1.8rem] h-[1.8rem] fill-[var(--color-text-main)] event-datetime-display_time-icon'/>
                        {/* @ts-ignore */}
                        {event.event.time_type === 'tbd' ? 'TBD' : formatTimeHHMM(new Date(event.event.time_start))}
                        {/* @ts-ignore */}
                        {event.event.time_type === 'default' && ` - ${formatTimeHHMM(new Date(event.event.time_end))}`}
                    </div>
                        }
                    </div>
                </div>

                <div className='event-details_list'>
                    {/* @ts-ignore */}
                    {event.location && (
                        <>
                            <div className='flex flex-row items-center event-details_lable'>
                                <Pin className='w-[1.5rem] h-[1.5rem] fill-[var(--color-text-discreet)] event-details_icon event-details_icon--lable-color' />
                                {text.info.location}:
                            </div>
                            <div className='event-details_info'>
                                {/* @ts-ignore */}
                                {lang === 'en' && event.location.name_en ? event.location.name_en : event.location.name_no}
                                {/* @ts-ignore */}
                                {event.location.city_name && `, ${event.location.city_name}`}
                            </div>
                        </>
                    )}

                    <div className='event-details_lable'>
                        <Category className='fill-[var(--color-text-discreet)] event-details_icon event-details_icon--lable-color'/>
                        {text.info.type}:
                    </div>
                    <div className='event-details_info'>
                        {/* @ts-ignore */}
                        <span className='event-details_category-dot' style={{background: event.category.color}} />
                        {/* @ts-ignore */}
                        {lang === 'en' ? event.category.name_en : event.category.name_no}
                    </div>

                    {/* @ts-ignore */}
                    {event.organizations?.length > 0 && (
                        <>
                            <div className='event-details_lable'>
                                <Person className='fill-[var(--color-text-discreet)] event-details_icon event-details_icon--lable-color'/>
                                {text.info.organizer}:
                            </div>
                            <div className='event-details_info'>
                                {/* @ts-ignore */}
                                {renderOrganizations(event.organizations)}
                            </div>
                        </>
                    )}

                    {/* @ts-ignore */}
                    {event.event.link_stream && (
                        <>
                            <div className='event-details_lable'>
                                <LiveTv className='fill-[var(--color-text-discreet)] event-details_icon event-details_icon--lable-color'/>
                                {text.info.stream}:
                            </div>
                            <div className='event-details_info'>
                                {/* @ts-ignore */}
                                {link(event.event.link_stream, getURLAddress(event.event.link_stream))}
                            </div>
                        </>
                    )}

                    {/* @ts-ignore */}
                    {(event.event.link_discord || event.event.link_facebook) && (
                        <>
                            <div className='event-details_lable'>
                                <SVGLink className='fill-[var(--color-text-discreet)] event-details_icon event-details_icon--lable-color'/>
                                {text.info.links}:
                            </div>
                            <div className='event-details_info'>
                                {/* @ts-ignore */}
                                {event.event.link_discord && <>{link(event.event.link_discord, 'Discord')}<br/></>}
                                {/* @ts-ignore */}
                                {event.event.link_facebook && link(event.event.link_facebook, 'Facebook')}
                            </div>
                        </>
                    )}
                </div>
                <EventSignUp
                    // @ts-ignore
                    cap={event.event.capacity}
                    // @ts-ignore
                    url={event.event.link_signup}
                    // @ts-ignore
                    full={event.event.full}
                    // @ts-ignore
                    canceled={event.event.canceled}
                    // @ts-ignore
                    signupRelease={new Date(event.event.time_signup_release)}
                    // @ts-ignore
                    signupDeadline={new Date(event.event.time_signup_deadline)}
                />
            </div>
            <picture className='event-banner'>
                <EventBanner event={event} />
            </picture>
            <div className='event-description'>
                <Article
                    // @ts-ignore
                    title={(event.event.canceled ? `❌ (${text.canceled})` : '') + lang === 'en' ? event.event.name_en : event.event.name_no}
                    // @ts-ignore
                    publishTime={new Date(event.event.time_publish)}
                    // @ts-ignore
                    updateTime={new Date(event.event.updated_at)}
                    // @ts-ignore
                    informational={lang === 'en' ? event.event.informational_en : event.event.informational_no}
                    // @ts-ignore
                    description={lang === 'en' ? event.event.description_en : event.event.description_no}
                />
                {/* @ts-ignore */}
                {event.rule && (
                    <div className='rules'>
                        <DropDownBox
                            title={
                                <>
                                    {/* @ts-ignore */}
                                    <Gavel className=''/> {lang === 'en' ? event.rule.name_en : event.rule.name_no}
                                </>
                            }
                        >
                            <div className='rules_content'>
                                {/* @ts-ignore */}
                                <MarkdownRender MDstr={lang === 'en' ? event.rule.description_en : event.rule.description_no} />
                            </div>
                        </DropDownBox>
                    </div>
                )}
            </div>

            {/* @ts-ignore */}
            {event.location && event.location.type === 'mazemap' && (
                <div className='event-map'>
                    {/* @ts-ignore */}
                    <MazeMapEmbed campusID={event.location.mazemap_campus_id} poi={event.location.mazemap_poi_id} />
                </div>
            )}
        </>
    )
}

async function EventBanner({event}: EventBannerProps) {
    const lang = (await cookies()).get('lang')?.value || 'no'
    const banner_url = `${config.url.CDN_URL}/img/events/banner/${event?.event?.image_banner}`
    if (!event || !((await fetch(banner_url)).status === 200)) {
        // @ts-ignore
        return getDefaultBanner(event?.category?.name_no, event?.category?.color)
    }

    return (
        <>
            <Image
                src={`${config.url.CDN_URL}/img/events/banner/${event?.event?.image_banner}`}
                alt={lang === 'no' ? event?.event.name_no : event.event.name_en}
                width={1000}
                height={400}
                className='relative w-full rounded-var[(--border-radius)]'
            />
        </>
    )
}


function getDefaultBanner(category: string, color: string) {
    switch (category) {
    case 'Sosialt':
        // @ts-ignore
        return <DefaultSocialBanner color={color} className='event-banner_image' />
    case 'TekKom':
        // @ts-ignore
        return <DefaultTekkomBanner color={color} className='event-banner_image' />
    case 'CTF':
        // @ts-ignore
        return <DefaultCtfBanner color={color} className='event-banner_image' />
    case 'Bedpres':
        // @ts-ignore
        return <DefaultBedpresBanner color={color} className='event-banner_image' />
    default:
        // @ts-ignore
        return <DefaultEventBanner color={color} className='event-banner_image' />
    }
}

function getURLAddress(url: string) {
    try {
        return new URL(url).hostname
    } catch {
        return url
    }
}

// eslint-disable-next-line
function renderOrganizations(organizations: any[]) {
    if (!Array.isArray(organizations)) return null
    return organizations.map((org) => org.name_no).join(', ')
}

function link(href: string, name: string) {
    return (
        <Link
            className='link link--primary link--underscore-hover'
            href={href}
            target='_blank'
            rel='noreferrer'
        >
            {name} <ArrowOutward className='w-[1.5rem] h-[1.5rem] fill-[var(--color-text-discreet)]'/>
        </Link>
    )
}
