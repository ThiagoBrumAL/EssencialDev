function ButtonTheme({theme, changeTheme}){
    return (
        <button 
            onClick={() => changeTheme()} 
            id="button-theme" 
            className="
                w-[40px] 
                h-[20px] 
                bg-slate-500 
                rounded-full 
                relative
        ">
            <div 
                id="circle" 
                className={`
                    w-[14px] 
                    h-[14px] 
                    bg-slate-300 
                    rounded-full 
                    absolute 
                    top-[3px] 
                    bottom-[3px] 
                    ${theme ? "translate-x-[3px]" : "translate-x-[23px]"} 
                    duration-500 
                    ease-in-out
            `}>
            </div>
        </button>
    )
}

export default ButtonTheme;