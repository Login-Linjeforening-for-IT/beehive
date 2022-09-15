import './CompaniesPage.css';
import Card from '../container/Card';
import Contact from './Contact'
import { businessData } from '../../businessData';

const CompaniesPage = () => {
  return (
    <div className="CompaniesPage">
      <div>
        <h1>For bedrifter</h1>
        <p className='Classy'>Er din bedrift på utskikk etter skarpe IT-studenter? Sjekk ut alt vi har å tilby din bedrift.</p>
      </div>
      <Card data={businessData[0]}/>
      <Card data={businessData[1]}/>
      <Card data={businessData[2]}/>
      <Card data={businessData[3]}/>
      <Card data={businessData[4]}/>
      <Contact/>
    </div>
  );
}

export default CompaniesPage;
