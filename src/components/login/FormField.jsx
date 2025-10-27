import MessageAfterLink from "./MessageAfterLink";
import MessageAfter from "./MessageAfter";
import { useState } from "react";
import { Eye, EyeClosed  } from 'lucide-react';

import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

function FormField({ 
    object, 
    fields, 
    setFields
}) {

    const { 
        theme, 
        validateTheme,
    } = useContext(GlobalContext)

    const [inputValue, setInputValue] = useState("");

    function withoutLink(){
        return object.link ? 
        
        <MessageAfterLink
            message1={"Esqueceu sua senha?"}
            message2={"Clique Aqui"}
            size={"text-[0.80rem]"}
            link={"/recover"}
            flexAlign={"items-start"}
            flexJustify={"justify-start"}
            error={object.hasErrorInField}
        />
            : 
        <MessageAfter 
            message1={"Deve conter pelo menos 8 Caracteres"}
            size={"text-[0.75rem]"}
            padding={"p-0"}
            error={object.hasErrorInField}
        />
    }

    return (
        <div 
            id="form-field" 
            className="
                flex 
                flex-col 
                w-[100%] 
                h-[94px] 
                sm:mb-6 
                mb-3 
                relative
        ">
            <label
                className={`
                    mb-2 
                    ${validateTheme(theme, "text-slate-950","text-slate-500")}
                    font-Inter
                    font-normal
                    text-[0.95rem]
                `}
                htmlFor={`${object.id}`}
            >
                {object.name}
            </label>

            <input
                className={`
                    py-[6px] 
                    px-[10px]
                    ${validateTheme(
                        theme,
                        `bg-slate-200  ${object.placeholder === "Campo obrigatório" ? "placeholder:text-red-400" : "placeholder:text-slate-500"} text-slate-950`,
                        `bg-slate-900 border-[2px] ${object.placeholder === "Campo obrigatório" ? "placeholder:text-red-400" : "placeholder:text-slate-400"} text-slate-300`
                    )}
                    rounded-[6px]
                    outline-none 
                    border-[2px] 
                    font-Inter
                    text-[0.95rem]
                    ${object.hasErrorInField ? "border-red-500" : "border-[#B5B5BD]"}
                `}
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

            <p className={`absolute left-0 bottom-[2px] text-[0.85rem] font-Inter text-red-500`}>{object.hasErrorInField ? object.messageError : null}</p>

            <div className="absolute top-10 right-4">
                <button onClick={(event) => {
                    event.preventDefault();
                    if(object.name === "Senha"){
                        fields = fields.map((input) => {
                            if(input.name === "Senha" && input.type === "password") return {...input, type: "text", icon: EyeClosed}
                            if(input.name === "Senha" && input.type === "text") return {...input, type: "password", icon: Eye}
                            return {...input}
                        })

                        setFields(fields)
                    }
                }}>
                    {object.icon && <object.icon color={validateTheme(theme, "#7A828A", "#EDF2F7")}/>}
                </button>
            </div>
            
            {object.name === "Senha" ? withoutLink() : null}
        </div>
    );
}

export default FormField;
