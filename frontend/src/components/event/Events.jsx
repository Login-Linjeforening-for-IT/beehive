import { useState, useEffect } from "react";
import './Events.css';
import EventList from "./EventList";
import Spinner from "../spinner/Spinner";
import { config } from '../../Constants';

const Events = () => {
  const [eventsData, setEventData] = useState(null);
	const [categoryData, setCategoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


	useEffect(() => {
		fetch(config.url.API_URL + "/events")
			.then((response) => response.json())
			.then((data) => {setEventData(data)});
		fetch(config.url.API_URL + "/categories")
			.then((response) => response.json())
			.then((data) => {setCategoryData(data)});
		setIsLoading(false);
	}, []);

  return (
    <div className='Events'>
			{ isLoading && <Spinner w="3rem" h="3rem" /> }
			{ eventsData && categoryData && 
				<>
					<h1>Arrangementer</h1>
					{eventsData ? <EventList categories={categoryData} events={eventsData} name={"Arrangementer"} /> : <h3>Ingen kommende arrangementer</h3>}
				</>
			}
    </div>
  );
}

export default Events;
