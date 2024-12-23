export default function TabNavItem({ id, title, activeTab, setActiveTab }: any) {
 
    function handleClick() {
        setActiveTab(id)
    }
 
    return (
        <li onClick={handleClick} className={`tabs_nav-item ${activeTab === id ? "tabs_nav-item--active" : ""}`}>
            <div className={`tabs_nav-title ${activeTab === id ? "tabs_nav-title--active" : ""}`}>{ title }</div>
        </li>
    )
}
