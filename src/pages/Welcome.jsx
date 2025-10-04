function Welcome({theme, validateTheme}){
    return (
        <h1 className={`text-[48px] mt-[80px] font-bold ${validateTheme(theme, "text-slate-950", "text-slate-300")}`}>Seja Bem vindo!</h1>
    )
}

export default Welcome;