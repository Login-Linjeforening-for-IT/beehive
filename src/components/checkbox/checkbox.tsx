import './checkbox.css'

type CheckboxProps = {
    id: string
    label: string
    count: boolean,
    // eslint-disable-next-line
    checked: any
    // eslint-disable-next-line
    onChange: any
}

export default function Checkbox({ id, label, count = false, checked, onChange }: CheckboxProps) {
    return (
        <label className='checkbox'>
            <input
                className='checkbox_input'
                type='checkbox'
                id={id}
                checked={checked}
                onChange={onChange}
            />
            <span className='checkbox_box' />
            <div className='checkbox_name'>
                {label}
                {count && <span className='checkbox_item-count'> ({count})</span>}
            </div>
        </label>
    )
}
