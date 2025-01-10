import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LoginLogo from "../../components/svg/brandlogos/LoginLogo";
import Button from "../../components/button/Button";

import "./HeroSection.css";

const HeroSection = () => {

  const { t } = useTranslation('landingPage');
  const navigate = useNavigate();

  return (
    <div className="hero-section">
      <div className="hero-section__container">
        <div className="hero-section__top">
          <picture className="hero-section__logo">
            <LoginLogo />
          </picture>
          <div className="hero-section__content">
            <span className="hero-section__top-text">
              {t("heroSection.welcome")}
            </span>
            <br />
            <span className="hero-section__gradient-text">login.no</span>
            <div className="hero-section__buttons">
              <Button
                onClick={() => navigate("/events")}
                leadingIcon={<i className="material-symbols-sharp">event</i>}
                variant="primary"
              >
                {t("heroSection.secondaryButton")}
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/about")}
                leadingIcon={<i className="material-symbols-sharp">school</i>}
              >
                {t("heroSection.primaryButton")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
