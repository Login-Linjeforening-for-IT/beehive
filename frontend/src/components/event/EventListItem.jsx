import { useState, useEffect } from "react";
import './EventListItem.css';
import DateSquare from './DateSquare'
import DefaultEventBanner from './DefaultEventBanner';
import DefaultCtfBanner from './DefaultCtfBanner';
import DefaultTekkomBanner from './DefaultTekkomBanner';
import DefaultBedpressBanner from './DefaultBedpressBanner';
import DefaultSocialBanner from './DefaultSocialBanner';


const getDefaultBanner = (category, color) => {
	switch(category) {
	  	case 'SOCIAL':
			return <DefaultSocialBanner color={color} />;
		case 'TEKKOM':
			return <DefaultTekkomBanner color={color} />;
		case 'CTF':
			return <DefaultCtfBanner color={color} />;
		case 'BEDPRES':
			return <DefaultBedpressBanner color={color} />;
	  default:
		  return <DefaultEventBanner color={color} />;
	}
}


/* Renders the Event card of the supplied json item*/
const EventListItem = (props) => {
  const id = props.evt.link;
	const color = "#" + props.category.Color

  const [showImage, setShowImage] = useState(true);
	const hideImg = (event) => {
		// this.setState({ showImg: false });
		setShowImage(false);
	};

  return (
		<div className="EventListItem">
      <DateSquare date={new Date(props.evt.startt)} color={color} />
      <div className="EventInfo">
        <h4>{props.evt.eventname}</h4>
        <div>
          <div>
            <i className="fa fa-clock-o"></i> {props.evt.startt.slice(11,16)}
          </div>
          <div className="Divider" style={{color: color}}> | </div>
          <div>
            <i className="fa fa-map-marker"></i> {props.evt.roomno ? <>{props.evt.roomno}, {props.evt.campus}</> : <>{props.evt.street}, {props.evt.postcode} {props.evt.city}</>}
          </div>
        </div>
      </div>
      <div className='EventImg'>
        {showImage ? (
          <picture>
            <img alt={props.evt.eventname} src={props.evt.image} onError={hideImg} />
          </picture>
        ) : (
          getDefaultBanner(props.category.Name, color)
        )}
      </div>
		</div>
  )

}

export default EventListItem
