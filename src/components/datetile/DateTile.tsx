'use client'

// import { getCookie } from '@utils/cookies'
import './DateTile.css'
import { createGradient, hexToRgba, isValidHex } from '@utils/ColorManipulation'
import { getCookie } from '@utils/cookies'
import { useEffect, useState } from 'react'
import { language } from '../langtoggle/LangToggle'

export default function DateTile({
    startDate,
    endDate,
    color,
    varient = 'regular',
    useDayText = false,
    // eslint-disable-next-line
}: any) {
    const [lang, setLang] = useState('no')
    const sTime = new Date(startDate)
    const eTime = new Date(endDate)
    const sDate = sTime.getDate()
    const eDate = eTime.getDate()
    const sMonth = sTime.getMonth()
    const eMonth = eTime.getMonth()

    useEffect(() => {
        const temp = getCookie('lang')
        setLang( temp || 'no')
    }, [language])
    const months = {
        en: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
        no: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'Mai',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Okt',
            'Nov',
            'Des',
        ],
    }

    const daysOfWeek = {
        en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        no: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'],
    }

    let background

    if (isValidHex(color)) {
        if (varient === 'regular') {
            background = createGradient(color, 1)
        } else {
            background = hexToRgba(color, 0.75)
        }
    } else {
        background = color
    }

    if (useDayText) {
        return (
            <div
                className={`date-tile date-tile--${varient} ${
                    sDate === eDate ? '' : 'date-tile--wide'
                }`}
                style={{ background: background }}
            >
                <div className='date-tile_date'>
                    <div className='date-tile_dayofweek'>
                        {/* eslint-disable-next-line */}
                        {(daysOfWeek as any)[lang][sTime.getDay()]}.
                    </div>
                </div>
            </div>
        )
    }
    if (sMonth === eMonth) {
        return (
            <div
                className={`date-tile date-tile--${varient} ${
                    sDate === eDate ? '' : 'date-tile--wide'
                }`}
                style={{ background: background }}
            >
                <div className='date-tile_date'>
                    <div
                        className={`date-tile_day ${
                            sDate === eDate ? '' : 'date-tile_day--wide'
                        }`}
                    >
                        {sDate === eDate ? sDate : sDate + '-' + eDate}
                    </div>
                    {/* eslint-disable-next-line */}
                    <div className='date-tile_month'>{(months as any)[lang][eMonth]}</div>
                </div>
            </div>
        )
    } else {
        return (
            <div
                className={`date-tile date-tile--wide date-tile--${varient}`}
                style={{ background: background }}
            >
                <div className='date-tile_date'>
                    <div className='date-tile_day date-tile_day--wide'>{sDate}</div>
                    <div className='date-tile_month date-tile_month--wide'>
                        {/* eslint-disable-next-line */}
                        {(months as any)[lang][sMonth]}
                    </div>
                </div>
                <div className='date-tile_devider'>-</div>
                <div className='date-tile_date'>
                    <div className='date-tile_day date-tile_day--wide'>{eDate}</div>
                    <div className='date-tile_month date-tile_month--wide'>
                        {/* eslint-disable-next-line */}
                        {(months as any)[lang][eMonth]}
                    </div>
                </div>
            </div>
        )
    }
}
