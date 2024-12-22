'use client'
import { useState, useEffect, useContext } from "react"
// @ts-ignore
import { withTranslation } from "react-i18next"

import { config } from "../Constants"
import ThemeContext from "../context/ThemeContext"
import { getEvents, getJobs } from "../utils/api"

import DecoratedPicture from "../components/images/decoratedpicture/DecoratedPicture"
import Alert from "../components/alert/Alert"
import EventCardSkeleton from "../components/event/EventCardSkeleton"
import EventListItem from "../components/event/EventItem"
import JobadCard from "../components/jobad/JobadCard"
import JobadCardSkeleton from "../components/jobad/JobadCardSkeleton"
import HeroSection from "../components/herosection/HeroSection"

import "./page.css"
import Link from "next/link"


function SmallInfo({ t }: any) {
    const value = useContext(ThemeContext)

    function getSponsorPath() {
        if (value.theme === "light") {
            return "/img/company/mnemonic-logo_dark-nopayoff-2021.svg"
        } else {
            return "/img/company/mnemonic-logo_light-nopayoff-2021.svg"
        }
    };

    return (
        <>
            <div className="landing-info">
                <div className="landing-info__text">
                    <h2 className="heading-2">{t("whoAreWe.title")}</h2>
                    <p className="p--regular">{t("whoAreWe.body")}</p>
                    <Link
                        className="landing-info__link link link--primary link--corner-hover"
                        href="/about"
                    >
                        {t("readMore")}
                    </Link>
                </div>
                <DecoratedPicture
                    imgurl={config.url.CDN_URL + "/img/styret.jpg"}
                    variant={4}
                    cornerSize={40}
                    w={150}
                    h={100}
                    cover={true}
                    className="landing-info__picture"
                />
            </div>

            <div className="landing-info">
                <div className="landing-info__text">
                    <h2 className="heading-2">{t("companiesInfo.title")}</h2>
                    <p className="p--regular">{t("companiesInfo.body")}</p>
                    <Link
                        className="landing-info__link link link--primary link--corner-hover"
                        href="/companies"
                    >
                        {t("readMore")}
                    </Link>
                </div>
                <DecoratedPicture
                    imgurl={config.url.CDN_URL + "/img/cyberdagen_preben.jpg"}
                    variant={2}
                    cornerSize={40}
                    w={150}
                    h={100}
                    cover={true}
                    className="landing-info__picture"
                />
            </div>

            <div className="landing-info">
                <div className="landing-info__text">
                    <h2 className="heading-2">{t("sponsor.title")}</h2>
                    <p className="p--regular">{t("sponsor.body")}</p>
                    <a
                        className="landing-info__link link link--primary link--corner-hover"
                        href="https://www.mnemonic.io/"
                        target="_blank"
                    >
                        {t("readMore")}
                    </a>
                </div>
                <DecoratedPicture
                    imgurl={config.url.CDN_URL + getSponsorPath()}
                    variant={0}
                    cornerSize={0}
                    w={100}
                    h={30}
                    className="landing-info__picture"
                />
            </div>
        </>
    )
};

function EndCard({ t, path }: any) {
    return (
        <li className="dynamic-preview-list__item dynamic-preview-end-card">
            <Link href={path} className="dynamic-preview-end-card__btn">
                <div className="dynamic-preview-end-card__arrow-container">
                    <div className="dynamic-preview-end-card__arrow"></div>
                </div>
                <div className="dynamic-preview-end-card__text">
                    {t("eventsPreview.see-all")}
                </div>
            </Link>
        </li>
    )
};

function EventsPreview({ t }: any) {
    const [events, setEvents] = useState<any[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<any | null>(null)

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
                setError("Unexpected error occurred")
                console.error("Unexpected error:", error)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        <>
            <section className="dynamic-preview">
                <div className="dynamic-preview-heading">
                    <h2 className="dynamic-preview-heading__title">
                        {t("eventsPreview.title")}
                    </h2>
                    <Link href="/events" className="dynamic-preview-heading__link">
                        <span className="dynamic-preview-heading__link-text">
                            {t("jobadsPreview.see-all")}
                        </span>
                    </Link>
                </div>
                {loading && (
                    <ul className="dynamic-preview-list">
                        <li className="dynamic-preview-list__item">
                            <EventCardSkeleton />
                        </li>
                        <li className="dynamic-preview-list__item">
                            <EventCardSkeleton />
                        </li>
                        <li className="dynamic-preview-list__item">
                            <EventCardSkeleton />
                        </li>
                        <EndCard t={t} path="/career" />
                    </ul>
                )}
                {!loading && events && events.length > 0 && (
                    <ul className="dynamic-preview-list">
                        {events.map((e: any) => (
                            <li key={e.id} className="dynamic-preview-list__item">
                                <EventListItem event={e} variant="card" highlight={false} />
                            </li>
                        ))}
                        {events.length > 2 && <EndCard t={t} path="/events" />}
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
};

function JobadsPreview({ t }: any) {
    const [jobads, setJobads] = useState<any[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<any | null>(null)

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
                setError("Unexpected error occurred")
                console.error("Unexpected error:", error)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        <>
            <section className="dynamic-preview">
                <div className="dynamic-preview-heading">
                    <h2 className="dynamic-preview-heading__title">
                        {t("jobadsPreview.title")}
                    </h2>
                    <Link href="/career" className="dynamic-preview-heading__link">
                        <span className="dynamic-preview-heading__link-text">
                            {t("jobadsPreview.see-all")}
                        </span>
                    </Link>
                </div>
                {loading && (
                    <ul className="dynamic-preview-list">
                        <li className="dynamic-preview-list__item">
                            <JobadCardSkeleton />
                        </li>
                        <li className="dynamic-preview-list__item">
                            <JobadCardSkeleton />
                        </li>
                        <li className="dynamic-preview-list__item">
                            <JobadCardSkeleton />
                        </li>
                        <EndCard t={t} path="/career" />
                    </ul>
                )}
                {!loading && jobads && jobads.length > 0 && (
                    <ul className="dynamic-preview-list">
                        {jobads.map((e) => (
                            <li key={e.id} className="dynamic-preview-list__item">
                                <JobadCard jobad={e} />
                            </li>
                        ))}
                        {jobads.length > 2 && <EndCard t={t} path="/career" />}
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
};

function Home({ t }: any) {
    return (
        <>
            <HeroSection />
            <EventsPreview t={t} />
            <JobadsPreview t={t} />
            <SmallInfo t={t} />
        </>
    )
};

export default withTranslation("landingPage")(Home)
