export default function TabContent({id, activeTab, children}: any) {
    return (
        activeTab === id ? <div className='tabs_content'>
            { children }
        </div>
            : null
    )
}
