import {withTranslation} from "react-i18next";
import './DateTile.css'

/* Array of the string representation of the months */
const monthsNO = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des']
const monthsEN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des']



const DateTile = ({ i18n, dayNumber, monthIdx, color }) => {
    return (
        <div className='date-tile' style={{backgroundColor: color}}>
            <span className='date-tile__day'>{dayNumber}</span>
            <span className='date-tile__month'>{i18n.language === 'en' ? monthsEN[monthIdx] : monthsNO[monthIdx]}</span>
        </div>
    )
}

export default withTranslation('eventPage')(DateTile)
