import { useTheme } from "../../contexts/Theme/useTheme";

function TextLink({message, link}){

    const { theme, validateTheme } = useTheme()

    return(
        <a href={`${link}`} target="_blank" className={`${validateTheme(theme, "text-indigo-300", "text-indigo-700")} font-[600] m-0 p-0`}>{message}</a>
    )
}

export default TextLink;