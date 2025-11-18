function SmallLoader(){
    return (
        <div className="h-[46px] flex items-center gap-1 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="h-[20px] w-[9px] rounded-full animate-smallLoader "></div>
            <div className="h-[20px] w-[9px] rounded-full animate-smallLoader [animation-delay:-0.2s]"></div>
            <div className="h-[20px] w-[9px] rounded-full animate-smallLoader [animation-delay:-0.4s]"></div>
        </div>
    )
}

export default SmallLoader;