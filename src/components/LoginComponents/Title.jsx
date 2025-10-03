function Title({path, titles}){

    return (
        <div id="box" className="space-y-[24px]">
        <h1 className="text-slate-50 text-4xl text-left font-[700]">
            {titles.map((t) => {
                return t.page === path ? t.title : null
            })}
        </h1>
        <h2 className="text-slate-50 text-left text-lg max-w-[380px]">
            {titles.map((t) => {
                return t.page === path ? t.subTitle : null
            })}
        </h2>
    </div>
    )
}

export default Title;