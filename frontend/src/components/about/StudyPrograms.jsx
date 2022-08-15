import './StudyPrograms.css'
import {useState} from "react";

const StudyPrograms = () => {
  const [activeTab, setActiveTab] = useState("none");

  const handleClick = (level) => {
    if (activeTab === level) {
      setActiveTab('none');
    } else {
      setActiveTab(level);
    }
  }

  return(
    <ul className='StudyPrograms'>
      <li onClick={() => handleClick('bachleor')} className={activeTab === 'bachleor' ? 'active' : ''}><i className='fa fa-angle-right'/>Bachleor studier</li>
      {activeTab === "bachleor" &&
        <ul>
          <li>Dataingeniør <a href="https://www.ntnu.no/studier/bidata" target="_blank"><i className="fa fa-external-link"></i></a></li>
          <li>Digital infrastruktur og cybersikkerhet <a href="https://www.ntnu.no/studier/bdigsec" target="_blank"><i className="fa fa-external-link"></i></a></li>
          <li>Programmering <a href="https://www.ntnu.no/studier/bprog" target="_blank"><i className="fa fa-external-link"></i></a></li>
        </ul>
      }

      <li onClick={() => handleClick('master')} className={activeTab === 'master' ? 'active' : ''}><i className='fa fa-angle-right'/>Master studier</li>
      {activeTab === "master" &&
        <ul>
          <li>Information security <a href="https://www.ntnu.no/studier/mis" target="_blank"><i className="fa fa-external-link"></i></a></li>
          <li>Applied computer science <a href="https://www.ntnu.edu/studies/macs" target="_blank"><i className="fa fa-external-link"></i></a></li>
          <li>Computational colour and spectral imaging <a href="https://www.ntnu.no/studier/mscosi" target="_blank"><i className="fa fa-external-link"></i></a></li>
        </ul>
      }
      
      <li onClick={() => handleClick('phd')} className={activeTab === 'phd' ? 'active' : ''}><i className='fa fa-angle-right'/>Ph.d</li>
      {activeTab === "phd" &&
        <ul>
          <li>Informasjonsikkerhet og kommunikasjonsteknologi <a href="https://www.ntnu.no/studier/phisct" target="_blank"><i className="fa fa-external-link"></i></a></li>
          <li>Datateknologi og informatikk <a href="https://www.ntnu.no/studier/phcos" target="_blank"><i className="fa fa-external-link"></i></a></li>
          <li>Elektronikk og telekommunikasjon <a href="https://www.ntnu.no/studier/phet" target="_blank"><i className="fa fa-external-link"></i></a></li>
        </ul>
      }
    </ul>
  );
}

export default StudyPrograms;
