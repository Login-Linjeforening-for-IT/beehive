import { useState } from "react";
import { withTranslation } from "react-i18next";
import DateTile from "../../components/datetile/DateTile";
import DefaultEventBanner from "../../components/svg/defaultbanners/DefaultEventBanner";
import DefaultCtfBanner from "../../components/svg/defaultbanners/DefaultCtfBanner";
import DefaultTekkomBanner from "../../components/svg/defaultbanners/DefaultTekkomBanner";
import DefaultBedpresBanner from "../../components/svg/defaultbanners/DefaultBedpresBanner";
import DefaultSocialBanner from "../../components/svg/defaultbanners/DefaultSocialBanner";
import * as TimeFormatter from "../../utils/DatetimeFormatter";
import * as ImageLinker from "../../utils/ImageLinker";
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

const isNew = (publishedDate) => {

  let difLim = 7 * 24 * 60 * 60 * 1000 // one week
  let dateNow = new Date()

  return (dateNow - Date.parse(publishedDate)) < difLim;
}

const EventListItem = ({ t, i18n, event }) => {

  const [showImage, setShowImage] = useState(true);
  const hideImg = () => {
    setShowImage(false);
  };

  return (
    <div className={event.highlight ? "events-item events-item--highlight" : "events-item" }>
      <div className="events-item__wrapper">
        <DateTile
          date={event.time_start}
          language={i18n.language == "en" ? "en" : "no"}
          color={event.category_color}
        />
        <div className="events-item__middle">
          <div className="events-item__tags">
            {event.canceled &&
              <div className='events-item__tag tag tag--canceled'>{t("canceled")}</div>
            }
            {isNew(event.time_publish) &&
              <div className='events-item__tag tag tag--primary'>{t("new")}</div>
            }
            {event.highlight &&
              <div className="events-item__tag tag tag--primary">{t("highlight")}</div>
            }
          </div>
          <div className="events-item__name">{event.name_no}</div>
          <ul className="events-item__details">
            <li className="events-item__detail">
              <i className="events-item__icon material-symbols-sharp">schedule</i>
              {TimeFormatter.getTimeHHmm(event.time_start)}
            </li>
            {event.location_name_no && (
              <li className="events-item__detail">
                <i className="events-item__icon material-symbols-sharp">
                  location_on
                </i>
                {event.location_name_no}
              </li>
            )}
          </ul>
        </div>
        <picture className="events-item__picture">
          {showImage ? (
            <img
              className="events-item__img"
              alt={event.name_no}
              src={ImageLinker.getCDNLink(event.image_small)}
              onError={hideImg}
              loading="lazy"
            />
          ) : (
            getDefaultBanner(event.category_name_no, event.category_color)
          )}
        </picture>
      </div>
    </div>
  );
};

export default withTranslation("eventListPage")(EventListItem);
