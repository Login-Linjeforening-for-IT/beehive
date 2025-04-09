import { useEffect, useState } from 'react'

export default function useDarkModeObserver() {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const darkClassExists = document.documentElement.classList.contains('dark')
        setIsDark(darkClassExists)

        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'))
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        })

        return () => observer.disconnect()
    }, [])

    return isDark
}
