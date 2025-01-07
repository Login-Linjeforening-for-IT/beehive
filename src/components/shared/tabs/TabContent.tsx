import { ReactNode } from 'react'

type TabContentProps = {
    id: string
    activeTab: string
    children: ReactNode
}

export default function TabContent({id, activeTab, children}: TabContentProps) {
    return (
        activeTab === id ? <div className='tabs_content'>
            { children }
        </div>
            : null
    )
}
