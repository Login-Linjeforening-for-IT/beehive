const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {
 
    const handleClick = () => {
        setActiveTab(id)
    };
 
    return (
        <li onClick={handleClick} className={activeTab === id ? "Active" : ""}>
            { title }
        </li>
    )
}

export default TabNavItem