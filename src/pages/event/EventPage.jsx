import { useState, useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { config } from "../../Constants";
import { withTranslation } from "react-i18next";

import Spinner from "../../components/spinner/Spinner";
import DateTile from "../../components/datetile/DateTile";
import MazeMap from "../../components/mazemap/map";
import EventSignUp from "./EventSignUp";
import Article from '../../components/article/Article';
import DefaultEventBanner from "../../components/svg/defaultbanners/DefaultEventBanner";
import DefaultCtfBanner from "../../components/svg/defaultbanners/DefaultCtfBanner";
import DefaultTekkomBanner from "../../components/svg/defaultbanners/DefaultTekkomBanner";
import DefaultBedpresBanner from "../../components/svg/defaultbanners/DefaultBedpresBanner";
import DefaultSocialBanner from "../../components/svg/defaultbanners/DefaultSocialBanner";
import * as TimeFormatter from "../../utils/DatetimeFormatter";
import * as ImageLinker from "../../utils/ImageLinker";
import * as Translator from "../../utils/GetTranslation";

import "./EventPage.css";

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

const getURLAddress = (url) => {
  try {
    const parsedUrl = new URL(url);
    // Extract and return the hostname (address) without the protocol
    return parsedUrl.hostname;
  } catch (error) {
    return url;
  }
}

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

  const useEng = i18n.language === "en";
  const tr = Translator.getTranslation(useEng);

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
                {TimeFormatter.getDayName(
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
                    {eventData.event.time_type == "tbd" ? "TBD" : TimeFormatter.getTimeHHmm(eventData.event.time_start)}
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
                        {TimeFormatter.getTimeHHmm(
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
                    {tr(eventData.location.name_en, eventData.location.name_no)}
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
                {tr(eventData.category.name_en, eventData.category.name_no)}
              </div>

              <div className="event-details__lable">
                <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">
                  person
                </i>
                {t("info.organizer")}:{" "}
              </div>
              <div className="event-details__info">
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
                      {getURLAddress(eventData.event.link_stream)} <i className="material-symbols-sharp">arrow_outward</i>
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
                          Discord <i className="material-symbols-sharp">arrow_outward</i>
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
                        Facebook <i className="material-symbols-sharp">arrow_outward</i>
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
            {eventData.event.canceled == false &&
              <EventSignUp event={eventData.event} />
            }
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
          <div className="event-description">
            <Article
              title={tr(eventData.event.name_no, eventData.event.name_no)}
              publishTime={eventData.event.time_publish}
              informational={tr(eventData.event.informational_en, eventData.event.informational_no)}
              description={tr(eventData.event.description_en, eventData.event.description_no)}
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
