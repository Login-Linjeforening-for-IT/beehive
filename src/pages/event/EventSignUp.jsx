
import { withTranslation } from "react-i18next";
import * as DatetimeFormatter from "../../utils/DatetimeFormatter";

const EventSignUp = ({ t, i18n, url, full, releaseTime, deadlineTime }) => {

    const signupRelease = new Date(releaseTime);
    const signupDeadline = new Date(deadlineTime);
    const currentTime = new Date();
    const lang = i18n.language == "en" ? "en" : "no";

    if (url) {
      if (full) {
        return (
          <div className="event-signup">
            <div className="event-signup__header">
              <i className="material-symbols-sharp">exit_to_app</i>
              {t("signup.signup")}:
            </div>
            <div className="event-signup__msg">
              {t("signup.signup-full")}
            </div>
            <a
              href={url}
              target="_blank"
              className="event-signup__btn standard-button standard-button--disabled"
            >
              {t("signup.signup-action")} <i className="material-symbols-sharp">arrow_outward</i>
            </a>
          </div>
        )
      }
      if (signupRelease < currentTime && currentTime < signupDeadline) {
        return (
          <div className="event-signup">
            <div className="event-signup__header">
              <i className="material-symbols-sharp">exit_to_app</i>
              {t("signup.signup")}:
            </div>
            <div className="event-signup__msg">
              {t('signup.signup-deadline')}: {DatetimeFormatter.formatDateDowDT(signupDeadline, lang)}
            </div>
            <a
              href={url}
              target="_blank"
              className="event-signup__btn standard-button standard-button--primary"
            >
              {t("signup.signup-action")} <i className="material-symbols-sharp">arrow_outward</i>
            </a>
          </div>
        );
      } 
      if (signupRelease > currentTime) {
        return (
          <div className="event-signup">
            <div className="event-signup__header">
              <i className="material-symbols-sharp">exit_to_app</i>
              {t("signup.signup")}:
            </div>
            <div className="event-signup__msg">
              {t("signup.signup-open")}: {DatetimeFormatter.formatDateDowDT(signupRelease, lang)}
            </div>
            <a
              href={url}
              target="_blank"
              className="event-signup__btn standard-button standard-button--disabled"
            >
              {t("signup.signup-action")} <i className="material-symbols-sharp">arrow_outward</i>
            </a>
          </div>
        );
      } 
      if (currentTime > signupDeadline) {
        return (
          <div className="event-signup">
            <div className="event-signup__header">
              <i className="material-symbols-sharp">exit_to_app</i>
              {t("signup.signup")}:
            </div>
            <a
              href={url}
              target="_blank"
              className="event-signup__btn standard-button standard-button--disabled"
            >
              {t("signup.signup-closed")} <i className="material-symbols-sharp">arrow_outward</i>
            </a>
          </div>
        )
      }
    }
  
    return (
      <div className="event-signup">
        <div className="event-signup__header">
          <i className="material-symbols-sharp">exit_to_app</i>
          {t("signup.signup")}:
        </div>
        <div className="event-signup__msg">
          {t("signup.no-signup")}
        </div>
      </div>
    );
  };

  export default withTranslation("eventPage")(EventSignUp);