import { ReactNode } from 'react'
import './tags.css'

type TagProps = {
    children: ReactNode
    variant: string
}

export default function Tag({ children, variant }: TagProps) {
    return (
        <div className={`tag tag--${variant}`}>
            <div className='tag_container'>
                <div className='tag_name'>
                    {children}
                </div>
            </div>
        </div>
    )
}
