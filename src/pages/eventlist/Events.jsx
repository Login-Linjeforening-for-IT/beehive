import { useState, useEffect } from 'react'
import EventList from './EventList'
import Spinner from '../../components/spinner/Spinner'
import {withTranslation} from 'react-i18next'
import { config } from '../../Constants'


const Events = ({t}) => {

	const [eventsData, setEventsData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await fetch(config.url.API_URL + "/api/events/");
				if (!response.ok) {
					throw new Error(
						`This is an HTTP error: The status is ${response.status}`
					);
				}
				let actualData = await response.json();
				setEventsData(actualData);
				setError(null);
			} catch (err) {
				setError(err.message);
				setEventsData(null);
			} finally {
				setLoading(false);
			}
		};
		getData();
	}, []);

  return (
    <div className='page-container'>
		{ loading && <Spinner w='3rem' h='3rem' /> }
		{ eventsData &&  
			<>
				<h1 className='heading-1 heading-1--top-left-corner'>{t('title')}</h1>
				{eventsData ? <EventList events={eventsData}/> : <h3>{t('no-events')}</h3>}
			</>
		}
    </div>
  )
}

export default withTranslation('eventListPage')(Events);
