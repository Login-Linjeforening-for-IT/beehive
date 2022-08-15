import './Contact.css'
import MazeMap from '../mazemap/map';

const Contact = () => {
  return(
    <div className="ContactCard">
      <h2>Kontakt Info</h2>
      <div>
        <div className='ContactCardInfo'>
          <h4>Adresse:</h4>
          <p>Login - Linjeforeningen for IT</p>
          <p>Teknologivegen 22</p>
          <p>Bygg A, rom 155</p>
          <p>2815 GJØVIK</p>

          <h4>Epost:</h4>
          <p>kontakt@logntnu.no</p>
        </div>
        <MazeMap mazeref="https://use.mazemap.com/#v=1&campusid=55&sharepoitype=poi&sharepoi=229153" />
      </div>
    </div>
  );
}

export default Contact;
