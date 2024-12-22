// @ts-ignore
import { useNavigate } from "react-router-dom"
// @ts-ignore
import { withTranslation } from "react-i18next"

import LoginLogo from "../svg/brandlogos/LoginLogo"
import Button from "../button/Button"

import "./HeroSection.css"

function HeroSection({ t }: any) {

    const navigate = useNavigate()

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
                            {/* @ts-ignore */}
                            <Button
                                onClick={() => navigate("/events")}
                                leadingIcon={<i className="material-symbols-sharp">event</i>}
                                variant="primary"
                            >
                                {t("heroSection.secondaryButton")}
                            </Button>
                            {/* @ts-ignore */}
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
    )
};

export default withTranslation("landingPage")(HeroSection)
