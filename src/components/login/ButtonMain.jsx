import { useEffect, useState } from "react";
import { useContext } from "react";
import { ScreenContext } from "../../contexts/ScreenContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useLocation, useNavigate } from "react-router-dom";

function ButtonMain({
    name, 
    operation, 
    URL, 
    fields, 
    setFields,
    isChecked,
    setCheckColor,
    marginTop 
}){

    const locale = useLocation()
    const navigate = useNavigate()
    const { renderCardFeedback } = useContext(ScreenContext)
    const { 
        theme, 
        validateTheme,
    } = useContext(GlobalContext)
    const [hoverLight, setHoverLight] = useState("sm:hover:bg-indigo-400");
    const [hoverDark, setHoverDark] = useState("sm:hover:bg-indigo-800");

    useEffect(() => {
        if(locale.pathname === "/recover"){
            fields[0].disabled ? setHoverDark("") : setHoverDark("sm:hover:bg-indigo-800")
            fields[0].disabled ? setHoverLight("") : setHoverLight("sm:hover:bg-indigo-400");
        }
    }, [locale, fields])


    return (
        <button onClick={(event) => operation.sendDatasPost(event, {
            URL,
            fields,
            setFields,
            renderCardFeedback,
            path: locale.pathname,
            navigate: navigate,
            isChecked: isChecked || null,
            setCheckColor: setCheckColor || null,
            login: operation.login
        })}

        disabled={locale.pathname === "/recover" ? fields[0].disabled : false}

        className={` 
            ${validateTheme(theme, "bg-indigo-300", "bg-indigo-700")}
            w-full 
            text-slate-50 
            py-2 
            rounded-full
            ${marginTop}
            font-[500]
            ${validateTheme(theme, `${hoverLight}`, `${hoverDark}`)}
            ease-in-out transition`
        }>
            {name}
        </button>
    )
}
export default ButtonMain;