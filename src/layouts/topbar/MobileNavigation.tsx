import Link from "next/link"
import { useState } from "react"
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
            <Link onClick={close} href="/events" tabIndex={open ? 0 : -1}>
                <li className="mobile-nav__item">{t("nav.events")}</li>
            </Link>
            <Link onClick={close} href="/career" tabIndex={open ? 0 : -1}>
                <li className="mobile-nav__item">{t("nav.jobad")}</li>
            </Link>
            <Link onClick={close} href="/companies" tabIndex={open ? 0 : -1}>
                <li className="mobile-nav__item">{t("nav.companies")}</li>
            </Link>
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
                    <Link
                        onClick={close}
                        href="/about"
                        tabIndex={open && isDropdownOpen ? 0 : -1}
                    >
                        <li className="mobile-nav-dropdown__item">{t("nav.general")}</li>
                    </Link>
                    <Link
                        onClick={close}
                        href="/verv"
                        tabIndex={open && isDropdownOpen ? 0 : -1}
                    >
                        <li className="mobile-nav-dropdown__item">{t("nav.verv")}</li>
                    </Link>
                    <Link
                        onClick={close}
                        href="/fond"
                        tabIndex={open && isDropdownOpen ? 0 : -1}
                    >
                        <li className="mobile-nav-dropdown__item">{t("nav.fondet")}</li>
                    </Link>
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
