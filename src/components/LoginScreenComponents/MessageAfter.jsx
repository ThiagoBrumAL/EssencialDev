function MessageAfter({message1, message2, link, size, padding, id}){

    console.log(size);
    return (
        <div className={`${padding}`}>
            <p id={id} className={`m-0 p-0 text-slate-500 font-[600] ${size}`}>
                {message1} <a href={`${link}`} className={`text-indigo-700 font-[600] ${size}`}>{message2}</a>
            </p>
        </div>
    )
}

export default MessageAfter