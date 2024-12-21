import './Checktag.css';

export default function Checktag({ id, label, checked, onChange }) {
  return (
    <label className="checktag">
      <input
        className='checktag__input'
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <div className="checktag__name">
        {label}
      </div>
    </label>
  );
};
