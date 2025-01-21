'use client'

import Button from '@components/shared/button/Button'
import Alert from '@components/shared/alert/Alert'
import './EventSignUp.css'
import no from '@text/eventPage/no.json'
import en from '@text/eventPage/en.json'
import { formatDeadlineDate, formatPublishedDate } from '@utils/DatetimeFormatter'
import { useContext } from 'react'
import AppContext from '@context/context'
import ArrowOutward from '@components/svg/symbols/ArrowOutward'

type EventSignUpProps = {
    url: string
    full: boolean
    canceled: boolean
    cap: number | null
    signupRelease: Date
    signupDeadline: Date 
}

export default function EventSignUp({
    url,
    full,
    canceled = false,
    cap = null,
    signupRelease,
    signupDeadline,
}: EventSignUpProps) {
    const { lang } = useContext(AppContext)
    const text = lang === 'en' ? en : no
    const now = new Date()
    let msg = ''
    let reqSignup = true
    let ready = true
    let active = false
    let showBtn = true
    let warning = false

    if (canceled) {
        msg = text.signup.canceled
        showBtn = false
        warning = true
    } else if (url === '') {
        reqSignup = false
        showBtn = false
        msg = text.signup.none
    } else if (url === 'TBD') {
        ready = false
        showBtn = false
        msg = text.signup.notReady
    } else if (now > signupDeadline) {
        msg =
      text.signup.closed +
      ': ' +
      formatPublishedDate(signupDeadline, lang)
        warning = true
    } else if (full) {
        msg = text.signup.full
        warning = true
    } else if (now > signupRelease && now < signupDeadline) {
        active = true
    }

    return (
        <div
            className={`event-signup event-signup--${
                showBtn ? 'bottom-left-corner' : 'bottom-right-corner'
            }`}
        >
            <div className="event-signup_header">{text.signup.title}:</div>

            {!canceled && ready && reqSignup && (
                <div className="event-details_list">
                    {/* @ts-ignore */}
                    {cap > 0 && (
                        <>
                            <div className="event-details_lable">
                                <i className="event-details_icon event-details_icon--lable-color material-symbols-sharp">
                                    confirmation_number
                                </i>
                                {text.info.capacity}:
                            </div>
                            <div className="event-details_info">{cap}</div>
                        </>
                    )}
                    {ready && (
                        <>
                            <div className="event-details_lable">
                                <i className="event-details_icon event-details_icon--lable-color material-symbols-sharp">
                                    exit_to_app
                                </i>
                                {now < signupRelease
                                    ? text.signup.opens
                                    : text.signup.hasOpened}
                                :
                            </div>
                            <div className="event-details_info">
                                {now < signupRelease
                                    ? formatDeadlineDate(signupRelease, lang)
                                    : formatPublishedDate(signupRelease, lang)}
                            </div>
                        </>
                    )}
                    {ready && now < signupDeadline && (
                        <>
                            <div className="event-details_lable">
                                <i className="event-details_icon event-details_icon--lable-color material-symbols-sharp">
                                    disabled_by_default
                                </i>
                                {text.signup.closes}:
                            </div>
                            <div className="event-details_info">
                                {formatDeadlineDate(signupDeadline, lang)}
                            </div>
                        </>
                    )}
                </div>
            )}
            {msg && (
                <Alert
                    variant={warning ? 'warning' : 'info'}
                    className="event-signup_alert"
                >
                    {msg}
                </Alert>
            )}
            {reqSignup && ready && showBtn && (
                <div className="event-signup_btn-container">
                    {/* @ts-ignore */}
                    <Button
                        trailingIcon={
                            <ArrowOutward size="1.5rem" fill="white" className=""/>
                        }
                        href={url}
                        className="event-signup_btn"
                        variant="primary"
                        disabled={active ? false : true}
                    >
                        {text.signup.action}
                    </Button>
                </div>
            )}
        </div>
    )
}

// Oversikt:

// Har ikke åpnet
//                   _
// Påmelding:          |
//
// cap:     int
// åpner:   tid
// stenger: tid
//
// |_       [  disab  ]

// Er åpen, if now > realise && now < deadline
//                   _
// Påmelding:          |
//
// cap:     int
// åpnet:   tid
// stenger: tid
//
// |_       [  aktiv  ]

// Krever ingen påmelding, link = ""
//                   _
// Påmelding:          |
//
// Krever ingen
// påmelding
//                   _|

// Åpner tbd, link = "tbd"
//                   _
// Påmelding:          |
//
// cap: x
//
// Påmeldingen er
// ikke klar
//                   _|

// stengt, if now > deadline
//                   _
// Påmelding:          |
//
// cap:   x
// åpnet: tid
//
// Påmeldingen stengte: [formatPublishedDate()]
//
// |_       [  disab  ]

// fullt, full = true
//                   _
// Påmelding:          |
//
// cap:     x
// åpnet:   tid
// stenger: tid
//
// Påmeldingen er full
//
// |_       [  disab  ]
