import { Link } from 'react-router-dom';

import './Committees.css';

const PR = () => {
  return (
    <div className="Committee">
      <h4>PR</h4>
      <p>PR er Logins ansikt utad og har ansvar for Logins offentlige media. Dette innebærer å benytte Logins sosiale platformer som Facebook og Discord, samt e-post saksbehandlingssystemet til Login.</p>
      <p>I den daglige driften er hovedoppgaven å følge med på RT og besvare relevante eposter, eventuelt sende de videre til styret. En stor del av denne oppgaven innebærer kontakt med bedrifter som vi samarbeider med for å hjelpe våre studenter på veien inn i arbeidslivet. Videre er PR med på å representere Login på events og bistår også med rekruttering av nye medlemmer.</p>
    </div>
  )
}

const TekKom = () => {
  return (
    <div className="Committee">
      <h4>TekKom</h4>
      <p>TekKom har ansvaret for infrastrukturen til Login. Våre oppgaver innebærer utvikling og vedlikehold av blant annet nettsidene og tjenestene foreningen avhenger av, i tillegg til mindre hobbyprosjekter. TekKom er for studenter som liker det tekniske og ønsker å få erfaring fra et ekte produksjonsmiljø. Det er en flott arena for å møte likesinnede studenter, oppdage og bli kjent med ny teknologi, og for å benytte deg av kunnskapene du tilegner deg i og utenfor studiene.</p>
      <p>Vi organiserer faste arbeidskvelder og noen arbeidshelger i løpet av semesteret der vi jobber med TekKom-prosjekter. Her vil vi som regel jobbe med videreutvikling av nettsiden, oppgradering av tjenester og servere og utvikling av interne prosjekter. Her stiller vi ingen forventninger annet enn at man er nysgjerrig og forøker å bidrea med det man kan. Du finner mer informasjon om de faste møtene våre på <Link to="/arrangementer">arrangementer</Link>-siden, eller på <a href="https://discord.gg/login-ntnu" target="_blank" rel="noreferrer">discord</a></p>
      <p>Dersom du ønsker å bli en del av et sosialt miljø som knytter studenter fra flere studieprogram på tvers av år og studieretninger er dette komiteen for deg. Hos oss vil du få anledning til å gjøre tjenestetilbudet vårt enda bedre, og hjelpe foreningen å vokse.</p>
    </div>
  )
}

const EvntKom = () => {
  return ( 
    <div className="Committee">
      <h4>EvntKom</h4>
      <p>EvntKom har ansvar for å stelle i stand sosiale arrangement på vegne av Login gjennom semesteret. Vi tilbyr sammenkomster der studenter kan møtes på tvers av studieprogram, år og klasser for å få et avbrekk fra studiehverdagen.</p>
      <p>Vi er også den yngste komiteen i Login, og her vil du ha rom for å forme vårt tilbud. Målet til EvntKom er å bygge et sterkt fellesskap blant IT-studentene ved skolen, som du kan lene deg på når studiehverdagen tar på.</p>
      <p>Dersom du er en kreativ sjel som liker å stelle i stand fest og moro er dette komiteen for deg. Dersom du har forslag til aktiviteter, eller ønsker å være med i komiteen er det bare å kontakte oss på <a href="https://discord.gg/login-ntnu" target="_blank" rel="noreferrer">discord</a>. Forslag og tilbakemeldinger tas imot med glede, og vi håper å høre fra deg.</p>
    </div>
  )
}

const CTFKom = () => {
  return (
    <div className="Committee">
      <h4>CTFKom</h4>
      <p>CTFKom er komiteen som stiller i stand CTF arrangementer på campus. Vi arbeider for at alle IT-studentene ved skolen skal kunne utvikle sine ferdigheter gjennom Capture the Flag konkurranser. Annenhver uke samles vi på skolen for å løse oppgaver sammen, og tilbyr en arena der studenter fra ulike studieprogram, år og klasser kan treffes og ha det gøy sammen.</p>
      <p>CTFKom er komiteen som stiller i stand CTF arrangementer på campus. Vi arbeider for at alle IT-studentene ved skolen skal kunne utvikle sine ferdigheter gjennom Capture the Flag konkurranser. Annenhver uke samles vi på skolen for å løse oppgaver sammen, og tilbyr en arena der studenter fra ulike studieprogram, år og klasser kan treffes og ha det gøy sammen.</p>
      <p>Utover dette er vi aktive på Discord, og sørger for at du alltid kan holde deg oppdatert på nye og interessante CTFer. For oss er det viktig å bygge oppunder et inklusivt og støttende miljø, der ingen spørsmål er for dumme. Dersom du sitter fast i en CTF, eller bare lurer på noe er det bare å sende en melding i kanalen på <a href="https://discord.gg/login-ntnu" target="_blank" rel="noreferrer">discord</a>.</p>
    </div>
  )
}

export {
  PR,
  TekKom,
  EvntKom,
  CTFKom
}
