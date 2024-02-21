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
import * as Translator from '../../utils/GetTranslation';
import { config } from "../../Constants";
import "./EventCard.css";


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


const EventCard= ({i18n, event, disableTags=false}) => {

  const lang = i18n.language == "en" ? "en" : "no";
  const useEng = lang === 'en';
  const tr = Translator.getTranslation(useEng);

  const [showImage, setShowImage] = useState(true);
  const hideImg = () => {
    setShowImage(false);
  };

  return (
    <Link to={'/events/' + event.id}>
      <div className="event-card">
        <div className="event-card__top">
          <DateTile
            startDate={new Date(event.time_start)}
            endDate={new Date(event.time_start)}
            color={event.category_color}
          />
          <picture className="event-card__picture">
            {showImage ? (
              <img
              className="event-card__img"
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
        <div className="event-card__info">
          <div className="event-card__name">{tr(event.name_en, event.name_no)}</div>
          <ul className="event-card__details">
            {(event.time_type.toLowerCase() != "tbd" && event.time_type.toLowerCase() != "whole_day") &&
              <li className="event-card__detail">
                <i className="event-card__icon material-symbols-sharp">
                  schedule
                </i>
                {DatetimeFormatter.formatEventStartDate(new Date(event.time_start), lang)}
              </li>
            }
            {event.location_name_no && (
              <li className="event-card__detail">
                <i className="event-card__icon material-symbols-sharp">
                  location_on
                </i>
                {tr(event.location_name_en, event.location_name_no)}
              </li>
            )}
          </ul>
        </div>
        {!disableTags &&
          <div className="event-card__tags">
            <Tags
              highlight={event.highlight}
              timePublish={new Date(event.time_publish)}
              canceled={event.canceled}
            />
          </div>
        }
      </div>
    </Link>
  );
};

export default withTranslation("eventListPage")(EventCard);
