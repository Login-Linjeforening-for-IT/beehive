'use client'

import { useState, useEffect, useContext } from 'react'
import config from '@config'
import { getEvents, getJobs } from '@utils/api'
import DecoratedPicture from '@components/shared/images/decoratedpicture/DecoratedPicture'
import Alert from '@components/shared/alert/Alert'
import EventCardSkeleton from '@components/event/EventCardSkeleton'
import EventListItem from '@components/event/EventItem'
import JobadCard from '@components/jobad/JobadCard'
import JobadCardSkeleton from '@components/jobad/JobadCardSkeleton'
import HeroSection from '@components/shared/herosection/HeroSection'
import Link from 'next/link'
import no from '@text/landing/no.json'
import en from '@text/landing/en.json'
import './page.css'
import AppContext, { Provider } from '@context/context'

export default function Home() {
    return (
        <Provider>
            <HeroSection />
            <EventsPreview />
            <JobadsPreview />
            <SmallInfo />
        </Provider>
    )
}

function SmallInfo() {
    const { lang, theme } = useContext(AppContext)
    const text = lang === 'en' ? en : no

    function getSponsorPath() {
        if (theme === 'light') {
            return '/img/company/mnemonic-logo_dark-nopayoff-2021.svg'
        } else {
            return '/img/company/mnemonic-logo_light-nopayoff-2021.svg'
        }
    }

    return (
        <>
            <div className="landing-info">
                <div className="landing-info_text">
                    <h2 className="heading-2">{text.whoAreWe.title}</h2>
                    <p className="p--regular">{text.whoAreWe.body}</p>
                    <Link
                        className="landing-info_link link link--primary link--corner-hover"
                        href="/about"
                    >
                        {text.readMore}
                    </Link>
                </div>
                <DecoratedPicture
                    imgUrl={`${config.url.CDN_URL}/img/styret.jpg`}
                    variant={4}
                    cornerSize={40}
                    width={150}
                    height={100}
                    cover={true}
                    className="landing-info_picture"
                />
            </div>

            <div className="landing-info">
                <div className="landing-info_text">
                    <h2 className="heading-2">{text.companiesInfo.title}</h2>
                    <p className="p--regular">{text.companiesInfo.body}</p>
                    <Link
                        className="landing-info_link link link--primary link--corner-hover"
                        href="/companies"
                    >
                        {text.readMore}
                    </Link>
                </div>
                <DecoratedPicture
                    imgUrl={config.url.CDN_URL + '/img/cyberdagen_preben.jpg'}
                    variant={2}
                    cornerSize={40}
                    width={150}
                    height={100}
                    cover={true}
                    className="landing-info_picture"
                />
            </div>

            <div className="landing-info">
                <div className="landing-info_text">
                    <h2 className="heading-2">{text.sponsor.title}</h2>
                    <p className="p--regular">{text.sponsor.body}</p>
                    <a
                        className="landing-info_link link link--primary link--corner-hover"
                        href="https://www.mnemonic.io/"
                        target="_blank"
                    >
                        {text.readMore}
                    </a>
                </div>
                <DecoratedPicture
                    imgUrl={config.url.CDN_URL + getSponsorPath()}
                    variant={0}
                    cornerSize={0}
                    width={100}
                    height={30}
                    className="landing-info_picture"
                />
            </div>
        </>
    )
}

function EndCard({ path }: {path: string}) {
    const { lang } = useContext(AppContext)
    const text = lang === 'en' ? en : no

    return (
        <li className="dynamic-preview-list_item dynamic-preview-end-card">
            <Link href={path} className="dynamic-preview-end-card_btn">
                <div className="dynamic-preview-end-card_arrow-container">
                    <div className="dynamic-preview-end-card_arrow"></div>
                </div>
                <div className="dynamic-preview-end-card_text">
                    {text.eventsPreview.seeAll}
                </div>
            </Link>
        </li>
    )
}

function EventsPreview() {
    const [events, setEvents] = useState<any[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<any | null>(null)
    const { lang } = useContext(AppContext)
    const text = lang === 'en' ? en : no

    useEffect(() => {
        (async () => {
            try {
                const [eventsData, err] = await getEvents(null, 3, 0, true)
                if (err) {
                    setError(err)
                    console.error(err)
                } else {
                    setEvents(eventsData)
                }
            } catch (error) {
                setError('Unexpected error occurred')
                console.error('Unexpected error:', error)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        <>
            <section className="dynamic-preview">
                <div className="dynamic-preview-heading">
                    <h2 className="dynamic-preview-heading_title">
                        {text.eventsPreview.title}
                    </h2>
                    <Link href="/events" className="dynamic-preview-heading_link">
                        <span className="dynamic-preview-heading_link-text">
                            {text.jobadsPreview.seeAll}
                        </span>
                    </Link>
                </div>
                {loading && (
                    <ul className="dynamic-preview-list">
                        <li className="dynamic-preview-list_item">
                            <EventCardSkeleton />
                        </li>
                        <li className="dynamic-preview-list_item">
                            <EventCardSkeleton />
                        </li>
                        <li className="dynamic-preview-list_item">
                            <EventCardSkeleton />
                        </li>
                        <EndCard path="/career" />
                    </ul>
                )}
                {!loading && events && events.length > 0 && (
                    <ul className="dynamic-preview-list">
                        {events.map((e: any) => (
                            <li key={e.id} className="dynamic-preview-list_item">
                                <EventListItem event={e} variant="card" highlight={false} />
                            </li>
                        ))}
                        {events.length > 2 && <EndCard path="/events" />}
                    </ul>
                )}
                {error && !loading && (
                    <Alert
                        icon="sentiment_dissatisfied"
                        variant="danger"
                        className="page-section--alert"
                    >
                        Error fetching events: {error.message || error}
                    </Alert>
                )}
            </section>
            <hr className="dynamic-preview-seperator" />
        </>
    )
}

function JobadsPreview() {
    const [jobads, setJobads] = useState<any[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<any | null>(null)
    const { lang } = useContext(AppContext)
    const text = lang === 'en' ? en : no

    useEffect(() => {
        (async () => {
            try {
                const [jobadsData, err] = await getJobs(null, null, null, null, 3, 0)
                if (err) {
                    setError(err)
                    console.error(err)
                } else {
                    setJobads(jobadsData)
                }
            } catch (error) {
                setError('Unexpected error occurred')
                console.error('Unexpected error:', error)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        <>
            <section className="dynamic-preview">
                <div className="dynamic-preview-heading">
                    <h2 className="dynamic-preview-heading_title">
                        {text.jobadsPreview.title}
                    </h2>
                    <Link href="/career" className="dynamic-preview-heading_link">
                        <span className="dynamic-preview-heading_link-text">
                            {text.jobadsPreview.seeAll}
                        </span>
                    </Link>
                </div>
                {loading && (
                    <ul className="dynamic-preview-list">
                        <li className="dynamic-preview-list_item">
                            <JobadCardSkeleton />
                        </li>
                        <li className="dynamic-preview-list_item">
                            <JobadCardSkeleton />
                        </li>
                        <li className="dynamic-preview-list_item">
                            <JobadCardSkeleton />
                        </li>
                        <EndCard path="/career" />
                    </ul>
                )}
                {!loading && jobads && jobads.length > 0 && (
                    <ul className="dynamic-preview-list">
                        {jobads.map((e) => (
                            <li key={e.id} className="dynamic-preview-list_item">
                                <JobadCard jobad={e} />
                            </li>
                        ))}
                        {jobads.length > 2 && <EndCard path="/career" />}
                    </ul>
                )}
                {error && !loading && (
                    <Alert
                        icon="sentiment_dissatisfied"
                        variant="danger"
                        className="page-section--alert"
                    >
                        Error fetching events: {error.message || error}
                    </Alert>
                )}
            </section>
            <hr className="dynamic-preview-seperator" />
        </>
    )
}
