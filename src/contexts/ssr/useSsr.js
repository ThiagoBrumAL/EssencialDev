import { useContext } from "react";
import { SsrContext } from "./SsrContext";

export function useSsr(){

    const context = useContext(SsrContext)

    if(!context){
        throw new Error("useSsr precisa ser utilizado dentro de um SsrProvider")
    }

    return context
}