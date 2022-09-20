import { useState, useEffect } from 'react';
import './EventListItem.css';
import DateSquare from './DateSquare'
import DefaultEventBanner from './defualtBanners/DefaultEventBanner';
import DefaultCtfBanner from './defualtBanners/DefaultCtfBanner';
import DefaultTekkomBanner from './defualtBanners/DefaultTekkomBanner';
import DefaultBedpresBanner from './defualtBanners/DefaultBedpresBanner';
import DefaultSocialBanner from './defualtBanners/DefaultSocialBanner';
import { config } from '../../Constants';


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
	};

	console.log(config.url.CDN_URL);

  return (
		<div className='EventListItem'>
      <DateSquare date={new Date(props.evt.startt)} color={color} />
      <div className='EventListItemInfo'>
        <div className='EventListItemInfoName'>{props.evt.eventname}</div>
        <div className='EventListItemInfoDetails'>
          <div>
            <i className='fa fa-clock-o'></i> {props.evt.startt.slice(11,16)}
          </div>
					{ (props.evt.roomno || props.evt.street) &&
            <div className='EventListItemInfoDetailsDivider' style={{color: color}}> | </div>
					}
          <div>
						{ (props.evt.roomno || props.evt.street) && <i className='fa fa-map-marker'></i>}
							{ props.evt.roomno && <>{props.evt.roomno}, {props.evt.campus}</>} 
							{ props.evt.street && <>{props.evt.street}, {props.evt.postcode} {props.evt.city}</>}
          </div>
        </div>
      </div>
      <div className='EventListItemImg'>
        {showImage ? (
          <picture>
            <img alt={props.evt.eventname} src={ config.url.CDN_URL + '/img/events/' +  props.evt.image} onError={hideImg} />
          </picture>
        ) : (
          getDefaultBanner(props.category.Name, color)
        )}
      </div>
		</div>
  )

}

export default EventListItem
