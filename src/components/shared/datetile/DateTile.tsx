'use client'

import "./DateTile.css"
import { createGradient, hexToRgba, isValidHex } from "@utils/ColorManipulation"
import AppContext from "@context/context"
import { useContext } from "react"

export default function DateTile({
    startDate,
    endDate,
    color,
    varient = "regular",
    useDayText = false,
}: any) {
    const { lang } = useContext(AppContext)
    const sTime = new Date(startDate)
    const eTime = new Date(endDate)
    const sDate = sTime.getDate()
    const eDate = eTime.getDate()
    const sMonth = sTime.getMonth()
    const eMonth = eTime.getMonth()

    const months = {
        en: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        no: [
            "jan",
            "feb",
            "mar",
            "apr",
            "mai",
            "jun",
            "jul",
            "aug",
            "sep",
            "okt",
            "nov",
            "des",
        ],
    }

    const daysOfWeek = {
        en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        no: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
    }

    let background

    if (isValidHex(color)) {
        if (varient === "regular") {
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
                    sDate === eDate ? "" : "date-tile--wide"
                }`}
                style={{ background: background }}
            >
                <div className="date-tile__date">
                    <div className="date-tile__dayofweek">
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
                    sDate === eDate ? "" : "date-tile--wide"
                }`}
                style={{ background: background }}
            >
                <div className="date-tile__date">
                    <div
                        className={`date-tile__day ${
                            sDate === eDate ? "" : "date-tile__day--wide"
                        }`}
                    >
                        {sDate === eDate ? sDate : sDate + "-" + eDate}
                    </div>
                    <div className="date-tile__month">{(months as any)[lang][eMonth]}</div>
                </div>
            </div>
        )
    } else {
        return (
            <div
                className={`date-tile date-tile--wide date-tile--${varient}`}
                style={{ background: background }}
            >
                <div className="date-tile__date">
                    <div className="date-tile__day date-tile__day--wide">{sDate}</div>
                    <div className="date-tile__month date-tile__month--wide">
                        {(months as any)[lang][sMonth]}
                    </div>
                </div>
                <div className="date-tile__devider">-</div>
                <div className="date-tile__date">
                    <div className="date-tile__day date-tile__day--wide">{eDate}</div>
                    <div className="date-tile__month date-tile__month--wide">
                        {(months as any)[lang][eMonth]}
                    </div>
                </div>
            </div>
        )
    }
}
