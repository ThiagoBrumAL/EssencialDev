import MessageAfterLink from "./MessageAfterLink";
import ButtonMain from "./ButtonMain";
import FormField from "./FormField";

function FormSignIn({theme, fields, validateTheme}){

    const newFields = fields.slice(4)

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
                {newFields.map((field, index) => {
                    return (
                    <FormField
                        key={index}
                        value={field}
                        theme={theme}
                        functionTheme={validateTheme}
                        bool={field.link}
                        id={field.id}
                    />
                    );
                })}
                <ButtonMain
                    link={""}
                    marginDefault={"mt-[30px]"}
                    marginResponsive={"sm:mt-[90px]"}
                    name={"ENTRAR"}
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