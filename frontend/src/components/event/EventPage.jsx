import { useState, useEffect } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import DateSquare from './DateSquare';
import MazeMap from '../mazemap/map';
import DefaultEventBanner from './defualtBanners/DefaultEventBanner';
import DefaultCtfBanner from './defualtBanners/DefaultCtfBanner';
import DefaultTekkomBanner from './defualtBanners/DefaultTekkomBanner';
import DefaultBedpresBanner from './defualtBanners/DefaultBedpresBanner';
import DefaultSocialBanner from './defualtBanners/DefaultSocialBanner';
import { config } from '../../Constants';

import './EventPage.css'


const days = ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag']
const expresions = ['I dag', 'I morgen', 'I går', ' dager siden']

const getDiffDays = (date) => {
	const oneDay = 24 * 60 * 60 * 1000
	const nowDate = new Date()
	const d = new Date(date.getTime())

	// set h:m:s:m to 0 in order to compare only date without time
	d.setHours(0, 0, 0, 0)
	nowDate.setHours(0, 0, 0, 0)

	return Math.round(((d.getTime() - nowDate.getTime()) / oneDay))
}

const getDayStr = (date)  => {
	const diffDays = getDiffDays(date);

	if (diffDays === 0) {
		return expresions[0];
	} else if (diffDays === 1) {
		return expresions[1];
	} else if (diffDays === -1) {
		return expresions[2];
	} else if (diffDays <= -1) {
		return Math.abs(diffDays) + expresions[3];
	}

	return days[date.getDay()];
}

const isExt = (lnk) => {
	if (lnk.search('http') >= 0) {
		return true
	}
	return false
}

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

const EventPage = () => {

	let { id } = useParams();

	const [eventData, setEventData] = useState(null);
	const [statusCode, setStatusCode] = useState(null);
	const [eventIsLoading, setEventIsLoading] = useState(true);
	const [dateFix, setDateFix] = useState(false);
	const [category, setCategory] = useState(null);

	useEffect(() => {
		var category = ''
		fetch(config.url.API_URL + '/events/' + id)
			.then((response) => {setStatusCode(response.status); return response.json()})
			.then((data) => {data.startt = new Date(data.startt); data.endt = new Date(data.endt); category = data.category; setEventData(data)});
		fetch(config.url.API_URL + '/categories')
			.then((response) => response.json())
			.then((data) => setCategory(data))
		setEventIsLoading(false);
	}, []);

	// Correct the time so it makes sense in production... this should be fixed in a more proper manner at some point
	if (eventData && !dateFix) {
		eventData.startt.setHours(eventData.startt.getHours() - 2);
		eventData.endt.setHours(eventData.endt.getHours() - 2);
		setDateFix(true);
	}


	const [showImage, setShowImage] = useState(true);
	const hideImg = (event) => {
		// this.setState({ showImg: false });
		setShowImage(false);
	};
	
	return (
		<>
		{eventIsLoading && <Spinner w='3rem' h='3rem' />}
		{eventData && category &&
			<div className='EventPage'>
				<div className='EventDetails'>
					
					<div className='Date'>
						<DateSquare date={eventData.startt} color={'#' + category.find((c) => c.Name === eventData.category).Color} />
						<div className='DateExpresion'>{getDayStr(eventData.startt)}</div>
					</div>
					
					<div className='EventDetailsList'>
						<div className='EventDetailsList-lable'><i className='fa fa-clock-o'></i> Starter: </div>
						<div className='EventDetailsList-info'>{eventData.startt.toString().slice(16,21)}</div>
				
						<div className='EventDetailsList-lable'><i className='fa fa-clock-o'></i> Slutter: </div>
						<div className='EventDetailsList-info'>
							{(eventData.endt.getDate() === eventData.startt.getDate())
								? eventData.endt.toString().slice(16,21)
								: eventData.endt.toString().slice(4,11).trim() + ', ' + eventData.endt.toString().slice(16,21)
							}
						</div>

						{ (eventData.roomno || eventData.street) &&
							<>
							<div className='EventDetailsList-lable'><i className='fa fa-map-marker'></i>Lokasjon:</div>
							<div className='EventDetailsList-info'>
								{eventData.roomno
									? eventData.roomno + ', ' + eventData.campus
									: eventData.street + ', ' + eventData.postcode + ' ' + eventData.city
								}
							</div>
							</>
						}

						<div className='EventDetailsList-lable'><i className='fa fa-circle'></i>Type:</div>
						<div className='EventDetailsList-info'>
							
							{/* Adding category color to dot icon, using !important to overide text color. Super hacky but gets the job done apperantly */}
							<i className="fa fa-circle" ref={(node) => {
								if (node) {
									node.style.setProperty("color", '#' + category.find((c) => c.Name === eventData.category).Color, "important");
								}
							}}> </i> {eventData.category}
						</div>
				
						<div className='EventDetailsList-lable'><i className='fa fa-user'></i> Arrangør: </div>
						<div className='EventDetailsList-info'>
						{eventData.organizerlink === '' 
							? <>{eventData.organizer}</>
							: <>
								{isExt(eventData.organizerlink) 
									? <a href={eventData.organizerlink} target="_blank">{eventData.organizer}</a>
									: <Link to={eventData.organizerlink}>{eventData.organizer}</Link>}
							</>
						}
						</div>

						{(eventData.discorlink || eventData.fblink) &&
							<>
							<div className='EventDetailsList-lable'><i className='fa fa-link'></i>Lenker: </div>
							<div className='EventDetailsList-info'>
								{eventData.discordlink &&
									<a href={eventData.discordlink} target='_blank' rel='noreferrer'>
										<i className='logfont-discord'></i> Discord<br/>
									</a>
								}
								{eventData.fblink &&
									<a href={eventData.fblink} target='_blank' rel='noreferrer'>
										<i className='logfont-facebook'></i> Facebook 
									</a>
								}
							</div>
							</>
						}
						
					</div>
				</div>
				<div className='EventBanner'>
					<div>
						{showImage ? (
							<picture>
								<img alt={eventData.eventname} src={process.env.PUBLIC_URL + '/img/events/' + eventData.image} onError={hideImg} />
							</picture>
						) : (
							getDefaultBanner(eventData.category, '#' + category.find((c) => c.Name === eventData.category).Color)
						)}
					</div>
				</div>
				<div className='EventDescription'>
					<h2>{eventData.eventname}</h2>
					<div dangerouslySetInnerHTML={{__html: eventData.description}}/>
				</div>
				<div className='Map'>
					<MazeMap eventID={eventData.eventID} mazeref={eventData.mazeref} />
				</div>
			</div>
		}
		{statusCode === 204 && <Navigate to='/404' />}
		{statusCode === 500 && <Navigate to='/404' />}
		</>
	)
}

export default EventPage;
