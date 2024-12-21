export default function TabContent({id, activeTab, children}: any) {
    return (
        activeTab === id ? <div className='tabs__content'>
            { children }
        </div>
            : null
    )
}
