import TabNavItem from './TabNavItem'
import TabContent from './TabContent'
import EventkomLogo from './logos/EventkomLogo'
import PrkomLogo from './logos/PrkomLogo'
import TekkomLogo from './logos/TekkomLogo'
import CtfkomLogo from './logos/CtfkomLogo'
import StyretLogo from './logos/StyretLogo'
import LogChamp from './LogChamp'

import { useState } from 'react';

import './Committees.css';
import './LogChamp.css';


const Tabs = () => {
  const [activeTab, setActiveTab] = useState("styret");
 
  return (
    <div className="Tabs">
      <ul>
        <TabNavItem title={<StyretLogo />} id="styret" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<EventkomLogo />} id="event" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<TekkomLogo />} id="tek" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<PrkomLogo />} id="pr" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<CtfkomLogo />} id="ctf" activeTab={activeTab} setActiveTab={setActiveTab}/>
      </ul>
 
      <div className="outlet">
        <TabContent id="styret" activeTab={activeTab}>
          <h3>Styret</h3>
          <p className='StyretInfo'>
            Øverste leddet i foreningen er styret. Under årsmøtet blir leder, nestleder, sekretær og økonomiansvarlig stemt frem, og disse sitter sammen med lederene fra de ulike komiteene i styret. Sammen er disse ansvarlige for å drive foreningen, styre økonomien og sørge for at alle utfører de oppgavene de skal.
          </p>
          <div className='BoardMembers'>
            <LogChamp img="./img/portrett_leder.jpg" name="Anders Eiken" stilling="Leder" discord="Eiken#6059" />
            <LogChamp img="./img/portrett_nestleder.jpg" name="Mads Halland" stilling="Nestleder" discord="¬.¬#6719" />
            <LogChamp img="./img/portrett_økonomi.jpg" name="Sebastian Hestsveen" stilling="Økonomiansvarlig" discord="stubbe#8694" />
            <LogChamp img="./img/portrett_sekretær.jpg" name="Celina Brynildsen" stilling="Sekretær" discord="Celina#6955" />
            <LogChamp img="./img/portrett_eventkom-leder.jpg" name="Sofie Hagen" stilling="Eventkom leder" discord="sofiee#9763" />
            <LogChamp img="./img/portrett_pr-leder.jpg" name="Kristina Kataki" stilling="PR leder" discord="Kataki#7254" />
            <LogChamp img="./img/portrett_tekkom-leder.jpg" name="Simon Edna" stilling="TekKom leder" discord="Sim#3909" />
            <LogChamp img="./img/portrett_placeholder.svg" name="ikke valgt" stilling="CTF leder" discord="" />
          </div>
        </TabContent>
        <TabContent id="event" activeTab={activeTab}>
          <h3>EventKom</h3>
          <div className='ComiteInfo'>
            <div>
              <p className='Classy'>
                EventKom er Logins party-komité hvor målet er å bruke opp alle inntektene PR sørger for.
              </p>
              {/*TODO: Skal avslutningen skrives om? */}
              <p>
                EventKom har ansvar for å stelle i stand sosiale arrangement på vegne av Login gjennom semesteret.
                Vi tilbyr sammenkomster der studenter kan møtes på tvers av studieprogram, år og klasser for å få
                et avbrekk fra studiehverdagen. Målet til EventKom er å bygge et sterkt fellesskap blant IT-studentene ved skolen,
                som du kan lene deg på når studiehverdagen tar på. Dersom du har forslag til aktiviteter, eller ønsker å
                være med i komiteen er det bare å kontakte oss på <a href="https://discord.gg/login-ntnu\" target="_blank" rel="noreferrer">Discord</a>. Forslag og tilbakemeldinger tas imot
                med glede, og vi håper å høre fra deg.
              </p>
            </div>
            <LogChamp img="./img/portrett_eventkom-leder.jpg" name="Sofie Hagen" stilling="Eventkom leder" discord="sofiee#9763" />
          </div>
        </TabContent>
        <TabContent id="tek" activeTab={activeTab}>
          <h3>TekKom</h3>
          <div className='ComiteInfo'>
            <div>
              <p className='Classy'>
                Tekkom påstår at de jobber med denne nettsiden men hovedsaklig spiser de pizza. Dette er komiteen for de som liker å lære tekniske ting som å progge og drifte høyteknologisk infrastruktur.
              </p>
              <p>
                TekKom har ansvaret for infrastrukturen til Login. Våre oppgaver innebærer utvikling og vedlikehold
                av blant annet nettsidene og tjenestene foreningen avhenger av, i tillegg til andre sideprosjekter. Vi organiserer åpne
                arbeidskvelder med pizza hver uke der vi jobber med TekKom-prosjekter. Her stiller vi ingen forventninger annet enn at man er nysgjerrig og
                forøker å bidra med det man kan. Hvis du liker å kode, eller bare har et vilt prosjekt i tankene, så er dette komiteen for deg!
              </p>
            </div>
            <LogChamp img="./img/portrett_tekkom-leder.jpg" name="Simon Edna" stilling="TekKom leder" discord="Sim#3909" />
          </div>
        </TabContent>
        <TabContent id="pr" activeTab={activeTab}>
          <h3>PR</h3>
          <div className='ComiteInfo'>
            <div>
              <p className='Classy'>
                PR er Logins gyldene ku og uten dem hadde ikke pengene strømmet inn og ingen av de andre komiteene kunne drevet med sprel!
              </p>
              <p>
                PR er Logins ansikt utad og har ansvar for Logins offentlige mediakanaler. PR følger med på vårt ­ticketsystem og svarer bedriftskontakter. 
                De jobber også for å gi studenter et innsyn og vei inn i næringslivet ved å arrangere bedpresser, workshops/fagpres og ­karrieredager, som også er Logins hovedinntektskilde!
                Videre er PR med på å representere Login på events og bistår også med rekruttering av nye medlemmer.
              </p>
            </div>
            <LogChamp img="./img/portrett_pr-leder.jpg" name="Kristina Kataki" stilling="PR leder" discord="Kataki#7254" />
          </div>
        </TabContent>
        <TabContent id="ctf" activeTab={activeTab}>
          <h3>CTFkom</h3>
          <div className='ComiteInfo'>
            <div>
              <p className='Classy'>
                {/*TODO: Sjekk om det kommer alfa eller bare en a, også samme problem som Eventkom*/}
                CTFkom er Logins hacker-komité. Deres viktigste oppdrag er å hacke seg inn på ING:α sin infrastruktur og lage sprel der!
              </p>
              <p>
                CTFKom er komiteen som stiller i stand CTF arrangementer på campus. De arbeider for at alle IT-
                studentene ved skolen skal kunne utvikle sine ferdigheter gjennom Capture The Flag konkurranser.
                Annenhver uke samles de på skolen for å løse oppgaver sammen, og tilbyr en arena der studenter fra
                ulike studieprogram, år og klasser kan treffes og ha det gøy sammen. Utover dette er vi aktive på
                Discord, og sørger for at du alltid kan holde deg oppdatert på nye og interessante CTFer. I CTFkom er ingen spørsmål for dumme og
                dersom du sitter fast i en CTF, eller bare lurer på noe er det bare å sende en melding i kanalen på 
                <a href="https://discord.gg/login-ntnu\" target="_blank" rel="noreferrer"> Discord</a>.
              </p>
            </div>
            <LogChamp img="./img/portrett_placeholder.svg" name="ikke valgt" stilling="CTF leder" discord="" />
          </div>
        </TabContent>
      </div>
    </div>
  )
}

const Committees = () => {
  return (
    <>
      <Tabs />
    </>
  )
}

export default Committees
