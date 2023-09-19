import { useState, useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";

import Spinner from "../../components/spinner/Spinner";
import DateTile from "../../components/datetile/DateTile";
import MazeMap from "../../components/mazemap/map";
import EventSignUp from "./EventSignUp";
import DefaultEventBanner from "../../components/svg/defaultbanners/DefaultEventBanner";
import DefaultCtfBanner from "../../components/svg/defaultbanners/DefaultCtfBanner";
import DefaultTekkomBanner from "../../components/svg/defaultbanners/DefaultTekkomBanner";
import DefaultBedpresBanner from "../../components/svg/defaultbanners/DefaultBedpresBanner";
import DefaultSocialBanner from "../../components/svg/defaultbanners/DefaultSocialBanner";
import { config } from "../../Constants";
import { withTranslation } from "react-i18next";
import * as DatetimeFormatter from "../../utils/DatetimeFormatter";
import * as ImageLinker from "../../utils/ImageLinker";

import "./EventPage.css";
import "../../description.css";

// TODO match catergory id with new db id's
const getDefaultBanner = (category, color) => {
  switch (category) {
    case "Sosialt":
      return <DefaultSocialBanner color={color} />;
    case "TekKom":
      return <DefaultTekkomBanner color={color} />;
    case "CTF":
      return <DefaultCtfBanner color={color} />;
    case "Bedpres":
      return <DefaultBedpresBanner color={color} />;
    default:
      return <DefaultEventBanner color={color} />;
  }
};

const renderOrganizations = (organizations) => {
  // Check if organizations exists and is an array
  if (!Array.isArray(organizations)) {
    return null; // Handle the case where organizations is not an array
  }

  // Extract the names and join them with commas
  const organizationNames = organizations.map(
    (organization) => organization.name_no
  );

  // Join the names with commas
  return organizationNames.join(", ");
};


const EventPage = ({ t, i18n }) => {
  let { id } = useParams();

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showImage, setShowImage] = useState(true);
  const hideImg = () => {
    setShowImage(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(config.url.API_URL + "/api/events/" + id);
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setEventData(actualData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setEventData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      {loading && <Spinner w="3rem" h="3rem" />}
      {eventData && 
        <div className="event-page page-container">
          <div className="event-details">
            <div className="event-details__date">
              <DateTile
                date={eventData.event.time_start}
                language={i18n.language == "en" ? "en" : "no"}
                color={eventData.category.color}
              />
              <div className="event-details__date-expression">
                {DatetimeFormatter.getDayName(
                  eventData.event.time_start,
                  i18n.language == "en" ? "en" : "no"
                )}
              </div>
            </div>

            <div className="event-details__list">
              {eventData.event.time_type != "whole_day" && (
                <>
                  <div className="event-details__lable">
                    <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">
                      schedule
                    </i>{" "}
                    {t("info.start")}:{" "}
                  </div>
                  <div className="event-details__info">
                    {eventData.event.time_type == "tbd" ? "TBD" : DatetimeFormatter.getTimeHHmm(eventData.event.time_start)}
                  </div>

                  {eventData.event.time_type === "defualt" && 
                    <>
                      <div className="event-details__lable">
                        <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">
                          schedule
                        </i>
                        {t("info.end")}:{" "}
                      </div>
                      <div className="event-details__info">
                        {DatetimeFormatter.getTimeHHmm(
                          eventData.event.time_end
                        )}
                      </div>
                    </>
                  }
                </>
              )}
              {eventData.location && (
                <>
                  <div className="event-details__lable">
                    <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">
                      location_on
                    </i>
                    {t("info.location")}:
                  </div>
                  <div className="event-details__info">
                    {eventData.location.name_no}
                    {eventData.location.city_name &&
                      ", " + eventData.location.city_name}
                  </div>
                </>
              )}

              <div className="event-details__lable">
                <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">
                  category
                </i>
                {t("info.type")}:
              </div>
              <div className="event-details__info">
                {/* Adding category color to dot icon, using !important to overide text color. Super hacky but gets the job done apperantly */}
                <i
                  className="event-details__icon logfont-circle"
                  ref={(node) => {
                    if (node) {
                      node.style.setProperty(
                        "color",
                        "#" + eventData.category.color,
                        "important"
                      );
                    }
                  }}
                ></i>
                {eventData.category.name_no}
              </div>

              <div className="event-details__lable">
                <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">
                  person
                </i>
                {t("info.organizer")}:{" "}
              </div>
              <div className="event-details__info">
                {/* TODO: list all organizers  */}
                {renderOrganizations(eventData.organizations)}
              </div>

              {eventData.event.link_stream && (
                <>
                  <div className="event-details__lable">
                    <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">
                      live_tv
                    </i>
                    {t("info.stream")}:{" "}
                  </div>
                  <div className="event-details__info">
                    <a
                      className="standard-link standard-link--underscore-hover"
                      href={eventData.event.link_stream}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {eventData.event.link_stream}{" "}
                      <i className="material-symbols-sharp">arrow_outward</i>
                    </a>
                  </div>
                </>
              )}

              {(eventData.event.link_discord ||
                eventData.event.link_facebook) && (
                <>
                  <div className="event-details__lable">
                    <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">
                      link
                    </i>
                    {t("info.links")}:{" "}
                  </div>
                  <div className="event-details__info">
                    {eventData.event.link_discord && (
                      <>
                        <a
                          className="standard-link standard-link--underscore-hover"
                          href={eventData.event.link_discord}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="event-details__icon logfont-discord"></i>
                          Discord
                        </a>
                        <br />
                      </>
                    )}
                    {eventData.event.link_facebook && (
                      <a
                        className="standard-link standard-link--underscore-hover"
                        href={eventData.event.link_facebook}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="event-details__icon logfont-facebook"></i>
                        Facebook
                      </a>
                    )}
                  </div>
                </>
              )}
              {eventData.event.capacity > 0 && (
                <>
                  <div className="event-details__lable">
                    <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">
                      chair
                    </i>
                    {t("info.capacity")}:{" "}
                  </div>
                  <div className="event-details__info">
                    {eventData.event.capacity}
                  </div>
                </>
              )}
            </div>
            {/* TODO: dont show if full or cancled */}
            <EventSignUp event={eventData.event} />
          </div>
          <div className="event-banner">
            {showImage ? (
              <picture>
                <img
                  alt={eventData.eventname}
                  src={ImageLinker.getCDNLink(eventData.event.image_banner)}
                  onError={hideImg}
                />
              </picture>
            ) : (
              getDefaultBanner(
                eventData.category.name_no,
                eventData.category.color
              )
            )}
          </div>
          <div className="description">
            <h1 className="description__header">{eventData.event.name_no}</h1>
            {eventData.event.informational_no && (
              <div className="event-informational">
                <i className="event-informational__icon material-symbols-sharp">
                  info
                </i>
                <div className="event-informational__msg">{eventData.event.informational_no}</div>
              </div>
            )}
            <div
              className="description__main"
              dangerouslySetInnerHTML={{
                __html: eventData.event.description_no,
              }}
            />
          </div>
          {/*
          TODO: fix mazemap
          (eventData.location.type == 'mazemap') && 
            <div className='event-map'>
              <MazeMap eventID={eventData.event.id} mazeref={eventData.location.mazemap_poi_id} language={i18n.language} />
            </div>
          */}
        </div>
      }
    </>
  );
};

export default withTranslation("eventPage")(EventPage);
