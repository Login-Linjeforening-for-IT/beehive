import './Checkbox.css'

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
                className='checkbox_input'
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
            />
            <span className="checkbox_box"></span>
            <div className="checkbox_name">
                {label}
                {count &&
          <span className="checkbox_item-count"> ({count})</span>
                }
            </div>
        </label>
    )
}
