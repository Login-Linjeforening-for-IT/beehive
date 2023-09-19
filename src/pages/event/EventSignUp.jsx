
import { withTranslation } from "react-i18next";
import * as DatetimeFormatter from "../../utils/DatetimeFormatter";


const EventSignUp = ({ t, event }) => {
    const signupRelease = new Date(event.time_signup_release);
    const signupDeadline = new Date(event.time_signup_deadline);
    const currentTime = new Date();

    if (event.link_signup) {
      if (signupRelease < currentTime && currentTime < signupDeadline) {
        return (
          <a
            href={event.link_signup}
            className="jobad-details__apply-btn standard-button standard-button--primary"
          >
            {t("signup.signup")} <i className="material-symbols-sharp">arrow_outward</i>
           
          </a>
        );
      } else if (signupRelease > currentTime) {
        return (
          <div>
            {t("signup.signup-open")}:<br/> {DatetimeFormatter.formatDateDT(signupRelease, "no")}
          </div>
        );
      } else if (currentTime > signupDeadline) {
        return <div>{t("signup.signup-closed")}</div>;
      }
    }
  
    return <div>{t("signup.no-signup")}</div>;
  };

  export default withTranslation("eventPage")(EventSignUp);