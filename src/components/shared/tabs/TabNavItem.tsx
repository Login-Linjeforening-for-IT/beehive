import React, { SetStateAction } from 'react'

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
        <li onClick={handleClick} className={`group tabs_nav-item ${activeTab === id ? 'active' : ''}`}>
            <div className={`p-0 pb-[0.3rem] w-fit h-full block m-auto transition duration-200 text-[var(--color-text-discreet)] border-b-[0.3rem] border-solid border-[var(--color-bg-surface)] *:block *:w-full *:max-w-[4rem] 500px:*:max-w-[6rem] tabs_nav-title  ${activeTab === id ? 'tabs_nav-title--active color-[var(--color-text-main)] border-[var(--color-primary)]' : ''}`}>{ title }</div>
        </li>
    )
}
