import { useState, useEffect } from 'react'
import EventListItem from './EventListItem'
import Spinner from '../../components/spinner/Spinner'
import DropDownBox from '../../components/dropdownbox/DropDownBox'
import {withTranslation} from 'react-i18next'
import { config } from '../../Constants'
import { Link } from "react-router-dom";

import './Events.css';


import { debounce } from '../../utils/utils'; // change name to debounce or somthin
import { FilterGroup } from '../../components/filter/filter.jsx';
import { getEventCategoryFilters, getEvents } from '../../utils/api';

function prepFilter(data, id, label, idKey='id', labelKey='label', countKey='count', type='check') {
  const filters = {};

  for (let value of Object.values(data)) {
    filters[value[idKey]] = {
      id: value[idKey],
      label: value[labelKey],
      count: value[countKey],
    };
  }

  return {
    id: id,
    label: label,
    filters: filters,
    type: type
  };
}

async function getCategoryFilters(label) {
  const [ categoryFilterData, err ] = await getEventCategoryFilters();
  if (err) {
    console.error(err);
    return;
  }

  const title = {
    en: 'Skills',
    no: 'Ferdigheter'
  };

  return prepFilter(categoryFilterData, 'categories', 'Categories', 'id', label, 'count', 'check')
}


const Events = ({i18n, t}) => {

	const [ filterData, setFilterData ] = useState({});
	const [ events, setEvents ] = useState(null);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(null);

	const ap = debounce(async (v) => {
		console.log('apply', v);
		const [ eventsData, err ] = await getEvents(v.categories);
		if (err) {
			console.error(err);
			setEvents(err);
			return;
		}

		console.log('jobads', eventsData)

		setEvents(eventsData);
	}, 500);

	const lang = i18n.language === "en" ? "en" : "no";

	const catLabel = {
		en: 'name_en',
		no: 'name_no'
	}

	console.log(lang)

	useEffect(() => {
		(async () => {
			const d = {};
		
			const categoryFilters = await getCategoryFilters(catLabel[lang]);
			if (categoryFilters) d['categories'] = categoryFilters;

			setFilterData(d);
		
			const [ eventsData, err2 ] = await getEvents();
			if (err2) {
				console.error(err2);
				setEvents(err2);
				return;
			}
		
			setLoading(false);
			setEvents(eventsData);
		})();
	}, []);

  return (
    <div className='page-container'>
		<h1 className='heading-1 heading-1--top-left-corner'>{t('title')}</h1>
		{ loading && <Spinner w='3rem' h='3rem' /> }
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
			<ul className='events__section--right events__list'>
				{events && events.map((e) => (
					<li key={e.id}>
						<Link to={'/events/' + e.id}>
							<EventListItem event={e} />
						</Link>
					</li>
				))}
			</ul>
		</div>
    </div>
  )
}

export default withTranslation('eventListPage')(Events);
