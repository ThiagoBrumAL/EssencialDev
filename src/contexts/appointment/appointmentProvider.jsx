//Hooks
import { useState } from "react";

//Context
import { appointmentContext } from "./appointmentContext";


export function AppointmentProvider({ children }){

    const [nameAppt, setNameAppt] = useState(null);
    
    return (
        <appointmentContext.Provider value={{
            nameAppt,
            setNameAppt
        }}>
            {children}
        </appointmentContext.Provider>
    )

}
