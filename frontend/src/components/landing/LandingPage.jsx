import './LandingPage.css';
import {useEffect} from "react";
import Container from '../container/Container'
/*import SmallEvent from './SmallEvent'*/
import {Link} from 'react-router-dom';
import { config } from '../../Constants';

const WelcomeBanner = () => {
  return (
    <div className="Welcome">
      <picture>
        <source srcSet={ config.url.CDN_URL + '/img/logo/logo-tekst-white.svg'} />
        <img alt="Login Linjeforeningen for IT" />
      </picture>
      <p>Velkommen til <span className="gradient-text-color">Login.no</span>!</p>
    </div>
  );
}

const ComingEvents = () => {
  return(
    <div>
      {/*<h3>Arrangementer</h3>
      <div className="events">
        <SmallEvent date={"21. jun"} name={"Kodekveld"}/>
        <SmallEvent date={"24. jun"} name={"Tacokveld"}/>
        <SmallEvent date={"25. jun"} name={"Filmkveld"}/>
        <SmallEvent date={"28. jun"} name={"Badekveld"}/>
        <SmallEvent date={"30. aug"} name={"Tirsdagskveld"}/>
        <div className={"more-events"}>
          <Link to={"/events"}>Flere arrangementer</Link>
        </div>
      </div>*/}
    </div>
  )
}

const SmallInfo = () => {
  return (
    <>
      <div className='LandingPageInfo'>
        <div>
          <h2>Hvem er vi?</h2>
          <p>Login er linjeforeningen for IT ved NTNU i Gjøvik. Foreningen drives av studenter og målet med arbeidet vårt er å forbedre studiemiljøet på universitetet.</p>
          <Link to="/about">Les mer</Link>
        </div>
        <picture>
					<source srcSet={ config.url.CDN_URL + '/img/styret.jpg' } />
          <img alt="Login styret" />
        </picture>
      </div>

      <div className='LandingPageInfo'>
        <div>
          <h2>For bedrifter</h2>
          <p>Login fungerer som bindeleddet mellom studier og arbeidsliv. Sjekk ut hva vi kan tilby din bedrift.</p>
          <Link to="/companies">Les mer</Link>
        </div>
        <picture>
          <source srcSet={ config.url.CDN_URL + '/img/cyberdagen_preben.jpg' } />
          <img alt="Cyberdagen" />
        </picture>
      </div>
    </>
  );
}

  
const LandingPage = () => {
  return (
    <div className='LandingPage'>
      <WelcomeBanner/>
      <ComingEvents/>
      <SmallInfo/>
    </div>
  );
}

export default LandingPage  ;
