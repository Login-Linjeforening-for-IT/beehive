'use client'

import { ReactNode, useEffect } from 'react'
{/* @ts-ignore */}
import { useLocation } from 'react-router'

export default function Scroll({props}: {props: ReactNode | null | undefined}) {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0,0)
    }, [location])

    // @ts-expect-error
    return <>{props.children}</>
}
