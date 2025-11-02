function CardFeedback({ object, theme }){
    
    return (
        <div 
            className={`
                fixed 
                flex 
                items-center 
                right-0 ${object.show ? "translate-x-[-24px] pr-[12px] opacity-100" : "translate-x-full p-0 opacity-0"} 
                ${theme ? "bg-indigo-200" : "bg-slate-700"} 
                transition 
                transform 
                ease-in-out 
                duration-700 
                rounded-md 
                text-slate-50 
                shadow-md
                mt-[24px]
        `}>
            <div 
                className={` 
                    ${object.color} 
                    rounded-tl-[4px] 
                    rounded-bl-[4px] 
                    flex 
                    items-center 
                    justify-center
                    px-[6px]
                    py-[12px]
            `}>
                {object.icon}
            </div>

            <h1 
                className="
                    ml-[12px] 
                    sm:text-[16px] 
                    text-[12px]
                    font-[600] 
                    font-Inter
            ">
                {object.message}
            </h1>
        </div>
    )
}

export default CardFeedback;