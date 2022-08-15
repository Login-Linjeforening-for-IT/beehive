import './LandingPage.css';
import {useEffect} from "react";
/*import Background from './components/background/Background'  - dont know what this was meant for, but got errors */ 
import Container from '../container/Container'
/*import SmallEvent from './SmallEvent'*/
import {Link} from 'react-router-dom';

const WelcomeBanner = () => {
  return (
    <div className="Welcome">
      <picture>
        <source srcSet={process.env.PUBLIC_URL + '/img/welcome_banner.svg'} />
        <img alt="Login har fått ny hjemmeside!" />
      </picture>
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
        </div>
        <picture>
					<source srcSet={process.env.PUBLIC_URL + '/img/styret.jpg'} />
          <img alt="Login styret" />
        </picture>
        <Link to="/about">Les mer</Link>
      </div>

      <div className='LandingPageInfo'>
        <div>
          <h2>For berifter</h2>
          <p>Login fungerer som bindeleddet mellom studier og arbeidsliv. Sjekk ut hva vi kan tilby bedrifter.</p>
        </div>
        <picture>
          <source srcSet={process.env.PUBLIC_URL + '/img/cyberdagen_preben.jpg'} />
          <img alt="Cyberdagen" />
        </picture>
        <Link to="/companies">Les mer</Link>
      </div>
    </>
  );
}

  
const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  return (
    <div className='LandingPage'>
      <WelcomeBanner/>
      <ComingEvents/>
      <SmallInfo/>
    </div>
  );
}

export default LandingPage  ;
