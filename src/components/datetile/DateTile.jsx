import { withTranslation } from "react-i18next";
import './DateTile.css'


const DateTile = ({ i18n, startDate, endDate, color }) => {
    const sTime = new Date(startDate);
    const eTime = new Date(endDate);

    const sDate = sTime.getDate();
    const eDate = eTime.getDate();

    const sMonth = sTime.getMonth();
    const eMonth = eTime.getMonth();

    const lang = i18n.language === 'en' ? 'en' : 'no';

    const months = {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        no: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des']
    };

    if (sDate === eDate) {
        return (
            <div className='date-tile' style={{background: color}}>
                <div className='date-tile__date'>
                    <div className='date-tile__day'>{sDate}</div>
                    <div className='date-tile__month'>{months[lang][eMonth]}</div>
                </div>
            </div>
        );
    } else {
        return (
            <div className='date-tile' style={{background: color}}>
                <div className='date-tile__date'>
                    <div className='date-tile__day'>{sDate}</div>
                    <div className='date-tile__month'>{months[lang][sMonth]}</div>
                </div>
                <div className='date-tile__devider'>-</div>
                <div className='date-tile__date'>
                    <div className='date-tile__day'>{eDate}</div>
                    <div className='date-tile__month'>{months[lang][eMonth]}</div>
                </div>
            </div>
        );
    }
};

export default withTranslation()(DateTile);