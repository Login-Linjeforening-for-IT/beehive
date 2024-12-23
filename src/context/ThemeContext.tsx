import { useEffect, useState } from "react"

export const COLOR_THEMES = {
    LIGHT: "light",
    DARK: "dark",
}

export default function ThemeContext() {
    const [theme, setTheme] = useState(COLOR_THEMES.DARK)

    useEffect(() => {
        document.body.classList.remove(...Object.values(COLOR_THEMES))
        document.body.classList.add(theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    function switchTheme() {
        setTheme((prev) =>
            prev === COLOR_THEMES.DARK ? COLOR_THEMES.LIGHT : COLOR_THEMES.DARK
        )
    }

    return { theme, switchTheme }
}
