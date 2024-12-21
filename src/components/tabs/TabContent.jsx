export default function TabContent({id, activeTab, children}) {
    return (
        activeTab === id ? <div className='tabs__content'>
            { children }
        </div>
        : null
    )
}
