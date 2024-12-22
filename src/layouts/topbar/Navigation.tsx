import React, { useCallback, useRef } from "react"
// @ts-ignore
import { withTranslation } from "react-i18next"
import Link from "next/link"


function Navigation({ t }: any) {
    const navItemRefs = useRef([
        React.createRef(),
        React.createRef(),
        React.createRef(),
    ])

    // each dropdown item will unfocus (blur) whenever it is clicked.
    // this prevents it from staying visble after removing the mouse.
    // this allows for showing the dropdown on focus and hover without
    // being focused anfter clicking it. Accessibility smooth as hell
    const handleClick = useCallback(() => {
        navItemRefs.current.forEach((ref) => {
            if (ref.current) {
                // @ts-ignore
                ref.current.blur()
            }
        })
    }, [navItemRefs])

    return (
        <nav className="main-nav">
            <Link href="/events">
                <li className="main-nav__item link--corner-hover">{t("nav.events")}</li>
            </Link>
            <Link href="/career">
                <li className="main-nav__item link--corner-hover">{t("nav.jobad")}</li>
            </Link>
            <Link href="/companies">
                <li className="main-nav__item link--corner-hover">
                    {t("nav.companies")}
                </li>
            </Link>
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
                            <Link
                                href="/about"
                                ref={navItemRefs.current[0] as any}
                                onClick={handleClick}
                            >
                                <li className="main-nav-dropdown__item link--corner-hover">
                                    <i className="logfont-login main-nav-dropdown__leading-icon"></i>
                                    {t("nav.general")}
                                </li>
                            </Link>
                            <Link
                                href="verv"
                                ref={navItemRefs.current[1] as any}
                                onClick={handleClick}
                            >
                                <li className="main-nav-dropdown__item link--corner-hover">
                                    <i className="material-symbols-sharp main-nav-dropdown__leading-icon">
                                        favorite
                                    </i>
                                    {t("nav.verv")}
                                </li>
                            </Link>
                            <Link
                                href="/fond"
                                ref={navItemRefs.current[2] as any}
                                onClick={handleClick}
                            >
                                <li className="main-nav-dropdown__item link--corner-hover">
                                    <i className="fund-section__header-icon material-symbols-sharp main-nav-dropdown__leading-icon">
                                        corporate_fare
                                    </i>
                                    {t("nav.fondet")}
                                </li>
                            </Link>
                            <a
                                title="Wiki"
                                href="https://wiki.login.no"
                                target="_blank"
                                rel="noreferrer"
                                // @ts-ignore
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
    )
};

export default withTranslation("layout")(Navigation)
