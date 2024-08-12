import { useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import DateTile from "../datetile/DateTile";
import Tags from "../tags/Tags";
import DefaultEventBanner from "../svg/defaultbanners/DefaultEventBanner";
import DefaultCtfBanner from "../svg/defaultbanners/DefaultCtfBanner";
import DefaultTekkomBanner from "../svg/defaultbanners/DefaultTekkomBanner";
import DefaultBedpresBanner from "../svg/defaultbanners/DefaultBedpresBanner";
import DefaultSocialBanner from "../svg/defaultbanners/DefaultSocialBanner";
import RenderSmoothImage from "../picture/RenderSmoothImage/RenderSmoothImage";
import * as DatetimeFormatter from "../../utils/DatetimeFormatter";
import * as Translator from '../../utils/GetTranslation'
import { config } from "../../Constants";
import { isNew } from '../../utils/DatetimeFormatter';
import "./EventItem.css";


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


const EventListItem = ({ i18n, event, highlight=true, disableTags=false, variant='list-item' }) => {

  const [showImage, setShowImage] = useState(true);
  const lang = i18n.language == "en" ? "en" : "no";
  const useEng = lang === 'en';
  const tr = Translator.getTranslation(useEng);

  const useTags = (publishTime, highlight, canceled) => {
    if (disableTags) return false;
    if (highlight) return true;
    if (isNew(publishTime)) return true;
    if (canceled) return true;
    return false;
  }

  return (
    <Link to={'/events/' + event.id}>
      <div className={`event-item ${highlight ? "event-item--highlight" : ""} ${variant === "card" ? "event-item--card" : "event-item--list-item"}`}>
        <div className="event-item__wrapper">
          {variant === 'list-item' ? (
            <DateTile
              startDate={new Date(event.time_start)}
              endDate={new Date(event.time_end)}
              color={event.category_color}
              day={event.category_name_no === "Fadderuka" ? true : false}
            />
          ) : (
            <>
              <div className="event-item__date-overlay">
                <DateTile
                  startDate={new Date(event.time_start)}
                  endDate={new Date(event.time_end)}
                  color={event.category_color}
                  opacity={0.5}
                  varient="overlay"
                  useDayText={event.category_name_no === "Fadderuka" ? true : false}
                />
              </div>
              {(event.image_small && showImage) ? (
                <RenderSmoothImage
                  className="event-item__img"
                  alt={event.image_small}
                  src={config.url.CDN_URL + '/img/events/small/' + event.image_small}
                  onError={() => setShowImage(false)}
                  transition={false}
                />
              ) : (
                getDefaultBanner(event.category_name_no, event.category_color)
              )}
            </>
          )}
          <div className="event-item__info">
            <div className="event-item__name">{tr(event.name_en, event.name_no)}</div>
            <ul className="event-item__details">
              {(event.time_type.toLowerCase() != "whole_day") &&
                <li className="event-item__detail">
                  <i className="event-item__icon material-symbols-sharp">
                    schedule
                  </i>
                  {event.time_type.toLowerCase() != "tbd" ? 
                    DatetimeFormatter.formatEventStartDate(new Date(event.time_start), lang)
                    :
                    "TBD"
                  }
                </li>
              }
              {event.location_name_no && (
                <li className="event-item__detail">
                  <i className="event-item__icon material-symbols-sharp">
                    location_on
                  </i>
                  {tr(event.location_name_en, event.location_name_no)}
                </li>
              )}
            </ul>
            {useTags(event.time_publish, event.highlight, event.canceled) &&
            <div className="event-item__tags">
              <Tags
                highlight={event.highlight}
                timePublish={new Date(event.time_publish)}
                canceled={event.canceled}
              />
            </div>
          }
          </div>
          {variant === 'list-item' &&
            <picture className="event-item__picture">
              {(event.image_small && showImage) ? (
                <RenderSmoothImage
                  className="event-item__img"
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
  );
};


export default withTranslation("eventListPage")(EventListItem);



// highlight
//
// disable tags
//
// varient
//
// 
//