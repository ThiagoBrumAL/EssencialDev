import { createContext, useEffect, useState } from "react";


export const GlobalContext = createContext();

export function GlobalProvider({ children }){

    const [theme, setTheme] = useState(() => {
        const existingTheme = localStorage.getItem("thm");
        if(existingTheme !== null){
            return existingTheme === "true" ? true : false;
        }else return null
    });

    useEffect(() => {
        localStorage.setItem("thm", theme)
    }, [theme])

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