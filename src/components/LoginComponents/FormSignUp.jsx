import MessageAfterLink from "./MessageAfterLink";
import ButtonMain from "./ButtonMain";
import FormField from "./FormField";
import TextLink from "./TextLink";

import {
    maskHeightWeightDate, 
    maskFullName, 
    maskPassword, 
    maskEmail, 
    validateInputsFields
} from "../../handlings/functions"

import { useState } from "react";

function FormSignUp({validateTheme, theme, setMessageFeedback}){

    const [isChecked, setIsChecked] = useState();
    const [checkColor, setCheckColor] = useState("text-slate-500")

    const [fields, setFields] = useState([
        { 
            name: "Nome Completo", 
            type: "text", 
            placeholder: "Insira seu nome completo", 
            link: false, 
            id:"name",
            mask: maskFullName,
            hasErrorInField: false,
            messageError: "Campo obrigatório"
        },
        { 
            name: "Altura", 
            type: "text", 
            placeholder: "Insira sua altura", 
            link: false, 
            id:"height",
            mask: maskHeightWeightDate,
            hasErrorInField: false,
            messageError: "Campo obrigatório"
        },
        { 
            name: "Data de Nascimento", 
            type: "text", 
            placeholder: "Insira sua data de nascimento", 
            link: false, 
            id:"birthday",
            mask: maskHeightWeightDate,
            hasErrorInField: false,
            messageError: "Campo obrigatório"
        },
        { 
            name: "Peso", 
            type: "text", 
            placeholder: "Insira seu peso", 
            link: false, 
            id:"weight",
            mask: maskHeightWeightDate,
            hasErrorInField: false,
            messageError: "Campo obrigatório"
        },
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
        { 
            name: "Senha", 
            type: "password", 
            placeholder: "Insira sua senha", 
            link: true, 
            id:"password",
            mask: maskPassword,
            hasErrorInField: false,
            messageError: "Campo obrigatório"
        },
    ]);

    const middle = Math.floor(fields.length/2);
    const left = fields.slice(0,middle);
    const right = fields.slice(middle);

    

    async function sendDatas(event){
        event.preventDefault();
        const newData = validateInputsFields(fields, setFields, isChecked, setCheckColor);
        console.log(newData);
        try {
            if(newData.isValid){
                let user = {};
                for(let k in newData){
                    if(k !== "isValid"){
                        user[k] = newData[k]
                    }
                }

                const response =  await fetch("https://essencial-server.vercel.app/auth/sign-up", {
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(user)
                })
                if(response.ok){
                    setMessageFeedback("Usuário foi cadastrado com sucesso!")
                    setTimeout(() => {
                        setMessageFeedback("undefined")
                    }, 5000)
                }
            }else{
                throw new Error("Invalid operation")
            }
        } catch (error) {
            console.log(error.message);
            return false;
        }
        
    }

    return (
        <div className="max-w-[694px] w-full flex flex-col items-center md:mt-[50px]">
            <div className="flex justify-center flex-col w-full">
                <div
                    className={`${validateTheme(
                        theme,
                        "text-slate-950",
                        "text-slate-500"
                    )} w-[100%]`}
                    >
                    <h1 className="font-[700] text-[28px]">
                        Faça seu login agora!
                    </h1>
                    <p className="text-[16px] mb-[20px] md:mb-[70px]">
                        Seu cuidado começa aqui. Crie sua conta em poucos passos.
                    </p>

                </div>
                <form
                id="form"
                className="sm:mb-[15px] w-[100%] flex flex-col items-center"
                action=""
                >
                    <div id="body-form" className=" w-full flex lg:flex-row flex-col lg:gap-[40px]">
                        <div className="w-full">
                        {left.map((field, index) => {
                            return (
                                <FormField
                                    key={index}
                                    object={field}
                                    theme={theme}
                                    functionTheme={validateTheme}
                                    bool={field.link ?? false}
                                    id={field.id}
                                />
                            );
                        })}
                        </div>
                        <div className="w-full">
                        {right.map((field, index) => {
                            return (
                                <FormField
                                    key={index}
                                    object={field}
                                    theme={theme}
                                    functionTheme={validateTheme}
                                    bool={field.link ?? false}
                                    id={field.id}
                                />
                            );
                        })}
                        </div>
                    </div>
                    <div className="flex gap-2 max-w-[424px] sm:mt-[50px mt-[60px] relative">
                        <input type="checkbox" id="authorized" checked={isChecked} onChange={(event) => setIsChecked(event.target.checked)} name="authorized" className="absolute top-[5px] w-4 h-4"/>
                        <label className={`p-0 m-0 inline-block text-[14px] ml-[24px] ${checkColor}`}> 
                            Ao criar sua conta, você concorda com os <TextLink message={"Termos e Condições"} link={"https://www.gov.br/esporte/pt-br/acesso-a-informacao/lgpd"}/> e nossa <TextLink message={"Política de Privacidade."} link={"https://www.gov.br/esporte/pt-br/acesso-a-informacao/lgpd"}/>
                        </label>
                    </div>
                    <div className="flex gap-2 items-start sm:w-[320px] w-[200px]">
                        <ButtonMain
                            marginDefault={"mt-[30px]"}
                            marginResponsive={"sm:mt-[90px]"}
                            name={"CADASTRAR"}
                            operation={sendDatas}
                        />
                    </div>
                </form>
            </div>

            <MessageAfterLink
                message1={"Já possui conta?"}
                message2={"Faça o seu Login"}
                size={"text-[16px]"}
                padding={"px-6"}
                link={"/sign-in"}
            />
        </div>
    )
}

export default FormSignUp;