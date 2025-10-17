import MessageAfterLink from "./MessageAfterLink";
import ButtonMain from "./ButtonMain";
import FormField from "./FormField";
import TextLink from "./TextLink";
import { sendDatasPost } from "../../api/api.jsx";
import { useState } from "react";

import { useContext } from "react";
import { ScreenContext } from "../../contexts/Context";

function FormSignUp({renderCardFeedback}){

    const [isChecked, setIsChecked] = useState(null);
    const [checkColor, setCheckColor] = useState("text-slate-500")


    const { fields, locale, theme, validateTheme } = useContext(ScreenContext)
    const [copyFields, setCopyFields] = useState(fields)

    const middle = Math.floor(copyFields.length/2);
    const left = copyFields.slice(0,middle);
    const right = copyFields.slice(middle);

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
                                    fields={copyFields}
                                    setFields={setCopyFields}
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
                                    fields={copyFields}
                                    setFields={setCopyFields}
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
                            operation={sendDatasPost}
                            URL={"https://essencial-server.vercel.app/auth/sign-up"}
                            fields={copyFields}
                            setFields={setCopyFields}
                            renderCardFeedbackOk={() => renderCardFeedback(<UserRoundCheck />, "bg-green-400", "Usuário cadastrado!", 5000)}
                            renderCardFeedbackError={renderCardFeedback}
                            isChecked={isChecked}
                            setCheckColor={setCheckColor}
                            path={locale.pathname}
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