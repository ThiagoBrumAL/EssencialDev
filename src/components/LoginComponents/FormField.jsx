import MessageAfterLink from "./MessageAfterLink";
import MessageAfter from "./MessageAfter";

function FormField({ value, theme, functionTheme, bool}) {

    function withoutLink(bool){
        return bool ? <MessageAfterLink
            message1={"Esqueceu sua senha?"}
            message2={"Clique Aqui"}
            size={"text-[13px]"}
            link={"/recover"}
            flexAlign={"items-start"}
            flexJustify={"justify-start"}
            />
            
            : 
            
            <MessageAfter 
            message1={"Deve conter pelo menos 8 Caracteres"}
            size={"text-[13px]"}
            padding={"p-0"}
            />
    }

    function onChangeInput(event){
        console.log(event.target.value);
    }


    return (
        <div id="form-field" className="flex flex-col w-[100%] sm:mb-6 mb-3">
            <label
                className={`mb-2 
                ${theme ? "text-slate-950" : "text-slate-500"}`}
                htmlFor={`${value.id}`}
            >
                {value.name}
            </label>

            <input
                className={`py-[6px] px-[10px]
                    ${functionTheme(
                        theme,
                        "bg-slate-200  placeholder:text-slate-500 text-slate-950",
                        "bg-slate-900 border-[1px] border-slate-500 placeholder:text-slate-400 text-slate-300"
                    )}
                    rounded-[6px]  font-[500px] outline-none border-[2px] border-slate-300`
                }

                type={`${value.type}`}
                placeholder={value.placeholder}
                name={`${value.type}`}
                id={`${value.id}`}
                onChange={(event) => onChangeInput(event)}
                pattern={value.regex}
            />

            {value.name === "Senha" ? withoutLink(bool) : null}
        </div>
    );
}

export default FormField;
