import AccordionItem from '../../components/accordion/AccordionItem'
import AccordionContent from '../../components/accordion/AccordionContent'
import {useState} from 'react'
import {withTranslation} from 'react-i18next'

const StudyProgramsAccordion = ({t}) => {

  const [activeAccordionItem, setActiveAccordionItem] = useState('bachelor')


  return(
    <ul className='accordion'>
      <AccordionItem id='bachelor' title={<><i className='accordion__icon--left fa fa-angle-right'></i>Bachelor</>} activeAccordionItem={activeAccordionItem} setActiveAccordionItem={setActiveAccordionItem} />
      <AccordionContent id='bachelor' activeAccordionItem={activeAccordionItem}>
        <li className='accordion__content-item'>{t('bachelor.computerEngineer')} <a href='https://www.ntnu.no/studier/bidata' target='_blank'><i className='fa fa-external-link'></i></a></li>
        <li className='accordion__content-item'>{t('bachelor.digsec')} <a href='https://www.ntnu.no/studier/bdigsec' target='_blank'><i className='fa fa-external-link'></i></a></li>
        <li className='accordion__content-item'>{t('bachelor.prog')} <a href='https://www.ntnu.no/studier/bprog' target='_blank'><i className='fa fa-external-link'></i></a></li>
      </AccordionContent>
      <AccordionItem id='master' title={<><i className='accordion__icon--left fa fa-angle-right'></i>Master</>} activeAccordionItem={activeAccordionItem} setActiveAccordionItem={setActiveAccordionItem} />
      <AccordionContent id='master' activeAccordionItem={activeAccordionItem}>
        <li className='accordion__content-item'>{t('master.infosec')} <a href='https://www.ntnu.no/studier/mis' target='_blank'><i className='fa fa-external-link'></i></a></li>
        <li className='accordion__content-item'>{t('master.applied')} <a href='https://www.ntnu.edu/studies/macs' target='_blank'><i className='fa fa-external-link'></i></a></li>
        <li className='accordion__content-item'>{t('master.colorimg')} <a href='https://www.ntnu.no/studier/mscosi' target='_blank'><i className='fa fa-external-link'></i></a></li>
      </AccordionContent>
      <AccordionItem id='phd' title={<><i className='accordion__icon--left fa fa-angle-right'></i>Ph.d</>} activeAccordionItem={activeAccordionItem} setActiveAccordionItem={setActiveAccordionItem} />
      <AccordionContent id='phd' activeAccordionItem={activeAccordionItem}>
      <li className='accordion__content-item'>{t('phd.infosec')} <a href='https://www.ntnu.no/studier/phisct' target='_blank'><i className='fa fa-external-link'></i></a></li>
        <li className='accordion__content-item'>{t('phd.data')} <a href='https://www.ntnu.no/studier/phcos' target='_blank'><i className='fa fa-external-link'></i></a></li>
        <li className='accordion__content-item'>{t('phd.tele')} <a href='https://www.ntnu.no/studier/phet' target='_blank'><i className='fa fa-external-link'></i></a></li>
      </AccordionContent>
    </ul>
  )
}

export default withTranslation('aboutPage')(StudyProgramsAccordion)
