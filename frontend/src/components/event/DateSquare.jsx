import './DateSquare.css'
/* Array of the string representation of the months */
const months = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des']


/* Translates a numeric date to the string representation of the same month */
const getMonth = (date) => {
  let numeric = parseInt(date.slice(5, 7)) - 1;
  return months[numeric];
}

const DateSquare = ({ date, color }) => {

    return (
        <div className="DateSquare" style={{backgroundColor: color}}>
            <time dateTime={date}>
                <span className="DateDay">{date.getDate()}</span>
                <span className="DateMonth">{months[ date.getMonth() ]}</span>
            </time>
        </div>
    )
}

export default DateSquare
