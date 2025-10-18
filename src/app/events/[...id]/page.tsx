import config from '@config'
import DateTile from '@components/shared/datetile/DateTile'
import DropDownBox from '@components/shared/dropdownbox/DropDownBox'
import MazeMapEmbed from '@components/shared/mazemap/MazeMapEmbed'
import EventSignUp from '../EventSignUp'
import Article from '@components/shared/article/Article'
import MarkdownRender from '@components/shared/markdownrender/MarkdownRender'
import Alert from '@components/shared/alert/Alert'
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

type EventBannerProps = {
    // eslint-disable-next-line
    event: GetEventProps
}

export default async function EventPage({ params }: PromisedPageProps) {
    const id = (await params).id
    const event = (await getEvent(id))
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang

    const errorMsg = lang === 'no'
        ? 'Oi! Her var det tomt... '
        : 'Oh! Looks empty... '

    return (
        <>
            {typeof event !== 'string'  && <Event event={event} />}
            {!event && (
                <Alert
                    variant='danger'
                    className='page-section--normal page-section--alert'
                >
                    {errorMsg}
                </Alert>
            )}
        </>
    )
}

async function Event({event}: {event: GetEventProps}) {
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang
    const text = lang === 'no' ? no : en

    return (
        <div className='event-page'>
            <div className='event-details'>
                <div className='event-datetime-display'>
                    <DateTile
                        // @ts-ignore
                        startDate={new Date(event.time_start)}
                        // @ts-ignore
                        endDate={new Date(event.time_end)}
                        // @ts-ignore
                        color={event.category.color}
                    />
                    <div className='event-datetime-display_right'>
                        <div className='event-datetime-display_day'>
                            {isOngoing(
                                // @ts-ignore
                                new Date(event.time_start),
                                // @ts-ignore
                                new Date(event.time_end)
                            ) &&
                                // @ts-ignore
                                <span className='event-datetime-display_live-dot' />
                            }
                            {formatEventStatusDate(
                                // @ts-ignore
                                new Date(event.time_start),
                                // @ts-ignore
                                new Date(event.time_end),
                                lang
                            )}
                        </div>
                        {/* @ts-ignore */}
                        {event.time_type !== 'whole_day' &&
                            <div className='flex flex-row items-center event-datetime-display_time'>
                                <Schedule className='w-[1.8rem] h-[1.8rem] fill-[var(--color-text-main)] event-datetime-display_time-icon'/>
                                {/* @ts-ignore */}
                                {event.time_type === 'tbd' ? 'TBD' : formatTimeHHMM(new Date(event.time_start))}
                                {/* @ts-ignore */}
                                {event.time_type === 'default' && ` - ${formatTimeHHMM(new Date(event.time_end))}`}
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
                            <div className='flex flex-row items-center event-details_lable'>
                                <Person className='fill-[var(--color-text-discreet)] event-details_icon event-details_icon--lable-color'/>
                                {text.info.organizer}:
                            </div>
                            <div className='flex flex-row items-center event-details_info'>
                                {/* @ts-ignore */}
                                {renderOrganizations(event.organizations)}
                            </div>
                        </>
                    )}

                    {/* @ts-ignore */}
                    {event.link_stream && (
                        <>
                            <div className='flex flex-row items-center event-details_lable'>
                                <LiveTv className='fill-[var(--color-text-discreet)] event-details_icon event-details_icon--lable-color'/>
                                {text.info.stream}:
                            </div>
                            <div className='flex flex-row items-center event-details_info'>
                                {/* @ts-ignore */}
                                {link(event.link_stream, getURLAddress(event.link_stream))}
                            </div>
                        </>
                    )}

                    {/* @ts-ignore */}
                    {(event.link_discord || event.link_facebook) && (
                        <>
                            <div className='flex flex-row items-center event-details_lable'>
                                <SVGLink className='fill-[var(--color-text-discreet)] event-details_icon event-details_icon--lable-color'/>
                                {text.info.links}:
                            </div>
                            <div className='flex flex-row items-center event-details_info'>
                                {/* @ts-ignore */}
                                {event.link_discord && <>{link(event.link_discord, 'Discord')}<br/></>}
                                {/* @ts-ignore */}
                                {event.link_facebook && link(event.link_facebook, 'Facebook')}
                            </div>
                        </>
                    )}
                </div>
                <EventSignUp
                    // @ts-ignore
                    cap={event.capacity}
                    // @ts-ignore
                    url={event.link_signup}
                    // @ts-ignore
                    full={event.full}
                    // @ts-ignore
                    canceled={event.canceled}
                    // @ts-ignore
                    signupRelease={new Date(event.time_signup_release)}
                    // @ts-ignore
                    signupDeadline={new Date(event.time_signup_deadline)}
                />
            </div>
            <div className='event-banner'>
                <EventBanner event={event} />
            </div>
            <div className='event-description'>
                <Article
                    // @ts-ignore
                    title={(event.canceled ? `❌ (${text.canceled})` : '') + lang === 'en' ? event.name_en : event.name_no}
                    // @ts-ignore
                    publishTime={new Date(event.time_publish)}
                    // @ts-ignore
                    updateTime={new Date(event.updated_at)}
                    // @ts-ignore
                    informational={lang === 'en' ? event.informational_en : event.informational_no}
                    // @ts-ignore
                    description={lang === 'en' ? event.description_en : event.description_no}
                />
                {/* @ts-ignore */}
                {event.rule && (
                    <div className='rules'>
                        <DropDownBox
                            title={
                                <>
                                    {/* @ts-ignore */}
                                    <Gavel className='fill-[var(--color-text-main)] h-[1.75rem]'/> {lang === 'en' ? event.rule.name_en : event.rule.name_no}
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
        </div>
    )
}

async function EventBanner({event}: EventBannerProps) {
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang
    const banner_url = `${config.url.CDN_URL}/img/events/banner/${event.image_banner}`
    if (!event || !((await fetch(banner_url)).status === 200)) {
        // @ts-ignore
        return getDefaultBanner(event?.category?.name_no, event?.category?.color)
    }

    return (
        <>
            <Image
                src={`${config.url.CDN_URL}/img/events/banner/${event.image_banner}`}
                alt={lang === 'no' ? event.name_no : event.name_en}
                width={1000}
                height={400}
                className='w-full rounded-var[(--border-radius)]'
            />
        </>
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
        case 'CTFKom':
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
            className='flex flex-row items-center link link--primary link--underscore-hover'
            href={href}
            target='_blank'
            rel='noreferrer'
        >
            {name} <ArrowOutward className='w-[1.5rem] h-[1.5rem] fill-[var(--color-text-discreet)]'/>
        </Link>
    )
}
