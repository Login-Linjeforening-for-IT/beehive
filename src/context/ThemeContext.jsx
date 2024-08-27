import { createContext, useState, useEffect } from "react";

const COLOR_THEMES = {
    LIGHT: "light",
    DARK: "dark",
};

const storedTheme = localStorage.getItem("theme") || COLOR_THEMES.DARK;

const ThemeContext = createContext({
    theme: storedTheme,
    switchTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(storedTheme);

    useEffect(() => {
        document.body.classList.remove(...Object.values(COLOR_THEMES));
        document.body.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const switchTheme = () => {
        const newTheme = theme === COLOR_THEMES.DARK ? COLOR_THEMES.LIGHT : COLOR_THEMES.DARK;
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, switchTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;