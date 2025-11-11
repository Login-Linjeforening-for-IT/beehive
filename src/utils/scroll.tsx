'use client'

import { ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router'

type ScrollProps = {
    props: ReactNode | null | undefined
}

export default function Scroll({props}: ScrollProps) {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0,0)
    }, [location])

    // @ts-expect-error
    return <>{props.children}</>
}
