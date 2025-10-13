import MessageAfterLink from "./MessageAfterLink";
import ButtonMain from "./ButtonMain";
import FormField from "./FormField";
import { useState } from "react";
import { maskPassword, maskEmail } from "../../handlings/functions"
import { sendDatasPost } from "../../api/api.jsx";
import { useNavigate } from "react-router-dom";
import { UserRoundCheck } from 'lucide-react';

function FormSignIn({theme, validateTheme, renderCardFeedback, locale}){

    const navigate = useNavigate();

    const [fields, setFields] = useState([
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
                    <h1 className="font-[700] text-[28px]">
                        Faça seu login agora!
                    </h1>
                    <p className="text-[16px] mb-[20px] md:mb-[70px]">
                        Deixe seus exames em dia.
                    </p>
                </div>
                <form
                id="form"
                className="sm:mb-[31px] w-[100%] flex flex-col items-center"
                action=""
                >
                {fields.map((field, index) => {
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
                <ButtonMain
                    marginDefault={"mt-[30px]"}
                    marginResponsive={"sm:mt-[90px]"}
                    name={"ENTRAR"}
                    operation={sendDatasPost}
                    URL={"https://essencial-server.vercel.app/auth/sign-in"}
                    fields={fields}
                    setFields={setFields}
                    renderCardFeedbackOk={() => renderCardFeedback(<UserRoundCheck />, "bg-green-400", "Usuário autorizado", 5000)}
                    renderCardFeedbackError={renderCardFeedback}
                    path={locale.pathname}
                    navigate={navigate}
                />
                </form>
            </div>

            <MessageAfterLink
                message1={"Não possui conta?"}
                message2={"Faça o seu Cadastro"}
                size={"text-[16px]"}
                link={"/sign-up"}
                flexAlign={"items-center"}
                flexJustify={"justify-center"}
            />
        </div>
    )
}

export default FormSignIn