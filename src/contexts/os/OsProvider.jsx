//Hooks
import { useState } from "react";

//Context
import { OsContext } from "./OsContext";

export function OsProvider({ children }){

    const currentOs = navigator.userAgent.includes("Windows");

    const [isWindows, setIsWindows] = useState(currentOs)

    return (
        <OsContext.Provider value={{
            isWindows
        }}>
            {children}
        </OsContext.Provider>
    )

}
