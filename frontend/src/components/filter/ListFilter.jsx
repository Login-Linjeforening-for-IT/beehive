import * as React from 'react';
import Checkbox from "./Checkbox";

// import './frontend/src/pages/eventlist/EventListFilter.css';

const ListFilter = ({categories, handleChange}) => {

  return (
    <div className='filter__checkboxes'>
      {
        categories.map((obj,key) => {
          if (obj.isVisible) {
            return (
                <Checkbox id={obj.category_name} title={obj.category_name.toUpperCase()} name={obj.category_name} checked={obj.isChecked} handleChange={handleChange}/>
            )
          }
        })
      }
    </div>
  );
}

export default ListFilter;
