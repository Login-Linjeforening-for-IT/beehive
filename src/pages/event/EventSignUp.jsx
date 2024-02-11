
import { withTranslation } from "react-i18next";
import * as DatetimeFormatter from "../../utils/DatetimeFormatter";
import "./EventSignUp.css";

const EventSignUp = ({ t, i18n, url, full, canceled=false, cap=null, signupRelease, signupDeadline }) => {

  const now = new Date();
  const lang = i18n.language == "en" ? "en" : "no";

  let msg = "";
  let reqSignup = true;
  let ready = true;
  let activeUrl = false;
  let showBtn = true;
  let warning = false;

  if (canceled) {
    msg = t('signup.canceled');
    showBtn = false;
  } else if (url === '') {
    reqSignup = false;
    showBtn = false;
    msg = t('signup.none');
  } else if (url === 'TBD') {
    ready = false;
    showBtn = false;
    msg = t('signup.not-ready');
  } else if (now > signupDeadline) {
    msg = t('signup.closed') + ': ' + DatetimeFormatter.formatPublishedDate(signupDeadline, lang);
    warning = true;
  } else if (full) {
    msg = t('signup.full');
    warning = true;
  } else if (now > signupRelease && now < signupDeadline) {
    activeUrl = true;
  }

  return (
    <div className={`event-signup event-signup--${showBtn ? 'bottom-left-corner' : 'bottom-right-corner'}`}>
      <div className="event-signup__header">
        {t("signup.title")}:
      </div>

      <div className="event-details__list">
        {!canceled && cap > 0 && reqSignup &&
          <>
            <div className="event-details__lable">
              <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">
                confirmation_number
              </i>
              {t("info.capacity")}: 
            </div>
            <div className="event-details__info">
              {cap}
            </div>
          </>
        }
        {!canceled && reqSignup && ready && now < signupRelease &&
          <>
            <div className="event-details__lable">
              <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">
                exit_to_app
              </i>
              {t("signup.open")}: 
            </div>
            <div className="event-details__info">
              {DatetimeFormatter.formatDeadlineDate(signupRelease, lang)}
            </div>
          </>
        }
        {!canceled && reqSignup && ready && now > signupRelease && now < signupDeadline &&
          <>
            <div className="event-details__lable">
              <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">
                disabled_by_default
              </i>
              {t("signup.closes")}:
            </div>
            <div className="event-details__info">
              {DatetimeFormatter.formatDeadlineDate(signupDeadline, lang)}
            </div>
          </>
        }
        {msg &&
          <div className={`event-signup__msg event-signup__msg${warning ? "--warning" : "--info"}`}>
            <i className="event-details__icon material-symbols-sharp">
              info
            </i>
            {msg}
          </div>
        }
      </div>
      {reqSignup && ready && showBtn &&
        <div className="event-signup__btn-container">
          <a
            href={url}
            target="_blank"
            className={`event-signup__btn standard-button standard-button--${activeUrl ? 'primary' : 'disabled'}`}
          >
            {t("signup.action")} <i className="material-symbols-sharp">arrow_outward</i>
          </a>
        </div>
      }
    </div>
  )
}

export default withTranslation("eventPage")(EventSignUp);



// Oversikt: 


// Har ikke åpnet
//                   __
// Påmelding:          |
//
// cap:     int
// åpner:   tid
// 
// |__       [  disab  ]



// Er åpen, if now > realise && now < deadline
//                   __
// Påmelding:          |
//
// cap:     int
// stenger: tid
// 
// |__       [  aktiv  ]



// Krever ingen påmelding, link = ""
//                   __
// Påmelding:          |
//
// Krever ingen
// påmelding
//                   __|



// Åpner tbd, link = "tbd"
//                   __
// Påmelding:          |
//
// cap: x
// 
// Påmeldingen er 
// ikke klar
//                   __|



// stengt, if now > deadline
//                   __
// Påmelding:          |
//
// cap: x
//
// Påmeldingen stengte: [formatPublishedDate()]
// 
// |__       [  disab  ]



// fullt, full = true
//                   __
// Påmelding:          |
//
// cap: x
//
// Påmeldingen er full
// 
// |__       [  disab  ]

