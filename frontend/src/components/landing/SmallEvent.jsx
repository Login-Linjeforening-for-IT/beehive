import './SmallEvent.css'
import {Link} from 'react-router-dom';

const SmallEvent = ({date, name}) => {
  return(
    <div className="smallEvent">
      <Link to={"/events/id=123"}>
        <p className="date">{date}</p>
        <p className="name">{name}</p>
      </Link>
    </div>
  );
}

export default SmallEvent;
