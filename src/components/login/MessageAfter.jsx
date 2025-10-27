function MessageAfter({message1, size, padding, error}){
    return (
        <div className={`
            ${padding}
            ${error ? "mt-[20px]" : "mt-[10px]"}
        `}>
            <p 
                className={`
                    m-0
                    p-0 
                    text-slate-500 
                    font-[600] 
                    ${size}
                    font-Inter
            `}>
                {message1}
            </p>
        </div>
    )
}

export default MessageAfter;