import {withTranslation} from 'react-i18next'
import {useEffect, useState} from 'react'

import './LangToggle.css'

function LangToggle({i18n}) {
  const [buttonText, setButtonText] = useState('')
  const [jump, setJump] = useState(false);
  
  useEffect( () => {
    i18n.language === 'no' || i18n.language === 'nb' ? setButtonText('en') : setButtonText('no')
  }, [i18n.language])

  function handleClick(event) {
    if (i18n.language === 'no' || i18n.language === 'nb') {
      i18n.changeLanguage(event.target.value = 'en')
      setButtonText('en')
    } else {
      i18n.changeLanguage(event.target.value = 'nb')
      setButtonText('no')
    }

    setJump(true)
    setTimeout(() => setJump(false), 400)
  }

  return(
    <button value={i18n.language} onClick={handleClick} className='lang-toggle'>
      <i className={`lang-toggle__icon material-symbols-sharp ${jump ? 'lang-toggle__icon--jump' : ''}`}>language</i>
      {' ' + buttonText}
    </button>
  )
}

export default withTranslation()(LangToggle)
