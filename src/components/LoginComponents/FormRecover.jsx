import MessageAfterLink from "./MessageAfterLink";
import ButtonMain from "./ButtonMain";
import FormField from "./FormField";

function FormRecover({validateTheme, theme, fields}){

    const emailField = fields.filter((v) => v.type === "email")[0]
    
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
                <p className="text-[16px] mb-0 md:mb-[70px]">
                    digite seu e-mail para receber um link de verificação
                </p>
                </div>

                <form
                id="form"
                className="sm:mb-[31px] w-[100%] mb-0"
                action=""
                >
                <FormField
                    key={0}
                    value={emailField}
                    theme={theme}
                    functionTheme={validateTheme}
                />
                <ButtonMain
                    link={""}
                    marginDefault={"mt-[20px]"}
                    marginResponsive={"sm:mt-[20px]"}
                    name={"ENVIAR"}
                />
                <MessageAfterLink
                    message1={"Lembrou sua senha?"}
                    message2={"Retorne para fazer login"}
                    size={"text-[16px]"}
                    link={"/signin"}
                    flexAlign={"items-center"}
                    flexJustify={"justify-center"}
                />
                </form>
            </div>
        </div>
    )
}

export default FormRecover