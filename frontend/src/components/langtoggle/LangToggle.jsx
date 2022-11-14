import {withTranslation} from "react-i18next";
import {useEffect, useState} from 'react';

import './LangToggle.css'

const LangToggle = ({i18n}) => {
  const [buttonText, setButtonText] = useState('');
  
  useEffect( () => {
    i18n.language === 'no' || i18n.language === 'nb' ? setButtonText('NO') : setButtonText('EN')
  }, [i18n.language]);

  function handleClick(event) {
    if (i18n.language === 'no' || i18n.language === 'nb') {
      i18n.changeLanguage(event.target.value = 'en');
      setButtonText('NO');
    } else {
      i18n.changeLanguage(event.target.value = 'nb');
      setButtonText('EN');
    }
  }

  return(
    <div value={i18n.language} onClick={handleClick} className="lang-toggle">{buttonText}</div>
  )
}

export default withTranslation()(LangToggle)
