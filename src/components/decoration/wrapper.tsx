import { isEasterSeason } from '@utils/time'
import React from 'react'

export function Easter({ children }: {children: React.ReactNode}) {
    if (isEasterSeason()) {
        return children
    } else {
        return null
    }
}