import MessageAfterLink from "./MessageAfterLink";
import ButtonMain from "./ButtonMain";
import FormField from "./FormField";
import { sendDatasPost } from "../../api/api.jsx";

import { useContext, useState } from "react";
import { ScreenContext } from "../../contexts/ScreenContext.jsx";
import { GlobalContext } from "../../contexts/GlobalContext.jsx";

function FormRecover(){

    const { 
        fields,
    } = useContext(ScreenContext)

    const { 
        theme, 
        validateTheme,
    } = useContext(GlobalContext)

    const [copyFields, setCopyFields] = useState(fields.filter(field => field.type === "email"))
    
    return (
        <div 
            className="
                max-w-[436px] 
                w-full 
                flex 
                flex-col 
                items-center 
                md:mt-[100px] 
                mt-[50px]
        ">
            <div 
                className="
                    flex 
                    justify-center 
                    flex-col 
                    w-full
            ">
                <div
                    className={`${
                        validateTheme(theme,"text-slate-950","text-slate-500")} 
                        w-[100%]`
                    }>

                    <h1 
                        className="
                            font-[700] 
                            text-[1.50rem]
                            font-Inter
                    ">
                        Recupere sua conta!
                    </h1>

                    <p 
                        className="
                            text-[0.95rem] 
                            mb-[20px] 
                            md:mb-[70px]
                            mt-[10px]
                            font-Inter
                    ">
                        digite seu e-mail para receber um link de verificação
                    </p>
                </div>

                <form
                    id="form"
                    className="sm:mb-[31px] w-[100%] mb-0"
                    action=""
                >
                    <FormField
                        key={copyFields[0].id}
                        object={copyFields[0]}
                        functionTheme={validateTheme}
                    />

                    <ButtonMain
                        name={"ENVIAR"}
                        operation={{sendDatasPost}}
                        URL={"https://essencial-server.vercel.app/auth/forgot-password"}
                        fields={copyFields}
                        marginTop={"mt-[0px]"}
                        setFields={setCopyFields}
                    />
                </form>
                
                <MessageAfterLink
                        message1={"Lembrou sua senha?"}
                        message2={"Retorne para fazer login"}
                        size={"text-[0.95rem]"}
                        link={"/sign-in"}
                        flexAlign={"items-center"}
                        flexJustify={"justify-center"}
                    />
            </div>
        </div>
    )
}

export default FormRecover