import { useState, useEffect, useRef } from 'react'
import { withTranslation } from 'react-i18next'
import EventListItem from '../../components/event/EventItem.jsx'
import Spinner from '../../components/spinner/Spinner'
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

	// Calculate the start of the current week (Monday)
	const startOfWeek = new Date(currentDate);
	startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

	startOfWeek.setHours(0);
	startOfWeek.setMinutes(0);
	startOfWeek.setSeconds(0);

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

const Events = ({ t }) => {
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
	const [ eventsView, setEventsView ] = useState('list-view');
	const [ isFilterOpen, setIsFilterOpen ] = useState(false);

    const toggleFilter = () => {
        setIsFilterOpen(prevState => !prevState);
    };

    useEffect(() => {
        localStorage.setItem('events-view', eventsView);
    }, [eventsView]);

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
			<div className='page-section--normal'>
				<h1 className='heading-1 heading-1--top-left-corner'>{t('title')}</h1>
			</div>
			{ loading && <Spinner w='50' h='50' /> }
			{ !loading &&
				<>
				<div className='events-top-bar page-section--normal'>
					<button
						className={`events-top-bar__button events-top-bar__filter-toggle ${isFilterOpen ? 'events-top-bar__filter-toggle--active' : ''}`}
						onClick={() => toggleFilter()}
					>
						Filter
						<i className='material-symbols-sharp events-top-bar__icon'>
							filter_list
						</i>
					</button>
					<div className='button-group events-top-bar__view-toggle'>
						<button
							className={`button-group__button ${eventsView === 'grid-view' ? 'button-group__button--active' : ''}`}
							onClick={() => setEventsView('grid-view')}
						>
							<i className='material-symbols-sharp events-top-bar__icon'>
								grid_view
							</i>
						</button>
						<button
							className={`button-group__button ${eventsView === 'list-view' ? 'button-group__button--active' : ''}`}
							onClick={() => setEventsView('list-view')}
						>
							<i className='material-symbols-sharp events-top-bar__icon'>
								format_list_bulleted
							</i>
						</button>
					</div>
				</div>
				<div className="page-section--without-gaps">
					<div className="events">
						<div className="events__section--left">
							<div className={`events__filter-container ${isFilterOpen ? 'events__filter-container--open' : ''}`}>
								{filterData ? <FilterGroup filters={filterData} onApply={ap}/> : "no filter data"}
							</div>
						</div>
						<div className='events__section--right'>
								<ul className={`events__list events__list${eventsView === 'grid-view' ? "--grid-view" : "--list-view"}`}>
									{groupedEvents.currentWeekEvents && groupedEvents.currentWeekEvents.length > 0 && (
										<>
											<div className="event-list-separator event-list-seperator--first">
												<p className="event-list-separator__text">{t('this-week')}</p>
											</div>
											{groupedEvents.currentWeekEvents.map((e, idx) => (
												<li key={idx}>
													<EventListItem key={e.id} event={e} highlight={e.highlight} variant={eventsView === 'grid-view' ? 'card' : 'list-item'} />
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
													<EventListItem key={e.id} event={e} highlight={e.highlight}  variant={eventsView === 'grid-view' ? 'card' : 'list-item'} />
												</li>
											))}
										</>
									)}
								
									{groupedEvents.futureEvents && groupedEvents.futureEvents.length > 0 && (
										<>
											{(groupedEvents.currentWeekEvents.length + groupedEvents.nextWeekEvents.length) > 0 && 
												<div className="event-list-separator">
													<p className="event-list-separator__text">{t('later')}</p>
												</div>
											}
											{groupedEvents.futureEvents.map((e, idx) => (
												<li key={idx}>
													<EventListItem key={e.id} event={e} highlight={e.highlight}  variant={eventsView === 'grid-view' ? 'card' : 'list-item'} />
												</li>
											))}
										</>
									)}
								</ul>
							
							{!loading && showLoadMore && events.length > 0 &&
								<button className='jobads__load-more-btn standard-button standard-button--primary' onClick={loadItems}>{t('load-more')}</button>
							}
						</div>
					</div>
				</div>
				</>
			}
		</div>
	)
}

export default withTranslation('eventListPage')(Events);
