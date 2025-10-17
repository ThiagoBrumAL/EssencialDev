import MessageAfterLink from "./MessageAfterLink";
import ButtonMain from "./ButtonMain";
import FormField from "./FormField";
import { sendDatasPost } from "../../api/api.jsx";
import { useNavigate } from "react-router-dom";
import { UserRoundCheck } from 'lucide-react';

import { useContext, useState } from "react";
import { ScreenContext } from "../../contexts/Context";

function FormSignIn({renderCardFeedback}){

    const navigate = useNavigate();
    const { fields, locale, theme, validateTheme } = useContext(ScreenContext)
    const [copyFields, setCopyFields] = useState(fields.filter(field => field.type === "password" || field.type === "email"))

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
                {
                copyFields.map((field, index) => {
                    return (
                        <FormField
                            key={index}
                            object={field}
                            functionTheme={validateTheme}
                            bool={field.link ?? false}
                            id={field.id}
                            fields={copyFields}
                            setFields={setCopyFields}
                        />
                    )
                })}
                <ButtonMain
                    marginDefault={"mt-[30px]"}
                    marginResponsive={"sm:mt-[90px]"}
                    name={"ENTRAR"}
                    operation={sendDatasPost}
                    URL={"https://essencial-server.vercel.app/auth/sign-in"}
                    fields={copyFields}
                    setFields={setCopyFields}
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