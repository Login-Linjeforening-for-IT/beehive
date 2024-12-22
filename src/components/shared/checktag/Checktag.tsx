import "./Checktag.css"

type ChecktagProps = {
  id: string
  label: string
  checked: any
  onChange: any
}

export default function Checktag({ id, label, checked, onChange }: ChecktagProps) {
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
    )
};
