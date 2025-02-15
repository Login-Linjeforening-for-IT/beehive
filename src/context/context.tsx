'use client'

import { createContext } from 'react'
import LangSlice from './langContext'

const AppContext = createContext({
    lang: 'no',
    switchLang: () => {},
})

export function Provider({ children }: { children: React.ReactNode }) {
    const { lang, switchLang } = LangSlice()

    return (
        <AppContext.Provider value={{ lang, switchLang }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext
