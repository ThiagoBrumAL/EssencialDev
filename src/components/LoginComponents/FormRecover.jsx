import MessageAfterLink from "./MessageAfterLink";
import ButtonMain from "./ButtonMain";
import FormField from "./FormField";
import { useState } from "react";
import { Send } from 'lucide-react';
import { maskEmail } from "../../handlings/functions"
import { sendDatasPost } from "../../api/api.jsx";

function FormRecover({validateTheme, theme, renderCardFeedback, locale}){

    const [fields, setFields] = useState([
        { 
            name: "E-mail", 
            type: "email", 
            placeholder: "Insira seu email", 
            link: false, 
            id:"email",
            mask: maskEmail,
            hasErrorInField: false,
            messageError: "Campo obrigatório",
            disabled: false
        },
    ]);
    
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
                    key={fields[0].id}
                    object={fields[0]}
                    theme={theme}
                    functionTheme={validateTheme}
                />
                <ButtonMain
                    link={""}
                    marginDefault={"mt-[20px]"}
                    marginResponsive={"sm:mt-[20px]"}
                    name={"ENVIAR"}
                    operation={sendDatasPost}
                    URL={"https://essencial-server.vercel.app/auth/forgot-password"}
                    fields={fields}
                    setFields={setFields}
                    renderCardFeedbackOk={() => renderCardFeedback(<Send />, "bg-green-400", "Messagem enviada com sucesso", 5000)}
                    renderCardFeedbackError={renderCardFeedback}
                    path={locale.pathname}
                    validateTheme={validateTheme}
                    theme={theme}
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