function Loader({ theme, validateTheme }){
    return (
        <div
            id="login-screen"
            className={`
                w-full 
                min-h-dvh 
                flex 
                md:flex-row 
                flex-col 
                overflow-x-hidden
                overflow-y-hidden
                ${validateTheme(theme,"bg-slate-50","bg-slate-900")}
        `}>
            <div className="h-[60px] flex items-center gap-1 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[2]">
                <div className="h-[20px] w-[14px] rounded-full animate-loader "></div>
                <div className="h-[20px] w-[14px] rounded-full animate-loader [animation-delay:-0.2s]"></div>
                <div className="h-[20px] w-[14px] rounded-full animate-loader [animation-delay:-0.4s]"></div>
            </div>
        </div>
    )
}

export default Loader;