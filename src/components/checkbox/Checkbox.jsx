import './Checkbox.css';

const Checkbox = ({ id, label, count=false, checked, onChange }) => {
  return (
    <label className="checkbox">
      <input
        className='checkbox__input'
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <span className="checkbox__box"></span>
      <div className="checkbox__name">
        {label}
        {count &&
          <span className="checkbox__item-count"> ({count})</span>
        }
      </div>
    </label>
  );
};

export default Checkbox;