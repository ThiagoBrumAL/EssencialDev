import { useContext } from "react";
import { OsContext } from "./OsContext";

export function useOs(){

    const context = useContext(OsContext)

    if(!context){
        throw new Error("useSsr precisa ser utilizado dentro de um SsrProvider")
    }

    return context
}