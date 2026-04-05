import clsx from '@utils/clsx'

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
        <label className='group relative w-fit cursor-pointer'>
            <input
                className='peer absolute h-0 w-0 opacity-0'
                type='checkbox'
                id={id}
                checked={checked}
                onChange={onChange}
            />
            <div
                className={clsx(
                    'relative cursor-pointer rounded-[0.2em]',
                    'bg-(--color-checktag-bg) px-[0.9em] py-[0.4em]',
                    'leading-[1.3em] text-(--color-checktag-text) transition-all duration-150',
                    'group-hover:brightness-95 peer-checked:bg-(--color-btn-primary-bg)',
                    'peer-checked:pr-[0.6rem] peer-checked:pl-[1.6rem]',
                    'peer-checked:text-(--color-text-on-primary)',
                    'peer-focus-visible:ring-[0.1rem] peer-focus-visible:ring-[rgb(0,42,255)]',
                    'before:absolute before:left-2 before:top-2',
                    'before:h-[0.7rem] before:w-[0.3rem] before:rotate-45',
                    'before:border-r-[0.18rem] before:border-b-[0.18rem] before:border-white before:content-[\'\']',
                    'before:opacity-0 peer-checked:before:opacity-100'
                )}
            >
                {label}
            </div>
        </label>
    )
}
