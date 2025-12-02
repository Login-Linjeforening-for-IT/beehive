import { ReactNode } from 'react'

type TabContentProps = {
    id: string
    activeTab: string
    children: ReactNode
}

export default function TabContent({id, activeTab, children}: TabContentProps) {
    return (
        activeTab === id ? <div className='p-[.1rem_1rem_2rem_1rem] bg-(--color-bg-surface) shadow-(--container-shadow) rounded-(--border-radius) 600px:p-[2rem_2rem_2rem_3rem] 800px:p-[2rem_3rem_3rem_3rem] 1200px:p-[2rem_5rem_3rem_5rem] 1200px:m-[0_2rem]'>
            { children }
        </div>
            : null
    )
}
