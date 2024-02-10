import { useState, useEffect, useRef } from 'react'
import EventListItem from '../../components/event/EventListItem.jsx'
import Spinner from '../../components/spinner/Spinner'
import DropDownBox from '../../components/dropdownbox/DropDownBox'
import { withTranslation } from 'react-i18next'

import './Events.css';

import { debounce } from '../../utils/debounce.js';
import FilterGroup from '../../components/filter/filter';
import prepFilter from "../../components/filter/prepFilter.js"
import { getEventCategoryFilters, getEvents } from '../../utils/api';


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

const Events = ({i18n, t}) => {

	const [ events, setEvents ] = useState([]);
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

  	}, 50);


	const loadItems = async () => {

		try {
			const [ response, err ] = await getEvents(filters.current.categories, limit, offset.current);
			if (err) {
				console.error(err);
				setEvents(err);
				return;
			}

			setShowLoadMore(response.length === limit)

			offset.current = events.length + response.length;
			setEvents((prevItems) => [...prevItems, ...response]);
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
				<ul className='events__list'>
					{events.length ? events.map((e, idx) => (
						<li key={idx}>
							<EventListItem key={e.id} event={e} highlight={e.highlight} />
						</li>
					)) :
						<p>Ingen matcher...</p>
					}
				</ul>
				{showLoadMore && 
					<a className='jobads__load-more-btn standard-button standard-button--primary' onClick={loadItems}>{t('load-more')}</a>
				}
			</div>
		</div>
    </div>
  )
}

export default withTranslation('eventListPage')(Events);
