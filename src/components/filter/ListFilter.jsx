import * as React from 'react';
import Checkbox from "./Checkbox";
import './filter.css'

// import './frontend/src/pages/eventlist/EventListFilter.css';

const ListFilter = ({categories, handleChange}) => {

  return (
    <div className='filter__checkboxes'>
      {
        categories.map((obj,key) => {
          if (obj.isVisible) {
            return (
              <Checkbox
                //key={obj.category_name}
                id={obj.category_name}
                title={obj.category_name}
                name={obj.category_name}
                checked={obj.isChecked}
                handleChange={handleChange}
              />
            )
          }
        })
      }
    </div>
  )
}

export default ListFilter;
