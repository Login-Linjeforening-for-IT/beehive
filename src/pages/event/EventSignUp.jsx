
import { withTranslation } from "react-i18next";
import * as DatetimeFormatter from "../../utils/DatetimeFormatter";

const EventSignUp = ({ t, event }) => {
    const signupRelease = new Date(event.time_signup_release);
    const signupDeadline = new Date(event.time_signup_deadline);
    const currentTime = new Date();

    if (event.link_signup) {
      if (event.full) {
        return (
          <div className="event-signup">
            <div className="event-signup__msg">
              <i className="material-symbols-sharp event-signup__msg-icon">disabled_by_default</i> 
              {t("signup.signup-full")}
            </div>
          </div>
        )
      }
      if (signupRelease < currentTime && currentTime < signupDeadline) {
        return (
          <div className="event-signup">
            <a
              href={event.link_signup}
              className="event-signup__btn standard-button standard-button--primary"
            >
              {t("signup.signup")} <i className="material-symbols-sharp">arrow_outward</i>
            </a>
          </div>
        );
      } 
      if (signupRelease > currentTime) {
        return (
          <div className="event-signup">
            <div className="event-signup__msg">
              <i className="material-symbols-sharp event-signup__msg-icon">exit_to_app</i>
              {t("signup.signup-open")} {DatetimeFormatter.formatDateDT(signupRelease, "no")}
            </div>
          </div>
        );
      } 
      if (currentTime > signupDeadline) {
        return (
          <div className="event-signup">
            <div className="event-signup__msg">
              <i className="material-symbols-sharp event-signup__msg-icon">disabled_by_default</i> 
              {t("signup.signup-closed")}
            </div>
          </div>
        )
      }
    }
  
    return (
      <div className="event-signup">
        <div className="event-signup__msg">
          <i className="material-symbols-sharp event-signup__msg-icon">info</i>
          {t("signup.no-signup")}
        </div>
      </div>
    );
  };

  export default withTranslation("eventPage")(EventSignUp);