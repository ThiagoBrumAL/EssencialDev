import { Link } from "react-router-dom"

import { useTheme } from "../../contexts/theme/useTheme";

function MessageAfterLink({ message1, message2, link, error }){

    const { theme, validateTheme } = useTheme()

    return (
        <div 
            className={`
                flex 
                items-start
                justify-center
                w-full
                ${!error ? "mt-[8px]" : "mt-[3px]"}
        `}>
            <p 
                className={`
                    m-0 
                    p-0 
                    text-slate-500 
                    font-[600] 
                    text-[0.80rem]
                    font-Inter
                    w-full
            `}>
                {message1} 
                &nbsp;
                <Link to={link} className={`${validateTheme(theme,"text-indigo-300", "text-indigo-700")}`}>
                    {message2}
                </Link>
            </p>
        </div>
    )
}

export default MessageAfterLink