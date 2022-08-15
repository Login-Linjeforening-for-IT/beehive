import EventListItem from "./EventListItem";
import {Link} from 'react-router-dom';

const EventList = ( {categories, events, name} ) => {
  return(
    <ul className="EventList">
      {
        events.map((evt) => (
					<li key={evt.eventID}>
						<Link to={"/events/" + evt.eventID}>
							<EventListItem category={categories.find(c => c.Name === evt.category)} evt={evt} />
						</Link>
					</li>
        ))
      }
    </ul>
  )
}

export default EventList;
