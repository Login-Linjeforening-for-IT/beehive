import { withTranslation } from "react-i18next";
import { isTimeElapsed } from "../../utils/DatetimeFormatter";

import './Tags.css';

const Tags = ({t, highlight=false, timePublish=0, canceled=false}) => {

    const oneWeek = 7 * 24 * 60 * 60 * 1000; // one week 
    const isNew = !isTimeElapsed(timePublish, oneWeek);
  
    // if there is no need for tags return
    if (!highlight && !isNew && !canceled) return;
  
    return (
      <>
        {canceled &&
          <div className="tag tag--canceled">
            <i className='material-symbols-sharp'>event_busy</i>
            {t("canceled")}
          </div>
        }
        {isNew &&
          <div className='tag tag--new'>
            {t("new")}
          </div>
        }
        {highlight &&
          <div className="tag tag--highlight">
            <i className='material-symbols-sharp'>grade</i>
            {t("highlight")}
          </div>
        }
      </>
    )
};

export default withTranslation('tags')(Tags);