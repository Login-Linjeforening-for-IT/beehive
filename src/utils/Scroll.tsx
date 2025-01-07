'use client'

import { ReactNode, useEffect } from 'react'
{/* @ts-ignore */}
import { useLocation } from 'react-router'

export default function Scroll({props}: {props: ReactNode}) {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0,0)
    }, [location])

    return <>{props.children}</>
}
