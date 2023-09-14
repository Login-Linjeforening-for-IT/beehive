import React from 'react';

const Checkbox = ({id, title, name, handleChange, checked}) => {
  return (
    <div className='checkbox'>
      <input className='checkbox__input'
        id={id}
        type='checkbox'
        name={name}
        onChange={handleChange}
        checked={checked}
      />
      <label className='checkbox__label' htmlFor={id}>{title}</label>
    </div>
  );
}

export default Checkbox;
