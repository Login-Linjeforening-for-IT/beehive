import { useState, useEffect, useRef } from 'react'
import { withTranslation } from 'react-i18next'
import EventListItem from '../../components/event/EventListItem.jsx'
import Spinner from '../../components/spinner/Spinner'
import DropDownBox from '../../components/dropdownbox/DropDownBox'
import FilterGroup from '../../components/filter/filter';
import prepFilter from "../../components/filter/prepFilter.js"
import { getEventCategoryFilters, getEvents } from '../../utils/api';
import { debounce } from '../../utils/debounce.js';
import './Events.css';


const getLabelKeyWithLang = (key) => {
	return (v) => {
		const vNo = v[key + '_no'];
		const vEn = v[key + '_en'] || vNo;

		return {
			no: vNo,
			en: vEn,
		}
	}
}

async function getCategoryFilters() {
  const [ categoryFilterData, err ] = await getEventCategoryFilters();
  if (err) {
    console.error(err);
    return;
  }

  const title = {
    en: 'Categories',
    no: 'Kategorier'
  };

  return prepFilter(categoryFilterData, 'categories', title, 'id', getLabelKeyWithLang('name'), 'count', 'check', true)
}


function groupEvents(eventsArray) {
	// Get the current date
	const currentDate = new Date();
  
	// Calculate the start of the current week (Sunday)
	const startOfWeek = new Date(currentDate);
	startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  
	// Calculate the start of the next week
	const startOfNextWeek = new Date(startOfWeek);
	startOfNextWeek.setDate(startOfWeek.getDate() + 7);

	// Calculate the start of the week after next week
	const startOfWeekAfterNextWeek = new Date(startOfWeek);
	startOfWeekAfterNextWeek.setDate(startOfWeek.getDate() + 14);
  
	// group the dates
	const currentWeekEvents = [];
	const nextWeekEvents = [];
	const futureEvents = [];
  
	eventsArray.forEach(event => {
		const eventDate = new Date(event.time_start);

		if (eventDate >= startOfWeek && eventDate < startOfNextWeek) {
			currentWeekEvents.push(event);
		} else if (eventDate >= startOfNextWeek && eventDate < startOfWeekAfterNextWeek) {
			nextWeekEvents.push(event);
		} else {
			futureEvents.push(event);
	  	}
	});
  
	return {
		currentWeekEvents,
		nextWeekEvents,
		futureEvents
	};
  }

const Events = ({t}) => {

	const [ events, setEvents ] = useState([]);
	const [ groupedEvents, setGroupedEvents ] = useState({
		currentWeekEvents: [],
		nextWeekEvents: [],
		futureEvents: [],
	});
	const [ filterData, setFilterData ] = useState({});
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(null);
	const filters = useRef({});
	const limit = 20;
	const offset = useRef(0);
	const [ showLoadMore, setShowLoadMore ] = useState(false);

	const ap = debounce(async (v) => {
		filters.current = v;

		const [ response, err ] = await getEvents(v.categories, limit, 0);
		if (err) {
			console.error(err);
			setEvents(err);
			return;
		}

		setShowLoadMore(response.length === limit)
		offset.current = limit;
		setEvents(response);
		setGroupedEvents(groupEvents(response));

  	}, 50);

	const loadItems = async () => {
		try {
			const [response, err] = await getEvents(filters.current.categories, limit, offset.current);
			if (err) {
				console.error(err);
				setEvents(err);
				return;
			}
		
			offset.current = events.length + response.length;
			setEvents((prevItems) => [...prevItems, ...response]);

			// Categorize response
			const categorizedResponse = groupEvents(response);

			// Set groupedEvents
			setGroupedEvents((prevOrder) => ({
				currentWeekEvents: [...prevOrder.currentWeekEvents, ...categorizedResponse.currentWeekEvents],
				nextWeekEvents: [...prevOrder.nextWeekEvents, ...categorizedResponse.nextWeekEvents],
				futureEvents: [...prevOrder.futureEvents, ...categorizedResponse.futureEvents]
			}));

			setShowLoadMore(response.length === limit);
			setLoading(false);

		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		(async () => {
			const d = {};
			const categoryFilters = await getCategoryFilters();
			if (categoryFilters) d['categories'] = categoryFilters;

			setFilterData(d);
		})()

		loadItems();
	}, []);

	return (
		<div className='page-container'>
			<h1 className='heading-1 heading-1--top-left-corner'>{t('title')}</h1>
			{ loading && <Spinner w='50' h='50' /> }
			<div className="events">
				<div className="events__section--left">
					<DropDownBox 
						title={<><i className='material-symbols-sharp'>filter_alt</i> Filter</>} 
						content={ 
							<div className='events__filter-container'>
								{filterData ? <FilterGroup filters={filterData} onApply={ap}/> : "no filter data"}
							</div>
						}
					/>
				</div>
				<div className='events__section--right'>
					{!loading &&
						<ul className='events__list'>
							{groupedEvents.currentWeekEvents && groupedEvents.currentWeekEvents.length > 0 && (
								<>
									<div className="event-list-separator">
										<p className="event-list-separator__text">{t('this-week')}</p>
									</div>
									{groupedEvents.currentWeekEvents.map((e, idx) => (
										<li key={idx}>
											<EventListItem key={e.id} event={e} highlight={e.highlight} />
										</li>
									))}
								</>
							)}
						
							{groupedEvents.nextWeekEvents && groupedEvents.nextWeekEvents.length > 0 && (
								<>
									<div className="event-list-separator">
										<p className="event-list-separator__text">{t('next-week')}</p>
									</div>
									{groupedEvents.nextWeekEvents.map((e, idx) => (
										<li key={idx}>
											<EventListItem key={e.id} event={e} highlight={e.highlight} />
										</li>
									))}
								</>
							)}
						
							{groupedEvents.futureEvents && groupedEvents.futureEvents.length > 0 && (
								<>
									{(groupedEvents.nextWeekEvents.length + groupedEvents.nextWeekEvents.length) > 0 && 
										<div className="event-list-separator">
											<p className="event-list-separator__text">{t('later')}</p>
										</div>
									}
									{groupedEvents.futureEvents.map((e, idx) => (
										<li key={idx}>
											<EventListItem key={e.id} event={e} highlight={e.highlight} />
										</li>
									))}
								</>
							)}
						</ul>
					}
					{!loading && showLoadMore && events.length > 0 &&
						<a className='jobads__load-more-btn standard-button standard-button--primary' onClick={loadItems}>{t('load-more')}</a>
					}
				</div>
			</div>
		</div>
	)
}

export default withTranslation('eventListPage')(Events);
