import { isChristmas, isEaster, isHalloween, isNewYear, isValentine, isWinter } from '@utils/time'
import React from 'react'

type DecorationType = 'easter' | 'christmas' | 'winter' | 'newYear' | 'valentine' | 'halloween'

type DecorationProps = {
    type: DecorationType
    children: React.ReactNode
}

export function Decoration({ type, children }: DecorationProps) {
    let isVisible = false

    switch (type) {
        case 'easter':
            isVisible = isEaster()
            break
        case 'christmas':
            isVisible = isChristmas()
            break
        case 'winter':
            isVisible = isWinter()
            break
        case 'newYear':
            isVisible = isNewYear()
            break
        case 'valentine':
            isVisible = isValentine()
            break
        case 'halloween':
            isVisible = isHalloween()
            break
    }
    if (isVisible) {
        return children
    } else {
        return null
    }
}