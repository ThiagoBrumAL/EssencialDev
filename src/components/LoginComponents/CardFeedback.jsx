function CardFeddback({message}){
    return (
        <div className={`absolute right-0 ${message ? "translate-x-[-24px] p-[12px]" : "translate-x-full p-0"} transition transform ease duration-700 bg-indigo-300 rounded-md text-slate-50`}>
            <h1>{message}</h1>
        </div>
    )
}

export default CardFeddback;