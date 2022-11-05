
import { useState, useEffect } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';

import Spinner from '../../components/spinner/Spinner';
import DateTile from '../../components/datetile/DateTile';
import MazeMap from '../../components/mazemap/map';
import DefaultEventBanner from '../../assets/svg/defualtBanners/DefaultEventBanner';
import DefaultCtfBanner from '../../assets/svg/defualtBanners/DefaultCtfBanner';
import DefaultTekkomBanner from '../../assets/svg/defualtBanners/DefaultTekkomBanner';
import DefaultBedpresBanner from '../../assets/svg/defualtBanners/DefaultBedpresBanner';
import DefaultSocialBanner from '../../assets/svg/defualtBanners/DefaultSocialBanner';
import { config } from '../../Constants';
import {withTranslation} from "react-i18next";
import * as DatetimeFormatter from '../../utils/DatetimeFormatter'
import * as ImageLinker from '../../utils/ImageLinker'

import './EventPage.css'
import './event-description.css'


const daysNO = ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag']
const daysEN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const expressionsNO = ['I dag', 'I morgen', 'I går', ' dager siden']
const expressionsEN = ['Today', 'Tomorrow', 'Yesterday', ' days ago']

const getDayStr = (datetime,i18n)  => {
	const diffDays = DatetimeFormatter.getOffsetDays(datetime);

	if (diffDays === 0) {
		return i18n.language === 'en' ? expressionsEN[0] : expressionsNO[0];
	} else if (diffDays === 1) {
		return i18n.language === 'en' ? expressionsEN[1] : expressionsNO[1];
	} else if (diffDays === -1) {
		return i18n.language === 'en' ? expressionsEN[2] : expressionsNO[2];
	} else if (diffDays <= -1) {
		return i18n.language === 'en' ? Math.abs(diffDays) + expressionsEN[3] : Math.abs(diffDays) + expressionsNO[3];
	}

	const dayIdx = parseInt(DatetimeFormatter.getDayIdxInt(datetime));
	return i18n.language === 'en' ? daysEN[dayIdx] : daysNO[dayIdx];
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

const EventPage = ({t,i18n}) => {

	let { id } = useParams();

	const [eventData, setEventData] = useState(null);
	const [statusCode, setStatusCode] = useState(null);
	const [eventIsLoading, setEventIsLoading] = useState(true);
	const [category, setCategory] = useState(null);

	useEffect(() => {
		var category = ''
		fetch(config.url.API_URL + '/events/' + id)
			.then((response) => {
				setStatusCode(response.status)
				return response.json()})
			.then((data) => {
				category = data.category
				setEventData(data)})
		fetch(config.url.API_URL + '/categories')
			.then((response) => response.json())
			.then((data) => setCategory(data))
		setEventIsLoading(false)
	}, []);

	const [showImage, setShowImage] = useState(true)
	const hideImg = (event) => {
		// this.setState({ showImg: false });
		setShowImage(false)
	}
	
	return (
		<>
			{eventIsLoading && <Spinner w='3rem' h='3rem' />}
			{eventData && category &&
				<div className='event-page page-container'>
					<div className='event-details'>
						<div className='event-details__date'>
							<DateTile dayNumber={DatetimeFormatter.getDayInt(eventData.startt)} monthIdx={DatetimeFormatter.getMonthInt(eventData.startt)-1} color={'#' + category.find((c) => c.Name === eventData.category).Color} />
							<div className='event-details__date-expression'>{getDayStr(eventData.startt, i18n)}</div>
						</div>

						<div className='event-details__list'>
							<div className='event-details__lable'><i className='event-details__icon event-details__icon--lable-color fa fa-clock-o'></i> {t('info.start')}: </div>
							<div className='event-details__info'>{DatetimeFormatter.getTimeHHmm(eventData.startt)}</div>

							{DatetimeFormatter.showEndTime(eventData.endt) && <><div className='event-details__lable'><i className='event-details__icon event-details__icon--lable-color fa fa-clock-o'></i> {t('info.end')}: </div>
							<div className='event-details__info'>
								{DatetimeFormatter.getTimeHHmm(eventData.endt)}
							</div></>}

							{ (eventData.roomno || eventData.street) &&
								<>
									<div className='event-details__lable'><i className='event-details__icon event-details__icon--lable-color fa fa-map-marker'></i>{t('info.location')}:</div>
									<div className='event-details__info'>
										{eventData.roomno
											? eventData.roomno + ', ' + eventData.campus
											: eventData.street + ', ' + eventData.postcode + ' ' + eventData.city
										}
									</div>
								</>
							}

							<div className='event-details__lable'><i className='event-details__icon event-details__icon--lable-color fa fa-circle'></i>{t('info.type')}:</div>
							<div className='event-details__info'>

								{/* Adding category color to dot icon, using !important to overide text color. Super hacky but gets the job done apperantly */}
								<i className='event-details__icon fa fa-circle' ref={(node) => {
									if (node) {
										node.style.setProperty('color', '#' + category.find((c) => c.Name === eventData.category).Color, 'important');
									}
								}}></i>{eventData.category}
							</div>

							<div className='event-details__lable'><i className='event-details__icon event-details__icon--lable-color fa fa-user'></i> {t('info.organizer')}: </div>
							<div className='event-details__info'>
								{eventData.organizerlink === ''
									? <>{eventData.organizer}</>
									: <>
										{isExt(eventData.organizerlink)
											? <a href={eventData.organizerlink} target='_blank'>{eventData.organizer}</a>
											: <Link className='standard-link standard-link--underscore-hover' to={eventData.organizerlink}>{eventData.organizer}</Link>}
									</>
								}
							</div>

							{(eventData.discorlink || eventData.fblink) &&
								<>
									<div className='event-details__lable'><i className='event-details__icon event-details__icon--lable-color fa fa-link'></i>{t('info.links')}: </div>
									<div className='event-details__info'>
										{eventData.discordlink &&
											<>
												<a className='standard-link standard-link--underscore-hover' href={eventData.discordlink} target='_blank' rel='noreferrer'>
													<i className='event-details__icon logfont-discord'></i>Discord
												</a>
												<br/>
											</>
										}
										{eventData.fblink &&
											<a className='standard-link standard-link--underscore-hover' href={eventData.fblink} target='_blank' rel='noreferrer'>
												<i className='event-details__icon logfont-facebook'></i>Facebook
											</a>
										}
									</div>
								</>
							}

						</div>
					</div>
					<div className='event-banner'>
						{showImage ? (
							<picture>
								<img alt={eventData.eventname} src={ImageLinker.getCDNLink(eventData.image)} onError={hideImg} />
							</picture>
						) : (
							getDefaultBanner(eventData.category, '#' + category.find((c) => c.Name === eventData.category).Color)
						)}
					</div>
					<div className='event-description'>
						<h2>{eventData.eventname}</h2>
						<div dangerouslySetInnerHTML={{__html: eventData.description}}/>
					</div>
					<div className='event-map'>
						<MazeMap eventID={eventData.eventID} mazeref={eventData.mazeref} language={i18n.language} />
					</div>
				</div>
			}
			{statusCode === 204 && <Navigate to='/404' />}
			{statusCode === 500 && <Navigate to='/404' />}
		</>
	)
}

export default withTranslation('eventPage')(EventPage)
