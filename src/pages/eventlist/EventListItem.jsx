import { useState, useEffect } from 'react';
import DateTile from '../../components/datetile/DateTile'
import DefaultEventBanner from '../../components/svg/defaultbanners/DefaultEventBanner';
import DefaultCtfBanner from '../../components/svg/defaultbanners/DefaultCtfBanner';
import DefaultTekkomBanner from '../../components/svg/defaultbanners/DefaultTekkomBanner';
import DefaultBedpresBanner from '../../components/svg/defaultbanners/DefaultBedpresBanner';
import DefaultSocialBanner from '../../components/svg/defaultbanners/DefaultSocialBanner';
import { config } from '../../Constants';
import * as TimeFormatter from '../../utils/DatetimeFormatter'
import * as ImageLinker from '../../utils/ImageLinker'

import './EventListItem.css';

const getDefaultBanner = (category, color) => {
	switch(category) {
	  	case 'SOCIAL':
			return <DefaultSocialBanner color={color} />;
		case 'TEKKOM':
			return <DefaultTekkomBanner color={color} />;
		case 'CTF':
			return <DefaultCtfBanner color={color} />;
		case 'BEDPRES':
			return <DefaultBedpresBanner color={color} />;
	  default:
		  return <DefaultEventBanner color={color} />;
	}
}

/* Renders the Event card of the supplied json item*/
const EventListItem = (props) => {
  const id = props.evt.link;
	const color = '#' + props.category.Color

  const [showImage, setShowImage] = useState(true);
	const hideImg = (event) => {
		// this.setState({ showImg: false });
		setShowImage(false);
	}

  return (
		<div className='events-item'>
      <DateTile dayNumber={TimeFormatter.getDayInt(props.evt.startt)} monthIdx={TimeFormatter.getMonthInt(props.evt.startt)-1} color={color} />
      <div className='events-item__middle'>
        <div className='events-item__name'>{props.evt.eventname}</div>
        <ul className='events-item__details'>
          <li className='events-item__detail'>
            <i className='events-item__icon material-symbols-sharp'>schedule</i>{TimeFormatter.getTimeHHmm(props.evt.startt)}
          </li>
          
          { (props.evt.roomno || props.evt.street) &&
            <li className='events-item__detail'>
              <i className='events-item__icon material-symbols-sharp'>location_on</i>
              {/* Only rendering postcode and city if it's not in gjøvik to save some space
               and because if it's not specified it's obviuosly in gjøvik */}
              { props.evt.roomno && <>{props.evt.roomno}{ props.evt.campus =! 'GJØVIK' && <>, {props.evt.campus}</>}</>}
              { props.evt.street && <>{props.evt.street}{ props.evt.postcode =! 2815 && <>, {props.evt.postcode} {props.evt.city}</> }</>}
            </li>
          }
        </ul>
      </div>
      <picture className='events-item__picture'>
        {showImage ? (
          <img className='events-item__img' alt={props.evt.eventname}  src={ImageLinker.getCDNLink(props.evt.image)} onError={hideImg} />
        ) : (
          getDefaultBanner(props.category.Name, color)
        )}
      </picture>
		</div>
  )
}

export default EventListItem
