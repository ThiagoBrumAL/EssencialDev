import MessageAfterLink from "./MessageAfterLink";
import ButtonMain from "./ButtonMain";
import FormField from "./FormField";
import { maskEmail } from "../../handlings/functions"
import { useState } from "react";

import { validateEmail } from "../../handlings/functions"

function FormRecover({validateTheme, theme, }){

    const [field, setField] = useState(
        { 
            name: "E-mail", 
            type: "email", 
            placeholder: "Insira seu email", 
            link: false, 
            id:"email",
            mask: maskEmail,
            hasErrorInField: false,
            messageError: "Campo obrigatório"
        },
    );

    function validateInputField(){
        let data = {};
        let newField = field;
        const input = document.getElementById(`email`);

        if(!(input.value.trim())){
            newField = {...field, hasErrorInField: true}
        }else{
            newField = validateEmail(input.value, field);
        }

        setField(newField)
        return data;
    }

    async function sendDatas(event){
        event.preventDefault();
        const newData = validateInputField();

        try {
            // const response =  await fetch("https://essencial-server.vercel.app/auth/sign-up", {
            //     method: "POST",
            //     headers: {"Content-type": "application/json"},
            //     body: JSON.stringify(newData)
            // })
            // if(response.ok) console.log(data)
            console.log(newData);
        } catch (error) {
            console.log(error.message);
            return false;
        }
        
    }
    
    return (
        <div className="max-w-[436px] w-full flex flex-col items-center md:mt-[100px]">
            <div className="flex justify-center flex-col w-full">
                <div
                className={`${validateTheme(
                    theme,
                    "text-slate-950",
                    "text-slate-500"
                )} w-[100%]`}
                >
                <h1 className="font-[700] text-[28px]">Recupere sua conta!</h1>
                <p className="text-[16px] mb-[20px] md:mb-[70px]">
                    digite seu e-mail para receber um link de verificação
                </p>
                </div>

                <form
                id="form"
                className="sm:mb-[31px] w-[100%] mb-0"
                action=""
                >
                <FormField
                    key={field.id}
                    object={field}
                    theme={theme}
                    functionTheme={validateTheme}
                />
                <ButtonMain
                    link={""}
                    marginDefault={"mt-[20px]"}
                    marginResponsive={"sm:mt-[20px]"}
                    name={"ENVIAR"}
                    operation={sendDatas}
                />
                <MessageAfterLink
                    message1={"Lembrou sua senha?"}
                    message2={"Retorne para fazer login"}
                    size={"text-[16px]"}
                    link={"/sign-in"}
                    flexAlign={"items-center"}
                    flexJustify={"justify-center"}
                />
                </form>
            </div>
        </div>
    )
}

export default FormRecover