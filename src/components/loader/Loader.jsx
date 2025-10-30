function Loader(){
    return (
        <div className="h-[60px] flex items-center gap-1 z-[2]">
            <div className="h-[20px] w-[14px] rounded-full animate-loader "></div>
            <div className="h-[20px] w-[14px] rounded-full animate-loader [animation-delay:-0.2s]"></div>
            <div className="h-[20px] w-[14px] rounded-full animate-loader [animation-delay:-0.4s]"></div>
        </div>
    )
}

export default Loader;