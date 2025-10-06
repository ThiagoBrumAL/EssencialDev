function ButtonMain({marginDefault, marginResponsive, name, operation}){
    return (
        <button onClick={(event) => operation(event)} className={`bg-indigo-500 w-full text-slate-50 py-2 rounded-full ${marginDefault} ${marginResponsive} font-[500] sm:hover:bg-indigo-600 ease-in-out transition`}>{name}</button>
    )
}

export default ButtonMain;