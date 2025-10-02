import { Link } from "react-router-dom"

function MessageAfterLink({message1, message2, link, size, flexAlign, flexJustify}){
    return (
        <div className={`flex ${flexAlign} ${flexJustify} my-[10px]`}>
            <p className={`m-0 p-0 text-slate-500 font-[600] ${size}`}>
                {message1} <Link to={link} className={`text-indigo-700 font-[600] ${size}`}>
                    {message2}
                </Link>
                
            </p>
        </div>
    )
}

export default MessageAfterLink