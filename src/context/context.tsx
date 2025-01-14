// 'use client'

// import { createContext } from 'react'
// import ThemeSlice from '../components/shared/themetoggle/themeToggle'
// import LangSlice from './langContext'

// const AppContext = createContext({
//     theme: 'dark',
//     switchTheme: () => {},
//     lang: 'no',
//     switchLang: () => {},
// })

// export function Provider({ children }: { children: React.ReactNode }) {
//     const { theme, switchTheme } = ThemeSlice()
//     const { lang, switchLang } = LangSlice()

//     return (
//         <AppContext.Provider value={{ theme, switchTheme, lang, switchLang }}>
//             {children}
//         </AppContext.Provider>
//     )
// }

// export default AppContext
