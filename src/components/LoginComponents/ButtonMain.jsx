import { useEffect, useState } from "react";
import { useContext } from "react";
import { ScreenContext } from "../../contexts/Context";

function ButtonMain({
    marginDefault, 
    marginResponsive, 
    name, 
    operation, 
    URL, 
    fields, 
    setFields, 
    renderCardFeedbackOk, 
    path, 
    navigate, 
    isChecked, 
    setCheckColor, 
    renderCardFeedbackError, 
}){


    const { theme, validateTheme } = useContext(ScreenContext)
    const [hoverLight, setHoverLight] = useState("sm:hover:bg-indigo-400");
    const [hoverDark, setHoverDark] = useState("sm:hover:bg-indigo-800");

    useEffect(() => {
        if(path === "/recover"){
            if(fields[0].disabled){
                setHoverDark("")
                setHoverLight("")
            }else{
                setHoverLight("sm:hover:bg-indigo-400");
                setHoverDark("sm:hover:bg-indigo-800");
            }
        }
    }, [path, fields])


    return (
        <button onClick={(event) => operation(event, {
            URL,
            fields,
            setFields,
            renderCardFeedbackOk,
            renderCardFeedbackError,
            path,
            navigate: navigate || false,
            isChecked,
            setCheckColor: setCheckColor || false,
        })}

        disabled={path === "/recover" ? fields[0].disabled : false}
        className={` 
            ${validateTheme(theme, "bg-indigo-300", "bg-indigo-700")}
            w-full 
            text-slate-50 
            py-2 
            rounded-full
            ${marginDefault}
            ${marginResponsive}
            font-[500]
            ${validateTheme(theme, `${hoverLight}`, `${hoverDark}`)}
            ease-in-out transition`
        }>
            {name}
        </button>
    )
}
export default ButtonMain;