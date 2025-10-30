function MessageAfter({ message1, error }){
    return (
        <div className={`
            p-0
            ${error ? "mt-[20px]" : "mt-[10px]"}
        `}>
            <p 
                className={`
                    m-0
                    p-0 
                    text-slate-500 
                    font-[600] 
                    text-[0.80rem]
                    font-Inter
            `}>
                {message1}
            </p>
        </div>
    )
}

export default MessageAfter;