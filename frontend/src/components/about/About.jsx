import Committees from './Committees';
import StudyPrograms from './StudyPrograms';
import {useEffect} from 'react';
import { config } from '../../Constants';

import './About.css';

const About = () => {
  return (
    <div className="AboutContent">
      <h1>Hvem er vi?</h1>
      <section className='AboutIntro'>
        <div>
          <p>
            Login er linjeforeningen for IT ved <i className="logfont-ntnu"></i> NTNU i Gjøvik og alle som går de følgene studiene er automatisk medlemmer i foreningen.
          </p>
          <StudyPrograms/>
        </div>
        <picture>
          <source srcSet={ config.url.CDN_URL + '/img/styret2.jpg'} />
          <img alt="Login styret" />
        </picture>
      </section>
      <section>
        <h2>Av studenter, for studenter</h2>
        <div className='WideTextContainer'>
          <p className='Classy'>Foreningen drives av frivillige studenter som arbeider for at du skal få mest mulig ut av studiene dine ved <i className="logfont-ntnu"></i> NTNU.</p>
          <p>
            Vi arrangerer regelmessig sosiale arrangementer og bedriftspresentasjoner. Vi holder kontakt med aktuelle
            bedrifter og inviterer til blant annet cyberdagene én gang i semesteret slik at du som student skal bli kjent
            med mulighetene utdanningen din gir deg.
          </p>
          <p>
            Hver uke samler vi studenter til <i className="logfont-tekkom"></i> TekKom- og <i className="logfont-ctf-filled"></i> CTF-samlinger, der man kan lære seg nye ting eller
            komme med bidrag til foreningen. Her kan man møte andre studenter som deler gleden for å lære, og å sette
            kunnskapene man tilegner seg i praksis. Videre jobber <i className="logfont-eventkom-filled"></i> EvntKom stadig med nye og spennende arrangementer som
            f.eks. filmkvelder og vinterball.
          </p>
        </div>
      </section>
      <section>
        <h2>Styret og komiteene</h2>
        <p>
          Foreningen er satt sammen av et hovedstyret og en rekke komiteer.
        </p>
        <Committees/>
      </section>
    </div>
  )
}

export default About;
