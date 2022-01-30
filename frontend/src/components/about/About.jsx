import { Link } from 'react-router-dom';
import { PR, TekKom, EvntKom, CTFKom } from './Committees';

const About = (props) => {
  return (
    <div className="About">
      <h3>Om oss</h3>
      <p>Login er linjeforeningen for IT ved NTNU i Gjøvik. Foreningen består av engasjerte studenter som ønsker å bidra til et godt studiemiljø, og at hver enkelt skal kunne finne sin vei inn i arbeidslivet.</p>
      <p>Foreningen er satt sammen av en rekke komiteer, som jobber sammen for å legge til rette for bedriftspresentasjoner, sosiale arrangementer og gjesteforelesninger. Vi holder kontakt med en aktuelle bedrifter og inviterer til blant annet karrieredag én gang i semesteret slik at du som student skal bli kjent med mulighetene utdanningen din gir det, i tillegg til å kunne søke sommerjobber, deltidsjobber eller kanskje til og med fulltidsjobb.</p>
      <p>Vårt ønske er å legge til rette for at studentene ved NTNU trives, og vi arrangerer regelmessige sosiale arrangementer. Hver uke samler vi studenter til TekKom og CTF samlinger, der man kan lære seg nye ting og komme med et bidrag til foreningen. Her vil man møte andre studenter som deler gleden for å lære, og å sette kunnskapene man tilegner seg i praksis. Videre jobber EvntKom stadig med nye og spennende arrangementer som f.eks. filmkvelder og vinterball. Du finner mer om arrangementene våre på <Link to="events">Arrangementer</Link>-siden.</p>
      <PR />
      <TekKom />
      <EvntKom />
      <CTFKom />
    </div>
  )
}

export default About;
