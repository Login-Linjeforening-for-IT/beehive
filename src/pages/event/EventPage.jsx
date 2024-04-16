import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { config } from "../../Constants";
import { withTranslation } from "react-i18next";

import Spinner from "../../components/spinner/Spinner";
import DateTile from "../../components/datetile/DateTile";
import DropDownBox from "../../components/dropdownbox/DropDownBox";
import MazeMap from "../../components/mazemap/map";
import EventSignUp from "./EventSignUp";
import Article from '../../components/article/Article';
import DefaultEventBanner from "../../components/svg/defaultbanners/DefaultEventBanner";
import DefaultCtfBanner from "../../components/svg/defaultbanners/DefaultCtfBanner";
import DefaultTekkomBanner from "../../components/svg/defaultbanners/DefaultTekkomBanner";
import DefaultBedpresBanner from "../../components/svg/defaultbanners/DefaultBedpresBanner";
import DefaultSocialBanner from "../../components/svg/defaultbanners/DefaultSocialBanner";
import * as DatetimeFormatter from "../../utils/DatetimeFormatter";
import * as Translator from "../../utils/GetTranslation";
import { getEvent } from '../../utils/api';
import "./EventPage.css";
import MarkdownRender from "../../components/markdownrender/MarkdownRender";

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

  const { id } = useParams();
  const useEng = i18n.language === "en";
  const lang = useEng ? 'en' : 'no';
  const tr = Translator.getTranslation(useEng);

  const [useFallbackBanner, setUseFallbackBanner] = useState(false);
  const handleImgError = () => setUseFallbackBanner(true);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ response, err ] = await getEvent(id);

        setEvent(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {loading && <Spinner w="50" h="50" />}
      {event && 
        <div className="event-page page-container">
          <div className="event-details">
            <div className="event-datetime-display">
              <div className="event-datetime-display__left">
              <DateTile
                startDate={new Date(event.event.time_start)}
                endDate={new Date(event.event.time_end)}
                color={event.category.color}
              />
              </div>
              <div className="event-datetime-display__right">
                <div className="event-datetime-display__day">
                  {DatetimeFormatter.formatEventStatusDate(
                    new Date(event.event.time_start),
                    new Date(event.event.time_end),
                    lang
                  )}
                </div>
                {event.event.time_type != "whole_day" &&
                  <div className="event-datetime-display__time">
                      <i className="event-datetime-display__time-icon material-symbols-sharp">
                        schedule
                      </i>
                      {event.event.time_type == "tbd" ? "TBD" : DatetimeFormatter.formatTimeHHMM(new Date(event.event.time_start))}
                      {event.event.time_type == "default" ? " - " + DatetimeFormatter.formatTimeHHMM(new Date(event.event.time_end)) : ""}
                  </div>
                }
              </div>
            </div>

            <div className="event-details__list">
              {event.location && (
                <>
                  <div className="event-details__lable">
                    <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">
                      location_on
                    </i>
                    {t("info.location")}:
                  </div>
                  <div className="event-details__info">
                    {tr(event.location.name_en, event.location.name_no)}
                    {event.location.city_name &&
                      ", " + event.location.city_name}
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
                <span
                  className="event-details__category-dot"
                  style={{background: event.category.color}}
                ></span>
                {tr(event.category.name_en, event.category.name_no)}
              </div>

              {event.organizations.length > 0 &&
                <>
                  <div className="event-details__lable">
                    <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">
                      person
                    </i>
                    {t("info.organizer")}:
                  </div>
                  <div className="event-details__info">
                    {renderOrganizations(event.organizations)}
                  </div>
                </>
              }
              {event.event.link_stream && (
                <>
                  <div className="event-details__lable">
                    <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">
                      live_tv
                    </i>
                    {t("info.stream")}:
                  </div>
                  <div className="event-details__info">
                    <a
                      className="standard-link standard-link--underscore-hover"
                      href={event.event.link_stream}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {getURLAddress(event.event.link_stream)} <i className="material-symbols-sharp">arrow_outward</i>
                    </a>
                  </div>
                </>
              )}

              {(event.event.link_discord ||
                event.event.link_facebook) && (
                <>
                  <div className="event-details__lable">
                    <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">
                      link
                    </i>
                    {t("info.links")}:
                  </div>
                  <div className="event-details__info">
                    {event.event.link_discord && (
                      <>
                        <a
                          className="standard-link standard-link--underscore-hover"
                          href={event.event.link_discord}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Discord <i className="material-symbols-sharp">arrow_outward</i>
                        </a>
                        <br />
                      </>
                    )}
                    {event.event.link_facebook && (
                      <a
                        className="standard-link standard-link--underscore-hover"
                        href={event.event.link_facebook}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Facebook <i className="material-symbols-sharp">arrow_outward</i>
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
            <EventSignUp
              cap={event.event.capacity}
              url={event.event.link_signup}
              full={event.event.full}
              canceled={event.event.canceled}
              signupRelease={new Date(event.event.time_signup_release)}
              signupDeadline={new Date(event.event.time_signup_deadline)}
            />
          </div>
          <div className="event-banner">
            {useFallbackBanner ? (
              getDefaultBanner(
                event.category.name_no,
                event.category.color
              )
            ) : (
              <picture>
                <img
                  alt={event.eventname}
                  src={config.url.CDN_URL + '/img/events/banner/' + event.event.image_banner}
                  onError={handleImgError}
                  loading="lazy"
                />
              </picture>
            )}
          </div>
          <div className="event-description">
            <Article
              title={(event.event.canceled ? '❌(' + t('canceled') + ') ' : '') + tr(event.event.name_en, event.event.name_no)}
              publishTime={new Date(event.event.time_publish)}
              updateTime={new Date(event.event.updated_at)}
              informational={tr(event.event.informational_en, event.event.informational_no)}
              description={tr(event.event.description_en, event.event.description_no)}
            />
            { event.rule && 
              <div className="rules">
                <DropDownBox
                  title={
                    <>
                      <i className="material-symbols-sharp">gavel</i> {tr(event.rule.name_en, event.rule.name_no)}
                    </>
                  }
                >
                  <div className="rules__content">
                    <MarkdownRender MDstr={tr(event.rule.description_en, event.rule.description_no)} />
                  </div>
                </DropDownBox>
              </div>
            }
          </div>
          {event.location && event.location.type == 'mazemap' && 
            <div className='event-map'>
              <MazeMap campusID={event.location.mazemap_campus_id} poi={event.location.mazemap_poi_id} />
            </div>
          }
        </div>
      }
    </>
  );
};

export default withTranslation("eventPage")(EventPage);
