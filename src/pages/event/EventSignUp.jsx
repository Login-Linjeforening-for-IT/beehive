import { withTranslation } from "react-i18next";

import * as DatetimeFormatter from "../../utils/DatetimeFormatter";

import Button from "../../components/button/Button";
import Alert from "../../components/alert/Alert";

import "./EventSignUp.css";


const EventSignUp = ({
  t,
  i18n,
  url,
  full,
  canceled = false,
  cap = null,
  signupRelease,
  signupDeadline,
}) => {
  const now = new Date();
  const lang = i18n.language == "en" ? "en" : "no";

  let msg = "";
  let reqSignup = true;
  let ready = true;
  let active = false;
  let showBtn = true;
  let warning = false;
  let msgIcon = "info";

  if (canceled) {
    msg = t("signup.canceled");
    showBtn = false;
    warning = true;
    msgIcon = "disabled_by_default";
  } else if (url === "") {
    reqSignup = false;
    showBtn = false;
    msg = t("signup.none");
  } else if (url === "TBD") {
    ready = false;
    showBtn = false;
    msg = t("signup.not-ready");
  } else if (now > signupDeadline) {
    msg =
      t("signup.closed") +
      ": " +
      DatetimeFormatter.formatPublishedDate(signupDeadline, lang);
    warning = true;
    msgIcon = "disabled_by_default";
  } else if (full) {
    msg = t("signup.full");
    warning = true;
    msgIcon = "sentiment_dissatisfied";
  } else if (now > signupRelease && now < signupDeadline) {
    active = true;
  }

  return (
    <div
      className={`event-signup event-signup--${
        showBtn ? "bottom-left-corner" : "bottom-right-corner"
      }`}
    >
      <div className="event-signup__header">{t("signup.title")}:</div>

      {!canceled && ready && reqSignup && (
        <div className="event-details__list">
          {cap > 0 && (
            <>
              <div className="event-details__lable">
                <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">
                  confirmation_number
                </i>
                {t("info.capacity")}:
              </div>
              <div className="event-details__info">{cap}</div>
            </>
          )}
          {ready && (
            <>
              <div className="event-details__lable">
                <i className="event-details__icon event-details__icon--lable-color material-symbols-sharp">
                  exit_to_app
                </i>
                {now < signupRelease
                  ? t("signup.opens")
                  : t("signup.hasOpened")}
                :
              </div>
              <div className="event-details__info">
                {now < signupRelease
                  ? DatetimeFormatter.formatDeadlineDate(signupRelease, lang)
                  : DatetimeFormatter.formatPublishedDate(signupRelease, lang)}
              </div>
            </>
          )}
          {ready && now < signupDeadline && (
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
          )}
        </div>
      )}
      {msg && (
        <Alert
          variant={warning ? "warning" : "info"}
          icon={msgIcon}
          className="event-signup__alert"
        >
          {msg}
        </Alert>
      )}
      {reqSignup && ready && showBtn && (
        <div className="event-signup__btn-container">
          <Button
            trailingIcon={
              <i className="material-symbols-sharp">arrow_outward</i>
            }
            href={url}
            className="event-signup__btn"
            variant="primary"
            disabled={active ? false : true}
          >
            {t("signup.action")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default withTranslation("eventPage")(EventSignUp);

// Oversikt:

// Har ikke åpnet
//                   __
// Påmelding:          |
//
// cap:     int
// åpner:   tid
// stenger: tid
//
// |__       [  disab  ]

// Er åpen, if now > realise && now < deadline
//                   __
// Påmelding:          |
//
// cap:     int
// åpnet:   tid
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
// cap:   x
// åpnet: tid
//
// Påmeldingen stengte: [formatPublishedDate()]
//
// |__       [  disab  ]

// fullt, full = true
//                   __
// Påmelding:          |
//
// cap:     x
// åpnet:   tid
// stenger: tid
//
// Påmeldingen er full
//
// |__       [  disab  ]
