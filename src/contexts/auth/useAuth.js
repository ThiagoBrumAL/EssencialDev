import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth(){

    const context = useContext(AuthContext)

    if(!context){
        throw new Error("useAuth precisa ser utilizado dentro de um AuthProvider")
    }

    return context
}