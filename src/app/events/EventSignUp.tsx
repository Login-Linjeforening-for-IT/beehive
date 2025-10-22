import Button from '@components/shared/button/Button'
import Alert from '@components/shared/alert/Alert'
import no from '@text/eventPage/no.json'
import en from '@text/eventPage/en.json'
import { formatDeadlineDate, formatPublishedDate } from '@utils/DatetimeFormatter'
import ArrowOutward from '@components/svg/symbols/ArrowOutward'
import ConfirmationNumber from '@components/svg/symbols/ConfirmationNumber'
import DisabledByDefault from '@components/svg/symbols/DisabledByDefault'
import ExitToApp from '@components/svg/symbols/ExitToApp'
import { cookies } from 'next/headers'

type EventSignUpProps = {
    url: string
    full: boolean
    canceled: boolean
    cap: number | null
    signupRelease: Date
    signupDeadline: Date
}

export default async function EventSignUp({
    url,
    full,
    canceled = false,
    cap = null,
    signupRelease,
    signupDeadline,
}: EventSignUpProps) {
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang
    const text = lang === 'no' ? no : en
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
    } else if (url === '' || url === null || url === undefined) {
        reqSignup = false
        showBtn = false
        msg = text.signup.none
    } else if (url === 'TBD') {
        ready = false
        showBtn = false
        msg = text.signup.notReady
    } else if (now > signupDeadline) {
        msg = text.signup.closed + ': ' + formatPublishedDate(signupDeadline, lang)
        warning = true
    } else if (full) {
        msg = text.signup.full
        warning = true
    } else if (now > signupRelease && now < signupDeadline) {
        active = true
    }

    return (
        <div
            className={`mt-[1.8rem] pt-[1.2rem] border-t-[0.2rem] border-solid border-[var(--color-border-default)] 800px:relative 800px:after:content-[""] 800px:after:w-[2.6rem] 800px:after:h-[2.6rem] 800px:after:absolute 800px:after:border-[var(--color-border-default)] 800px:after:bottom-0 800px:after:transition 800px:after:duration-100 event-signup--${showBtn ? '800px:after:left-0 800px:after:border-b-[0.7rem] 800px:after:border-l-[0.7rem]  800px:after:border-solid' : 'group 800px:pb-[3rem] 800px:after:border-r-[0.7rem] 800px:after:border-b-[0.7rem] 800px:after:border-solid 800px:after:right-0'}`}
        >
            <div className='mb-[1rem] text-[1.2rem] font-medium'>{text.signup.title}:</div>

            {!canceled && ready && reqSignup && (
                <div className='event-details_list'>
                    {/* @ts-ignore */}
                    {cap > 0 && (
                        <>
                            <div className='event-details_lable'>
                                <ConfirmationNumber className='fill-[var(--color-text-discreet)] event-details_icon event-details_icon--lable-color' />
                                {text.info.capacity}:
                            </div>
                            <div className='event-details_info'>{cap}</div>
                        </>
                    )}
                    {ready && (
                        <>
                            <div className='event-details_lable'>
                                <ExitToApp className='fill-[var(--color-text-discreet)] event-details_icon event-details_icon--lable-color' />
                                {now < signupRelease
                                    ? text.signup.opens
                                    : text.signup.hasOpened}
                                :
                            </div>
                            <div className='event-details_info'>
                                {now < signupRelease
                                    ? formatDeadlineDate(signupRelease, lang)
                                    : formatPublishedDate(signupRelease, lang)}
                            </div>
                        </>
                    )}
                    {ready && now < signupDeadline && (
                        <>
                            <div className='event-details_lable'>
                                <DisabledByDefault className='fill-[var(--color-text-discreet)] event-details_icon event-details_icon--lable-color ' />
                                {text.signup.closes}:
                            </div>
                            <div className='event-details_info'>
                                {formatDeadlineDate(signupDeadline, lang)}
                            </div>
                        </>
                    )}
                </div>
            )}
            {msg && (
                <Alert
                    variant={warning ? 'warning' : 'info'}
                    className='mb-[1rem] 400px:w-fit 400px:max-w-[20rem] 800px:group-valid:m-[0_auto_0_0] 800px:max-w-[17rem] 800px:w-fit 800px:ml-auto'
                >
                    {msg}
                </Alert>
            )}
            {reqSignup && ready && showBtn && (
                <div className='800px:flex 800px:justify-end'>
                    {/* @ts-ignore */}
                    <Button
                        trailingIcon={
                            <ArrowOutward className='w-[1.5rem] h-[1.5rem] fill-white' />
                        }
                        href={url}
                        className='w-full pointer-events-auto cursor-pointer 400px:w-fit 400px:min-w-[10rem]'
                        variant='primary'
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

// Krever ingen påmelding, link = ''
//                   _
// Påmelding:          |
//
// Krever ingen
// påmelding
//                   _|

// Åpner tbd, link = 'tbd'
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
