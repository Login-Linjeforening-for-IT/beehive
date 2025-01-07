import React, { SetStateAction } from "react"

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
        <li onClick={handleClick} className={`tabs_nav-item ${activeTab === id ? 'tabs_nav-item--active' : ''}`}>
            <div className={`tabs_nav-title ${activeTab === id ? 'tabs_nav-title--active' : ''}`}>{ title }</div>
        </li>
    )
}
