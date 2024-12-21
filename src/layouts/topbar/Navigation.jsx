import React, { useCallback, useRef } from "react";
import { NavLink } from "react-router-dom";
import { withTranslation } from "react-i18next";


function Navigation({ t }) {
  const navItemRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  // each dropdown item will unfocus (blur) whenever it is clicked.
  // this prevents it from staying visble after removing the mouse.
  // this allows for showing the dropdown on focus and hover without
  // being focused anfter clicking it. Accessibility smooth as hell
  const handleClick = useCallback(() => {
    navItemRefs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.blur();
      }
    });
  }, [navItemRefs]);

  return (
    <nav className="main-nav">
      <NavLink to="events">
        <li className="main-nav__item link--corner-hover">{t("nav.events")}</li>
      </NavLink>
      <NavLink to="career">
        <li className="main-nav__item link--corner-hover">{t("nav.jobad")}</li>
      </NavLink>
      <NavLink to="companies">
        <li className="main-nav__item link--corner-hover">
          {t("nav.companies")}
        </li>
      </NavLink>
      <div className="main-nav-dropdown">
        <div className="main-nav-dropdown__toggle" tabIndex={0}>
          <div className="main-nav__item">
            {t("nav.about")}
            <i className="material-symbols-sharp main-nav-dropdown__toggle-arrow">
              expand_more
            </i>
          </div>
          <div className="main-nav-dropdown__wrapper">
            <ul className="main-nav-dropdown__items">
              <NavLink
                to="about"
                ref={navItemRefs.current[0]}
                onClick={handleClick}
              >
                <li className="main-nav-dropdown__item link--corner-hover">
                  <i className="logfont-login main-nav-dropdown__leading-icon"></i>
                  {t("nav.general")}
                </li>
              </NavLink>
              <NavLink
                to="verv"
                ref={navItemRefs.current[1]}
                onClick={handleClick}
              >
                <li className="main-nav-dropdown__item link--corner-hover">
                  <i className="material-symbols-sharp main-nav-dropdown__leading-icon">
                    favorite
                  </i>
                  {t("nav.verv")}
                </li>
              </NavLink>
              <NavLink
                to="fond"
                ref={navItemRefs.current[2]}
                onClick={handleClick}
              >
                <li className="main-nav-dropdown__item link--corner-hover">
                  <i class="fund-section__header-icon material-symbols-sharp main-nav-dropdown__leading-icon">
                    corporate_fare
                  </i>
                  {t("nav.fondet")}
                </li>
              </NavLink>
              <a
                title="Wiki"
                href="https://wiki.login.no"
                target="_blank"
                rel="noreferrer"
                ref={navItemRefs.current[3]}
                onClick={handleClick}
              >
                <li className="main-nav-dropdown__item link--corner-hover">
                  <i className="material-symbols-sharp main-nav-dropdown__leading-icon">
                    import_contacts
                  </i>
                  Wiki
                  <i className="material-symbols-sharp wiki__arrow">
                    arrow_outward
                  </i>
                </li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default withTranslation("layout")(Navigation);
