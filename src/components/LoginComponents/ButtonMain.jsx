function ButtonMain({marginDefault, marginResponsive, name, operation, URL, fields, setFields, renderCardFeedbackOk, path, navigate, isChecked, setCheckColor, renderCardFeedbackError}){
    return (
        <button onClick={(event) => operation(event, {
            URL,
            fields,
            setFields,
            renderCardFeedbackOk,
            renderCardFeedbackError,
            path,
            navigate: navigate || false,
            isChecked,
            setCheckColor: setCheckColor || false
        })} 
        className={`bg-indigo-500 w-full text-slate-50 py-2 rounded-full ${marginDefault} ${marginResponsive} font-[500] sm:hover:bg-indigo-600 ease-in-out transition bg-gradient-to-tr from-teal-400 to-indigo-400`}>{name}</button>
    )
}

export default ButtonMain;