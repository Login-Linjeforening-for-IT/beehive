'use client'

import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router'

// finnes duplicate scroll funksjon?
export default function Scroll({children}: {children: ReactNode}) {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0,0)
    }, [location])

    return <>{children}</>
}
