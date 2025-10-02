function MessageAfter({message1, size, padding}){
    return (
        <div className={`${padding}`}>
            <p className={`m-0 p-0 text-slate-500 font-[600] mt-[0px] ${size}`}>
                {message1}
            </p>
        </div>
    )
}

export default MessageAfter;