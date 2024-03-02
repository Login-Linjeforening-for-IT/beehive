import { withTranslation } from "react-i18next";
import { isNew } from "../../utils/DatetimeFormatter";

import './Tags.css';

const Tags = ({t, highlight=false, timePublish=0, canceled=false}) => {
  
  // if there is no need for tags return
  if (!highlight && !isNew(timePublish) && !canceled) return;

  return (
    <>
      {canceled &&
        <div className="tag tag--canceled">
          <div className="tag__container tag__container--canceled">
            <div className="tag__name tag__name--canceled">
              {t("canceled")}
            </div>
          </div>
        </div>
      }
      {isNew(timePublish) &&
        <div className="tag tag--new">
          <div className="tag__container tag__container--new">
            <div className="tag__name tag__name--new">
              {t("new")}
            </div>
          </div>
        </div>
      }
      {highlight &&
        <div className="tag tag--highlight">
          <div className="tag__container tag__container--highlight">
            <div className="tag__name tag__name--highlight">
              {t("highlight")}
            </div>
          </div>
        </div>
      }
    </>
  )
};

export default withTranslation('tags')(Tags);