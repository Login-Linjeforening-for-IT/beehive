export default function TabNavItem({ id, title, activeTab, setActiveTab }: any) {
 
    function handleClick() {
        setActiveTab(id)
    }
 
    return (
        <li onClick={handleClick} className={`tabs__nav-item ${activeTab === id ? "tabs__nav-item--active" : ""}`}>
            <div className={`tabs__nav-title ${activeTab === id ? "tabs__nav-title--active" : ""}`}>{ title }</div>
        </li>
    )
}
