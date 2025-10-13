function CardFeedback({object, theme}){

    return (
        <div className={`fixed flex items-center right-0 ${object.show ? "translate-x-[-24px] pr-[12px] opacity-100" : "translate-x-full p-0 opacity-0"} ${theme ? "bg-indigo-200" : "bg-slate-700"} transition transform ease-in-out duration-700 rounded-md text-slate-50 shadow-md`}>
            <div className={` ${object.color} h-[50px] w-[40px] rounded-tl-[4px] rounded-bl-[4px] flex items-center justify-center`}>
                {object.icon}
            </div>
            <h1 className="ml-[12px]">{object.message}</h1>
        </div>
    )
}

export default CardFeedback;