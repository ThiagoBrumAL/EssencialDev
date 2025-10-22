import { createContext, useState } from "react";


export const GlobalContext = createContext();

export function GlobalProvider({ children }){

    const [theme, setTheme] = useState(() => {
        const localTheme = localStorage.getItem("theme");
        return localTheme
    });

    const validateTheme = (theme, light, dark) => {
        return theme ? light : dark;
    }

    return (
        <GlobalContext.Provider value={{ 
            theme, 
            setTheme,
            validateTheme
        }}>
            { children }
        </GlobalContext.Provider>
    )
} 