import { useState, useEffect } from 'react'
import EventList from './EventList'
import Spinner from '../../components/spinner/Spinner'
import {withTranslation} from 'react-i18next'
import { config } from '../../Constants'


const Events = ({t}) => {
	const [eventsData, setEventData] = useState(null)
	const [categoryData, setCategoryData] = useState(null)
	const [isLoading, setIsLoading] = useState(true)


	useEffect(() => {
		fetch(config.url.API_URL + '/events')
			.then((response) => response.json())
			.then((data) => {setEventData(data)})
		fetch(config.url.API_URL + '/categories')
			.then((response) => response.json())
			.then((data) => {setCategoryData(data)})
		setIsLoading(false);
	}, [])

  return (
    <div className='page-container'>
		{ isLoading && <Spinner w='3rem' h='3rem' /> }
		{ eventsData && categoryData && 
			<>
				<h1 className='heading-1 heading-1--top-left-corner'>{t('title')}</h1>
				{eventsData ? <EventList events={eventsData} categoryData={categoryData}/> : <h3>{t('no-events')}</h3>}
			</>
		}
    </div>
  )
}

export default withTranslation('eventListPage')(Events);
