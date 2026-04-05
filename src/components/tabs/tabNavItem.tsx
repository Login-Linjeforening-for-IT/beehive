import React, { type SetStateAction } from 'react'
import clsx from '@utils/clsx'

type TabNavItemProps = {
    id: string
    title: React.JSX.Element
    activeTab: string
    setActiveTab: React.Dispatch<SetStateAction<string>>
}

export default function TabNavItem({ id, title, activeTab, setActiveTab }: TabNavItemProps) {
    function handleClick() {
        setActiveTab(id)
    }

    return (
        <li
            onClick={handleClick}
            className={clsx(
                'group w-full list-none overflow-hidden rounded-(--border-radius)',
                'bg-(--color-bg-surface) shadow-(--container-shadow)',
                'transition-all duration-200 hover:cursor-pointer',
                activeTab === id && 'active'
            )}
        >
            <div
                className={clsx(
                    'm-auto block h-full w-fit border-b-[0.3rem] border-solid border-(--color-bg-surface)',
                    'p-0 text-(--color-text-discreet) transition duration-200',
                    '*:block *:w-full *:max-w-16 500px:*:max-w-24',
                    'group-hover:text-(--color-text-main)',
                    activeTab === id && 'tabs_nav-title--active border-(--color-primary) text-(--color-text-main)'
                )}
            >
                { title }
            </div>
        </li>
    )
}
