import { useContext } from "react";
import { appointmentContext } from "./appointmentContext";

export function useAppointment(){

    const context = useContext(appointmentContext)

    if(!context){
        throw new Error("useSsr precisa ser utilizado dentro de um SsrProvider")
    }

    return context
}