import './Events.css';
import {withTranslation} from 'react-i18next'
import ListFilter from '../../components/filter/ListFilter'


import {useState} from 'react'

import AccordionItem from '../../components/accordion/AccordionItem'
import AccordionContent from '../../components/accordion/AccordionContent'

const EventListFilter = ({t,categories, searchTerm, handleSearchChange, handleCategoryChange, resetFilter}) => {

  const [activeAccordionItem, setActiveAccordionItem] = useState('none')

  return (
    <ul className='accordion filter'>
      <AccordionItem id='filter' title={<><i className='accordion__icon--left fa fa-angle-right'></i>Filter <i className='fa fa-filter'></i></>} activeAccordionItem={activeAccordionItem} setActiveAccordionItem={setActiveAccordionItem} />
      <AccordionContent id='filter' activeAccordionItem={activeAccordionItem}>
        <div className='filter__content'>
          <form className='filter__search-bar'>
            <i className='fa fa-search filter__search-icon'></i>
            <input className='filter__search-input' type='text' placeholder={t('filter.searchHint')} value={searchTerm} onChange={handleSearchChange}/>
          </form>
          <ListFilter categories={categories} handleChange={handleCategoryChange}/>
          <button className='filter__btn filter__btn--reset' onClick={resetFilter}>{t('filter.resetButton')} <i className='fa fa-undo'> </i></button>
        </div>
      </AccordionContent>
    </ul>
  );
}

export default withTranslation('eventListPage')(EventListFilter)

