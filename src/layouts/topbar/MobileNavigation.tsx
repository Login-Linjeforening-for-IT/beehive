'use client'

import { useState } from "react"
// @ts-ignore
import { NavLink } from "react-router-dom"
// @ts-ignore
import { withTranslation } from "react-i18next"

function MobileNavigation({ t, open, setIsOpen }: any) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    function close() {
        setIsOpen(false)
        setIsDropdownOpen(false)
    }

    return (
        <nav className={`mobile-nav${open ? " mobile-nav--open" : ""}`}>
            <NavLink onClick={close} to="events" tabIndex={open ? 0 : -1}>
                <li className="mobile-nav__item">{t("nav.events")}</li>
            </NavLink>
            <NavLink onClick={close} to="career" tabIndex={open ? 0 : -1}>
                <li className="mobile-nav__item">{t("nav.jobad")}</li>
            </NavLink>
            <NavLink onClick={close} to="companies" tabIndex={open ? 0 : -1}>
                <li className="mobile-nav__item">{t("nav.companies")}</li>
            </NavLink>
            <div
                className={`mobile-nav-dropdown${
                    isDropdownOpen ? " mobile-nav-dropdown--open" : ""
                }`}
            >
                <button
                    className="mobile-nav-dropdown__toggle"
                    onClick={toggleDropdown}
                    tabIndex={open ? 0 : -1}
                >
                    <li className="mobile-nav__item">
                        {t("nav.about")}
                        <i className="material-symbols-sharp mobile-nav-dropdown__toggle-arrow">
                            expand_more
                        </i>
                    </li>
                </button>
                <div className="mobile-nav-dropdown__items">
                    <NavLink
                        onClick={close}
                        to="about"
                        tabIndex={open && isDropdownOpen ? 0 : -1}
                    >
                        <li className="mobile-nav-dropdown__item">{t("nav.general")}</li>
                    </NavLink>
                    <NavLink
                        onClick={close}
                        to="verv"
                        tabIndex={open && isDropdownOpen ? 0 : -1}
                    >
                        <li className="mobile-nav-dropdown__item">{t("nav.verv")}</li>
                    </NavLink>
                    <NavLink
                        onClick={close}
                        to="fond"
                        tabIndex={open && isDropdownOpen ? 0 : -1}
                    >
                        <li className="mobile-nav-dropdown__item">{t("nav.fondet")}</li>
                    </NavLink>
                    <a
                        title="Wiki"
                        href="https://wiki.login.no"
                        target="_blank"
                        rel="noreferrer"
                        tabIndex={open && isDropdownOpen ? 0 : -1}
                    >
                        <li className="mobile-nav-dropdown__item">
                            Wiki
                            <i className="material-symbols-sharp wiki__arrow">
                                arrow_outward
                            </i>
                        </li>
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default withTranslation("layout")(MobileNavigation)
