import { useState, useEffect } from "react";
import { Navigate, useParams, Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import DateSquare from './DateSquare';
import MazeMap from '../mazemap/map';
import DefaultEventBanner from './DefaultEventBanner';
import DefaultCtfBanner from './DefaultCtfBanner';
import DefaultTekkomBanner from './DefaultTekkomBanner';
import DefaultBedpressBanner from './DefaultBedpressBanner';
import DefaultSocialBanner from './DefaultSocialBanner';

import './EventPage.css'


const days = ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag']
const expresions = ['I dag', 'I morgen', 'I går', ' dager siden']

const getDiffDays = (date) => {
	const oneDay = 24 * 60 * 60 * 1000;
	const nowDate = new Date();
	
	return Math.round(((date.getTime() - nowDate.getTime()) / oneDay));
}

const getDayStr = (date)  => {
	const diffDays = getDiffDays(date);

	if (diffDays == 0) {
		return expresions[0];
	} else if (diffDays == 1) {
		return expresions[1];
	} else if (diffDays == -1) {
		return expresions[2];
	} else if (diffDays <= -1) {
		return Math.abs(diffDays) + expresions[3];
	}

	return days[date.getDay()];
}

const isExt = (lnk) => {
	if (lnk.search("http") >= 0) {
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
			return <DefaultBedpressBanner color={color} />;
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
		var category = ""
		fetch("https://api.login.no/events/" + id)
			.then((response) => {setStatusCode(response.status); return response.json()})
			.then((data) => {data.startt = new Date(data.startt); data.endt = new Date(data.endt); category = data.category; setEventData(data)});
		fetch("https://api.login.no/categories")
			.then((response) => response.json())
			.then((data) => setCategory(data))
		setEventIsLoading(false);
	}, []);

	if (eventData && !dateFix) {
		eventData.startt.setHours(eventData.startt.getHours() - 1);
		eventData.endt.setHours(eventData.endt.getHours() - 1);
		setDateFix(true);
	}


	const [showImage, setShowImage] = useState(true);
	const hideImg = (event) => {
		// this.setState({ showImg: false });
		setShowImage(false);
	};
	  

	return (
		<>
		{eventIsLoading && <Spinner w="3rem" h="3rem" />}
		{eventData && category &&
			<div className='EventPage'>
				<div className="EventDetails">
					<p className="EventCategory">{eventData.category}</p>
					<div className='Date'>
						<DateSquare date={eventData.startt} color={"#" + category.find((c) => c.Name === eventData.category).Color} />
						<div className='Day'>{getDayStr(eventData.startt)}</div>
					</div>
					<div>
						<div>Starter: </div>
						<div>{eventData.startt.toString().slice(16,21)}</div>
					</div>
					<div>
						<div>Slutter: </div>
						<div>
							{(eventData.endt.getDate() == eventData.startt.getDate())
								? eventData.endt.toString().slice(16,21)
								: eventData.endt.toString().slice(4,11).trim() + ", " + eventData.endt.toString().slice(16,21)
							}
						</div>
					</div>
					<div>
						<div>Arrangør: </div>
						<div>
							{isExt(eventData.organizerlink)
								? <a href={eventData.organizerlink}>{eventData.organizer}</a>
								: <Link to={eventData.organizerlink}>{eventData.organizer}</Link>
							}
						</div>
					</div>
					<div>
						<div>Lokasjon:</div>
						<div>
							{eventData.roomno
								? eventData.roomno + ", " + eventData.campus
								: eventData.street + ", " + eventData.postcode + " " + eventData.city
							}
						</div>
					</div>
					<div>
						{(eventData.discorlink || eventData.fblink) &&
							<div>Lenker: </div>
						}
							<div>
								{eventData.discordlink &&
									<a className="SocialIcon" href={eventData.discordlink} target="_blank" rel="noreferrer">
										<picture>
											<source srcSet={process.env.PUBLIC_URL + '/icons/Discord_logo.svg'} />
											<img alt="Discord's logo" />
										</picture>
									</a>
								}
								{eventData.fblink &&
									<a className="SocialIcon" href={eventData.fblink} target="_blank" rel="noreferrer">
										<picture>
											<source srcSet={process.env.PUBLIC_URL + '/icons/Facebook_logo.svg'} />
											<img alt="Facebook's logo" />
										</picture>
									</a>
								}
							</div>
					</div>
				</div>
				<div className='EventBanner'>
					{/*TODO: Add proper response in api for no image.*/}
					{/*eventData.image != 'none' &&
						<picture>
							<source srcSet={eventData.image} />
							<img alt={eventData.eventname} />
						</picture>
					}
					{eventData.image == 'none' &&
						<DefaultEventBanner color={"#" + category.find((c) => c.Name === eventData.category).Color}/>
					*/}
					<div>
						{showImage ? (
							<picture>
								<img alt={eventData.eventname} src={eventData.image} onError={hideImg} />
							</picture>
						) : (
							getDefaultBanner(eventData.category, "#" + category.find((c) => c.Name === eventData.category).Color)
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
		{statusCode == 204 && <Navigate to="/404" />}
		{statusCode == 500 && <Navigate to="/404" />}
		</>
	)
}

export default EventPage;
