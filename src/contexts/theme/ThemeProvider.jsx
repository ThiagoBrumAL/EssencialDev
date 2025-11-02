//Hooks
import { useState, useEffect } from "react";

//Conetext
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }){

    const [theme, setTheme] = useState(() => {
        const existingTheme = localStorage.getItem("thm");
        if(existingTheme !== null){
            return existingTheme === "true" ? true : false;
        }else return null
    });

    const changeTheme = () => {
        setTheme((prev) => {
            return !prev
        });
    };

    useEffect(() => {
        localStorage.setItem("thm", theme)
    }, [theme])

    const validateTheme = (theme, light, dark) => {
        return theme ? light : dark;
    }

    return (
        <ThemeContext.Provider value={{ 
            theme, 
            setTheme,
            validateTheme,
            changeTheme
        }}>
            { children }
        </ThemeContext.Provider>
    )

}