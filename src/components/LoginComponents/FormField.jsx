import MessageAfterLink from "./MessageAfterLink";
import MessageAfter from "./MessageAfter";
import { useState } from "react";

function FormField({ object, theme, functionTheme, bool}) {

    const [inputValue, setInputValue] = useState("");

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

    return (
        <div id="form-field" className="flex flex-col w-[100%] sm:mb-6 mb-3">
            <label
                className={`mb-2 
                ${theme ? "text-slate-950" : "text-slate-500"}`}
                htmlFor={`${object.id}`}
            >
                {object.name}
            </label>

            <input
                className={`py-[6px] px-[10px]
                    ${functionTheme(
                        theme,
                        `bg-slate-200  ${object.placeholder === "Campo obrigatório" ? "placeholder:text-red-400" : "placeholder:text-slate-500"} text-slate-950`,
                        `bg-slate-900 border-[2px] ${object.placeholder === "Campo obrigatório" ? "placeholder:text-red-400" : "placeholder:text-slate-400"} text-slate-300`
                    )}
                    rounded-[6px] font-[500px] outline-none border-[2px] ${object.empty ? "border-red-500" : "border-slate-300"}`
                }
                pattern={object.regex}
                type={`${object.type}`}
                placeholder={object.placeholder}
                name={`${object.type}`}
                id={`${object.id}`}
                onChange={(event) => {
                    const rawValue = event.target.value;
                    const value = object.mask(rawValue, object.id);
                    setInputValue(value);
                }}
                value={inputValue}
            />

            {object.name === "Senha" ? withoutLink(bool) : null}
        </div>
    );
}

export default FormField;
