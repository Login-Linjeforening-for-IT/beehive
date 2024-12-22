import { useState, useEffect, useMemo } from "react"
// @ts-ignore
import { useParams } from "react-router-dom"
import { config } from "../../Constants"
// @ts-ignore
import Spinner from "@components/spinner/Spinner"
import DateTile from "@components/datetile/DateTile"
import DropDownBox from "@components/dropdownbox/DropDownBox"
import MazeMapEmbed from "@components/mazemap/MazeMapEmbed"
import EventSignUp from "./EventSignUp"
import Alert from "@components/alert/Alert"
import Article from "@components/article/Article"
import RenderSmoothImage from "@components/images/rendersmoothimage/RenderSmoothImage"
// @ts-ignore
import MarkdownRender from "@components/markdownrender/MarkdownRender"

import DefaultEventBanner from "@components/svg/defaultbanners/DefaultEventBanner"
import DefaultCtfBanner from "@components/svg/defaultbanners/DefaultCtfBanner"
import DefaultTekkomBanner from "@components/svg/defaultbanners/DefaultTekkomBanner"
import DefaultBedpresBanner from "@components/svg/defaultbanners/DefaultBedpresBanner"
import DefaultSocialBanner from "@components/svg/defaultbanners/DefaultSocialBanner"

import * as DatetimeFormatter from "@utils/DatetimeFormatter"
import { getEvent } from "@utils/api"

import "./EventPage.css"

const lang

function getDefaultBanner(category: string, color: string) {
    switch (category) {
    case "Sosialt":
        // @ts-ignore
        return <DefaultSocialBanner color={color} className="event-banner__image" />
    case "TekKom":
        // @ts-ignore
        return <DefaultTekkomBanner color={color} className="event-banner__image" />
    case "CTF":
        // @ts-ignore
        return <DefaultCtfBanner color={color} className="event-banner__image" />
    case "Bedpres":
        // @ts-ignore
        return <DefaultBedpresBanner color={color} className="event-banner__image" />
    default:
        // @ts-ignore
        return <DefaultEventBanner color={color} className="event-banner__image" />
    }
}

function getURLAddress(url: string) {
    try {
        return new URL(url).hostname
    } catch (error) {
        return url
    }
}

function renderOrganizations(organizations: any[]) {
    if (!Array.isArray(organizations)) return null
    return organizations.map((org) => org.name_no).join(", ")
}

function link(href: string, name: string) {
    return (
        <a
            className="link link--primary link--underscore-hover"
            href={href}
            target="_blank"
            rel="noreferrer"
        >
            {name} <i className="material-symbols-sharp">arrow_outward</i>
        </a>
    )
}

export default function EventPage() {
    const { id } = useParams()

    const [useFallbackBanner, setUseFallbackBanner] = useState(false)
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const [response, err] = await getEvent(id)
                if (err) {
                    throw new Error(err)
                }
                setEvent(response)
            } catch (error) {
                console.error("Error fetching event data:", error)
                setError(`Error fetching event: ${id}`)
            } finally {
                setLoading(false)
            }
        };

        fetchData()
    }, [id])

    const eventBanner = useMemo(() => {
        if (useFallbackBanner || !event) {
            // @ts-ignore
            return getDefaultBanner(event?.category?.name_no, event?.category?.color)
        }
        return (
            <RenderSmoothImage
                // @ts-ignore
                src={`${config.url.CDN_URL}/img/events/banner/${event?.event?.image_banner}`}
                // @ts-ignore
                alt={event?.eventname}
                className="event-banner__image"
                onError={() => setUseFallbackBanner(true)}
            />
        )
    }, [useFallbackBanner, event])

    return (
        <>
            { loading && <Spinner width={50} height={50} /> }
            {!loading && error && 
        <div className="page-container">
            <Alert variant='danger' icon='sentiment_dissatisfied' className="page-section--normal page-section--alert">{error}</Alert>
        </div>
            }
            <div className="event-page">
                { !loading && !error && event &&
          <>
              <div className="event-details">
                  <div className="event-datetime-display">
                      <DateTile
                          // @ts-ignore
                          startDate={new Date(event.event.time_start)}
                          // @ts-ignore
                          endDate={new Date(event.event.time_end)}
                          // @ts-ignore
                          color={event.category.color}
                      />
                      <div className="event-datetime-display__right">
                          <div className="event-datetime-display__day">
                              {DatetimeFormatter.isOngoing(
                                  // @ts-ignore
                                  new Date(event.event.time_start),
                                  // @ts-ignore
                                  new Date(event.event.time_end)
                              ) && 
                              // @ts-ignore
                      <span class="event-datetime-display__live-dot"></span>
                              }
                              {DatetimeFormatter.formatEventStatusDate(
                                  // @ts-ignore
                                  new Date(event.event.time_start),
                                  // @ts-ignore
                                  new Date(event.event.time_end),
                                  lang
                              )}
                          </div>
                          {/* @ts-ignore */}
                          {event.event.time_type !== "whole_day" &&
                    <div className="event-datetime-display__time">
                        <i className="event-datetime-display__time-icon material-symbols-sharp">schedule</i>
                        {/* @ts-ignore */}
                        {event.event.time_type === "tbd" ? "TBD" : DatetimeFormatter.formatTimeHHMM(new Date(event.event.time_start))}
                        {/* @ts-ignore */}
                        {event.event.time_type === "default" && ` - ${DatetimeFormatter.formatTimeHHMM(new Date(event.event.time_end))}`}
                    </div>
                          }
                      </div>
                  </div>

                  <div className="event-details__list">
                      {/* @ts-ignore */}
                      {event.location && (
                          <>
                              <div className="event-details__lable">
                                  <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">location_on</i>
                                  {text.info.location}:
                              </div>
                              <div className="event-details__info">
                                  {/* @ts-ignore */}
                                  {tr(event.location.name_en, event.location.name_no)}
                                  {/* @ts-ignore */}
                                  {event.location.city_name && `, ${event.location.city_name}`}
                              </div>
                          </>
                      )}

                      <div className="event-details__lable">
                          <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">category</i>
                          {text.info.type}:
                      </div>
                      <div className="event-details__info">
                          {/* @ts-ignore */}
                          <span className="event-details__category-dot" style={{background: event.category.color}}></span>
                          {/* @ts-ignore */}
                          {tr(event.category.name_en, event.category.name_no)}
                      </div>

                      {/* @ts-ignore */}
                      {event.organizations?.length > 0 && (
                          <>
                              <div className="event-details__lable">
                                  <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">person</i>
                                  {text.info.organizer}:
                              </div>
                              <div className="event-details__info">
                                  {/* @ts-ignore */}
                                  {renderOrganizations(event.organizations)}
                              </div>
                          </>
                      )}

                      {/* @ts-ignore */}
                      {event.event.link_stream && (
                          <>
                              <div className="event-details__lable">
                                  <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">live_tv</i>
                                  {text.info.stream}:
                              </div>
                              <div className="event-details__info">
                                  {/* @ts-ignore */}
                                  {link(event.event.link_stream, getURLAddress(event.event.link_stream))}
                              </div>
                          </>
                      )}

                      {/* @ts-ignore */}
                      {(event.event.link_discord || event.event.link_facebook) && (
                          <>
                              <div className="event-details__lable">
                                  <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">link</i>
                                  {text.info.links}:
                              </div>
                              <div className="event-details__info">
                                  {/* @ts-ignore */}
                                  {event.event.link_discord && <>{link(event.event.link_discord, "Discord")}<br/></>}
                                  {/* @ts-ignore */}
                                  {event.event.link_facebook && link(event.event.link_facebook, "Facebook")}
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
              <picture className="event-banner">{eventBanner}</picture>
              <div className="event-description">
                  <Article
                      // @ts-ignore
                      title={(event.event.canceled ? `❌ (${text.canceled})` : "") + tr(event.event.name_en, event.event.name_no)}
                      // @ts-ignore
                      publishTime={new Date(event.event.time_publish)}
                      // @ts-ignore
                      updateTime={new Date(event.event.updated_at)}
                      // @ts-ignore
                      informational={tr(event.event.informational_en, event.event.informational_no)}
                      // @ts-ignore
                      description={tr(event.event.description_en, event.event.description_no)}
                  />
                  {/* @ts-ignore */}
                  {event.rule && (
                      <div className="rules">
                          <DropDownBox
                              title={
                                  <>
                                      {/* @ts-ignore */}
                                      <i className="material-symbols-sharp">gavel</i> {tr(event.rule.name_en, event.rule.name_no)}
                                  </>
                              }
                          >
                              <div className="rules__content">
                                  {/* @ts-ignore */}
                                  <MarkdownRender MDstr={tr(event.rule.description_en, event.rule.description_no)} />
                              </div>
                          </DropDownBox>
                      </div>
                  )}
              </div>

              {/* @ts-ignore */}
              {event.location && event.location.type === "mazemap" && (
                  <div className='event-map'>
                      {/* @ts-ignore */}
                      <MazeMapEmbed campusID={event.location.mazemap_campus_id} poi={event.location.mazemap_poi_id} />
                  </div>
              )}
          </>
                }
            </div>
        </>
    )
};
