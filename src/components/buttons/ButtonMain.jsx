import { useEffect, useState } from "react";

import { useTheme } from "../../contexts/Theme/useTheme";
import { useLocation } from "react-router-dom";

function ButtonMain({
    name, 
    operation,
    where,
    method,

    body,
}){

    const locale = useLocation()

    const { 
        theme, 
        validateTheme,
    } = useTheme()
    
    const [hoverLight, setHoverLight] = useState("sm:hover:bg-indigo-400");
    const [hoverDark, setHoverDark] = useState("sm:hover:bg-indigo-800");

    useEffect(() => {
        if(locale.pathname === "/recover"){
            body.fields[0].disabled ? setHoverDark("") : setHoverDark("sm:hover:bg-indigo-800")
            body.fields[0].disabled ? setHoverLight("") : setHoverLight("sm:hover:bg-indigo-400");
        }
    }, [locale.pathname, body.fields])

    return (

        <button onClick={(event) => {

            event.preventDefault();
            operation.api(method, where, body)
            
        }}

        disabled={locale.pathname === "/recover" ? body.fields[0].disabled : false}

        className={` 
            ${validateTheme(theme, "bg-indigo-300", "bg-indigo-700")}
            w-full 
            text-slate-50 
            py-2 
            rounded-full
            mt-[40px]
            font-[500]
            ${validateTheme(theme, `${hoverLight}`, `${hoverDark}`)}
            ease-in-out transition`
        }>
            {name}
        </button>
    )
}
export default ButtonMain;