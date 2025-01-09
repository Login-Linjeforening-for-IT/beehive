import { useTranslation } from "react-i18next";
import { config } from "../../Constants";
import SocialLinks from "./SocialLinks";

import "./Footer.css";


var version = process.env.REACT_APP_FRONTEND_VERSION;

const Footer = () => {

  const { t } = useTranslation("layout");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <div className="footer-content">
      <div className="footer-content__logos-conteiner">
        <div className="footer-content__logo">
          <picture className="footer-content__logo-picture">
            <img
              src={process.env.PUBLIC_URL + "/img/logo/logo-tekst-white.svg"}
              className="footer-content__logo-image"
              alt="Login - Linjeforeningen for IT"
            />
          </picture>
        </div>
        <div className="footer-content__logo">
          <a href="https://www.mnemonic.io/" target="_blank">
            <picture className="footer-content__logo-picture">
              <img
                src={
                  config.url.CDN_URL +
                  "/img/company/mnemonic-logo_light-nopayoff-2021.svg"
                }
                className="footer-content__logo-image"
                alt="mnemonic"
              />
            </picture>
          </a>
          <p className="footer-content__logo-text">{t("footer.sponsor")}</p>
        </div>
      </div>
      <div className="footer-content__contact">
        <div className="footer-content__contact-section">
          <h4 className="footer-content__contact-header">
            {t("footer.contactInfo.address.header")}
          </h4>
          <p className="footer-content__contact-text">
            {t("footer.contactInfo.address.info1")}
            <br />
            {t("footer.contactInfo.address.info2")}
            <br />
            {t("footer.contactInfo.address.info3")}
          </p>
        </div>
        <div className="footer-content__contact-section">
          <h4 className="footer-content__contact-header">
            {t("footer.contactInfo.address.header")}
          </h4>
          <p className="footer-content__contact-text">
            <a
              className="footer-content__contact-link link--underscore-hover"
              href="mailto:kontakt@login.no"
            >
              kontakt@login.no
            </a>
          </p>
        </div>
      </div>
      <div className="footer-content__social-links">
        <SocialLinks />
      </div>
      <div className="footer-content__bottom">
        <p
          className="footer-content__bottom-text"
          dangerouslySetInnerHTML={{
            __html: ` ${t("footer.copy1")} ${currentYear} ${t("footer.copy2")}`,
          }}
        />
        {typeof version !== "undefined" ? (
          <a
            className="footer-content__version-tag"
            target="_blank"
            href={
              "https://git.logntnu.no/tekkom/web/beehive/frontend/-/tags/" +
              version
            }
          >
            v{version}
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default Footer;
