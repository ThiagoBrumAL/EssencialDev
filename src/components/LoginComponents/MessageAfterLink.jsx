import { Link } from "react-router-dom"

import { GlobalContext } from "../../contexts/GlobalContext"
import { useContext } from "react"

function MessageAfterLink({message1, message2, link, size, flexAlign, flexJustify,error}){

    const { theme, validateTheme } = useContext(GlobalContext) 

    return (
        <div 
            className={`
                flex 
                ${flexAlign} 
                ${flexJustify} 
                ${error ? "mt-[20px]" : "mt-[10px]"}
        `}>
            <p 
                className={`
                    m-0 
                    p-0 
                    text-slate-500 
                    font-[600] 
                    ${size}
            `}>
                {message1} 
                &nbsp;
                <Link to={link} className={`${validateTheme(theme,"text-indigo-300", "text-indigo-700")} font-[600] ${size}`}>
                    {message2}
                </Link>
            </p>
        </div>
    )
}

export default MessageAfterLink