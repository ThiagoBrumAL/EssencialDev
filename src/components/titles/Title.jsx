function Title({ path, titles }){

    return (
        <div 
            id="box" 
            className={`
                space-y-[24px] 
                sm:mb-[0px] 
                mb-[32px] 
                max-w-[420px]
                ${path === "/sign-up" ? "mt-[50px]" : "md:mt-[100px] mt-[50px]"}
        `}>
            <h1 
                className="
                    text-slate-50 
                    text-[2rem] 
                    text-left 
                    font-[700]
                    font-DmSans
            ">
                {titles.map((t) => {
                    return t.page === path ? t.title : null
                })}
            </h1>
            <h2 
                className="
                    text-slate-50 
                    text-left 
                    text-lg 
                    max-w-[380px]
                    text-[1rem]
                    font-Inter
            ">
                {titles.map((t) => {
                    return t.page === path ? t.subTitle : null
                })}
            </h2>
        </div>
    )
}

export default Title;