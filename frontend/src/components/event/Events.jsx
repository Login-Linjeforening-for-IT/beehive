import './Events.css';
import EventContainer from './EventContainer';

import { eventData } from '../../testdata.js'; 

const Events = (props) => {
  return (
    <div className="EventList">
      {
          eventData.map((item, key) => {
              return <li key={key}><EventContainer data={item} /></li>
          })
      }
    </div>
  )
}

export default Events;
