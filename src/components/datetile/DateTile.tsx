{/* @ts-ignore */}
import { withTranslation } from "react-i18next"
import * as ColorManipulation from "../../utils/ColorManipulation.ts"

import "./DateTile.css"

function DateTile({
    i18n,
    startDate,
    endDate,
    color,
    varient = "regular",
    useDayText = false,
}: any) {

    const sTime = new Date(startDate)
    const eTime = new Date(endDate)

    const sDate = sTime.getDate()
    const eDate = eTime.getDate()

    const sMonth = sTime.getMonth()
    const eMonth = eTime.getMonth()

    const lang = i18n.language === "en" ? "en" : "no"

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

    if (ColorManipulation.isValidHex(color)) {
        if (varient === "regular") {
            background = ColorManipulation.createGradient(color, 1)
        } else {
            background = ColorManipulation.hexToRgba(color, 0.75)
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
                        {daysOfWeek[lang][sTime.getDay()]}.
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
                    <div className="date-tile__month">{months[lang][eMonth]}</div>
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
                        {months[lang][sMonth]}
                    </div>
                </div>
                <div className="date-tile__devider">-</div>
                <div className="date-tile__date">
                    <div className="date-tile__day date-tile__day--wide">{eDate}</div>
                    <div className="date-tile__month date-tile__month--wide">
                        {months[lang][eMonth]}
                    </div>
                </div>
            </div>
        )
    }
};

export default withTranslation()(DateTile)
