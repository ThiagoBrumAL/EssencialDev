import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

function TextLink({message, link}){

    const { theme, validateTheme } = useContext(GlobalContext);

    return(
        <a href={`${link}`} target="_blank" className={`${validateTheme(theme, "text-indigo-300", "text-indigo-700")} font-[600] m-0 p-0`}>{message}</a>
    )
}

export default TextLink;