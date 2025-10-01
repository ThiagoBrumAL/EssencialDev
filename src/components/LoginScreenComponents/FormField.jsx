import MessageAfter from "./MessageAfter";

function FormField({value, theme}){
    return (
        <div id="form-field" className="flex flex-col w-[100%] sm:mb-6 mb-3">
            <label className={`mb-2 ${theme ? "text-slate-950" : "text-slate-500"}`} htmlFor={`${value.type}`}>{value.name}</label>

            <input className={`py-2 px-4 ${theme ? "bg-slate-200  placeholder:text-slate-500" : "bg-slate-900 border-[1px] border-slate-500 placeholder:text-slate-400"} rounded-[6px]  font-[500px] outline-none ${value.name === "Senha" ? "mb-2" : null}`} type={`${value.type}`} placeholder={value.placeholder} name={`${value.type}`} id={`${value.type}`}/>

            {value.name === "Senha" ? <MessageAfter message1={"Esqueceu sua senha?"} message2={"Clique Aqui"} size={"text-[13px]"}/> : null}
        </div>
    )
}

export default FormField;