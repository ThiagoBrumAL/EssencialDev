import MessageAfterLink from "../inputs/MessageAfterLink";
import MessageAfter from "../inputs/MessageAfter";
import { Eye, EyeClosed  } from 'lucide-react';

import { useTheme } from "../../contexts/theme/useTheme";
import { handlingInput } from '../../utils/errors/handlers/handlingInput'

function FormField({ 

    field, // field refere-se ao campo atual que está chamando o componente
    fields, // Fields são todos os campos.
    setFields // Função para trocar o valor do state fields

}) {

    const { 

        theme, // Estado (State) que contém qual é o tema que está sendo utilizado pelo usuário.

        validateTheme, // Função que valida e troca o tema.

    } = useTheme() // useContext é um hook utilizado para transmitir informações para outros componentes sem o uso de props. Dentro dele você deve indicar qual contexto irá ser utilizado.


    return (
        <div 
            id="form-field" 
            className="
                flex 
                flex-col 
                w-[100%] 
                h-[94px]
                mb-[24px]
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
                htmlFor={`${field.id}`}
            >
                {field.name}
            </label>

            <input
                className={`
                    py-[6px] 
                    px-[10px]
                    ${validateTheme(
                        theme,
                        `bg-slate-200  placeholder:text-slate-500 text-slate-950`,
                        `bg-slate-900 border-[2px] placeholder:text-slate-400 text-slate-300`
                    )}
                    rounded-[6px]
                    outline-none 
                    border-[2px] 
                    font-Inter
                    text-[0.95rem]
                    ${field.hasErrorInField ? "mb-[3px]" : "mb-[0px]"}
                    ${field.hasErrorInField ? "border-red-500" : "border-[#B5B5BD]"}
                `}

                pattern={field.regex}
                
                type={`${field.type}`}

                placeholder={field.placeholder}

                name={`${field.name}`}

                id={`${field.id}`}

                value={fields.find(f => f.id === field.id)?.value || ""}

                onChange={(e) => {
                    const rawValue = e.target.value;
                    const maskedValue = field.mask(rawValue, field.id);

                    const updatedFields = fields.map(f => f.id === field.id ? { ...f, value: maskedValue } : f)
                    const validatedFields = handlingInput(updatedFields)

                    setFields(validatedFields)
                }}
            />

            <div className={`
                relative
            `}>
                <p className={`
                    block 
                    left-0
                    text-[0.825rem] 
                    font-Inter 
                    text-red-500
                    top-full
                    ${field.hasErrorInField ? "opacity-100" : "opacity-0"}
                `}>
                    {field.hasErrorInField ? field.messageError : null}
                </p>
            </div>

            <div className="
                absolute 
                top-10 
                right-4
            ">

                <button onClick={(event) => {

                    event.preventDefault();

                    if(field.name === "Senha"){

                        setFields(fields.map(((field) => {

                            if(field.name === "Senha" && field.type === "password") return {...field, type: "text", icon: EyeClosed}
                            
                            if(field.name === "Senha" && field.type === "text") return {...field, type: "password", icon: Eye}

                            return {...field}
                        })))
                        
                    }
                }}>

                    {field.icon && <field.icon color={validateTheme(theme, "#7A828A", "#EDF2F7")}/>}

                </button>

            </div>
            
            {field.name === "Senha" ? (field.link ? <MessageAfterLink
                    message1={"Esqueceu sua senha?"}
                    message2={"Clique Aqui"}
                    link={"/recover"}
                    error={field.hasErrorInField}
                /> : <MessageAfter 
                    message1={"Deve conter pelo menos 8 Caracteres"}
                    error={field.hasErrorInField}
                />) : null}
        </div>
    );
}

export default FormField;
