import './EventContainer.css';

/* Array of the string representation of the months */
const months = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des']


/* Translates a numeric date to the string representation of the same month */
const getMonth = (date) => {
    let numeric = parseInt(date.slice(8,10)) - 1;
    return months[numeric];
}

/* Renders the Event card of the supplied json item*/
const EventContainer = (props) => {  
  return (
    <div className="EventContainer">
      <div className="EventImg">
        <img src="https://th-thumbnailer.cdn-si-edu.com/bZAar59Bdm95b057iESytYmmAjI=/1400x1050/filters:focal(594x274:595x275)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/95/db/95db799b-fddf-4fde-91f3-77024442b92d/egypt_kitty_social.jpg" alt="Event illustration"/>
      </div>
      <div className="EventDate">
      <time dateTime={props.data.eventDate + ' ' + props.data.eventTime}>
        <p className="EventDateDay">{props.data.eventDate.slice(5,7)}</p>
        <p className="EventDateMonth">{getMonth(props.data.eventDate)}</p>
      </time>
      </div>
      <div className="EventInfo">
        <h4>{props.data.eventName}</h4>
        <div className="EventInfoSub">
          <p><time>{props.data.eventTime.slice(0,5)}</time></p>
          <div className="EventInfoSpacer" />
          <p>{props.data.eventLocation}</p>
        </div>
      </div>
    </div>
  )
}

export default EventContainer;
