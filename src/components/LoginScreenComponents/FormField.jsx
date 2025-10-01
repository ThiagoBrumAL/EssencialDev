import MessageAfter from "./MessageAfter";

function FormField({value}){
    return (
        <div id="form-field" className="flex flex-col w-[100%] sm:mb-6 mb-3">
            <label className="mb-2" htmlFor={`${value.type}`}>{value.name}</label>

            <input className={`py-2 px-4 bg-slate-200 rounded-[6px] placeholder:text-slate-500 font-[500px] outline-none ${value.name === "Senha" ? "mb-2" : null}`} type={`${value.type}`} placeholder={value.placeholder} name={`${value.type}`} id={`${value.type}`}/>

            {value.name === "Senha" ? <MessageAfter message1={"Esqueceu sua senha?"} message2={"Clique Aqui"} size={"text-[13px]"}/> : null}
        </div>
    )
}

export default FormField;