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
import * as DatetimeFormatter from "../../utils/DatetimeFormatter";
import * as Translator from '../../utils/GetTranslation'
import { config } from "../../Constants";
import "./EventListItem.css";


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


const EventListItem = ({ i18n, event, highlight=false}) => {

  const lang = i18n.language == "en" ? "en" : "no";
  const useEng = lang === 'en';
  const tr = Translator.getTranslation(useEng);

  const [showImage, setShowImage] = useState(true);
  const hideImg = () => setShowImage(false);

  return (
    <Link to={'/events/' + event.id}>
      <div className={highlight ? "events-item events-item--highlight" : "events-item" }>
        <div className="events-item__wrapper">
          <DateTile
            startDate={new Date(event.time_start)}
            endDate={new Date(event.time_end)}
            color={event.category_color}
          />
          <div className="events-item__middle">
            <div className="events-item__name">{tr(event.name_en, event.name_no)}</div>
            <ul className="events-item__details">
              {(event.time_type.toLowerCase() != "tbd" && event.time_type.toLowerCase() != "whole_day") &&
                <li className="events-item__detail">
                  <i className="events-item__icon material-symbols-sharp">
                    schedule
                  </i>
                  {DatetimeFormatter.formatEventStartDate(new Date(event.time_start), lang)}
                </li>
              }
              {event.location_name_no && (
                <li className="events-item__detail">
                  <i className="events-item__icon material-symbols-sharp">
                    location_on
                  </i>
                  {tr(event.location_name_en, event.location_name_no)}
                </li>
              )}
            </ul>
            <div className="events-item__tags">
              <Tags
                highlight={highlight}
                timePublish={new Date(event.time_publish)}
                canceled={event.canceled}
              />
            </div>
          </div>
          <picture className="events-item__picture">
            {showImage ? (
              <img
                className="events-item__img"
                alt={event.image_small}
                src={config.url.CDN_URL + '/img/events/small/' + event.image_small}
                onError={hideImg}
                loading="lazy"
              />
            ) : (
              getDefaultBanner(event.category_name_no, event.category_color)
            )}
          </picture>
        </div>
      </div>
    </Link>
  );
};


export default withTranslation("eventListPage")(EventListItem);