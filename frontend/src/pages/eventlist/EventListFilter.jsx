import './Events.css';
import {withTranslation} from "react-i18next";
import ListFilter from "../../components/filter/ListFilter";

import './EventListFilter.css';

import {useState} from 'react'

import AccordionItem from '../../components/accordion/AccordionItem'
import AccordionContent from '../../components/accordion/AccordionContent';

const EventListFilter = ({t,categories, searchTerm, handleSearchChange, handleCategoryChange, resetFilter}) => {

  const [activeAccordionItem, setActiveAccordionItem] = useState('none')

  return (
    <ul className='accordion filter'>
      <AccordionItem id='filter' title={<><i className='accordion__icon--left fa fa-angle-right'></i>Filter <i className='fa fa-filter'></i></>} activeAccordionItem={activeAccordionItem} setActiveAccordionItem={setActiveAccordionItem} />
      <AccordionContent id='filter' activeAccordionItem={activeAccordionItem}>
        <div className='filter__content'>
          <input className='filter__search' type="text" placeholder={t('filter.searchHint')} value={searchTerm} onChange={handleSearchChange}/>
          <ListFilter categories={categories} handleChange={handleCategoryChange}/>
          <button className='filter__button' onClick={resetFilter}>{t('filter.resetButton')}</button>
        </div>
      </AccordionContent>
    </ul>
  );
}

export default withTranslation('eventListPage')(EventListFilter)

