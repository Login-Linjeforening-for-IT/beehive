import './checktag.css'

type ChecktagProps = {
    id: string
    label: string
    // eslint-disable-next-line
    checked: any
    // eslint-disable-next-line
    onChange: any
}

export default function Checktag({ id, label, checked, onChange }: ChecktagProps) {
    return (
        <label className='checktag'>
            <input
                className='checktag_input'
                type='checkbox'
                id={id}
                checked={checked}
                onChange={onChange}
            />
            <div className='checktag_name'>
                {label}
            </div>
        </label>
    )
}
