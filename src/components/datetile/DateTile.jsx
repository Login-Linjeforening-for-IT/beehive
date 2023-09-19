import * as TimeFormatter from "../../utils/DatetimeFormatter";
import './DateTile.css'

const months = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    no: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des']
};

const DateTile = ({ language, date, color}) => {

    return (
        <div className='date-tile' style={{background: '#' + color}}>
            <span className='date-tile__day'>{TimeFormatter.getDayInt(date)}</span>
            <span className='date-tile__month'>{months[language][TimeFormatter.getMonthInt(date)]}</span>
        </div>
    )
}

export default DateTile
