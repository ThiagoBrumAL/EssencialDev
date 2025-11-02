import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export function useTheme(){

    const context = useContext(ThemeContext)

    if(!context){
        throw new Error("useTheme precisa ser utilizado dentro de um ThemeProvider")
    }

    return context
}