import {withTranslation} from 'react-i18next'
import ListFilter from '../../components/filter/ListFilter'

import {useState} from 'react'

import AccordionItem from '../../components/accordion/AccordionItem'
import AccordionContent from '../../components/accordion/AccordionContent'

const EventListFilter = ({t,categories, searchTerm, handleSearchChange, handleCategoryChange, resetFilter}) => {

  const [activeAccordionItem, setActiveAccordionItem] = useState('none')

  return (
    <ul className='accordion filter'>
      <AccordionItem id='filter' title={<>Filter <i className='material-symbols-sharp filter__filter-icon'>filter_alt</i></>} activeAccordionItem={activeAccordionItem} setActiveAccordionItem={setActiveAccordionItem} />
      <AccordionContent id='filter' activeAccordionItem={activeAccordionItem}>
        <div className='filter__content'>
          <form className='filter__search-bar'>
            <i class='material-symbols-sharp filter__search-icon'>search</i>
            <input className='filter__search-input' type='text' placeholder={t('filter.searchHint')} value={searchTerm} onChange={handleSearchChange}/>
          </form>
          <ListFilter categories={categories} handleChange={handleCategoryChange}/>
          <button className='filter__btn filter__btn--reset' onClick={resetFilter}>
            {t('filter.resetButton')} <span class='material-symbols-sharp filter__reset-icon'>refresh</span>
          </button>
        </div>
      </AccordionContent>
    </ul>
  );
}

export default withTranslation('eventListPage')(EventListFilter)

