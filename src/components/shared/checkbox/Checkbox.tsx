import "./Checkbox.css"

type CheckboxProps = { 
  id: string
  label: string
  count: boolean, 
  checked: any
  onChange: any
}
export default function Checkbox({ id, label, count = false, checked, onChange }: CheckboxProps) {
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
    )
};
