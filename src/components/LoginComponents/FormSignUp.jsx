import MessageAfterLink from "./MessageAfterLink";
import ButtonMain from "./ButtonMain";
import FormField from "./FormField";
import TextLink from "./TextLink";

function FormSignUp({validateTheme, theme, fields, sendDatas}){

    const middle = fields.length/2;

    const left = fields.slice(0,middle);
    const right = fields.slice(middle);

    return (
        <div className="max-w-[694px] w-full flex flex-col items-center md:mt-[100px]">
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
                                bool={field.link}
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
                                bool={field.link}
                                id={field.id}
                            />
                            );
                        })}
                        </div>
                    </div>
                    <div className="flex gap-2 max-w-[424px] sm:mt-[50px] relative">
                        <input type="checkbox" id="authorized" value="authorized" name="authorized" className="absolute top-[5px]"/>
                        <label htmlFor="authorized" className="p-0 m-0 inline-block text-[14px] text-slate-600 ml-[24px]"> 
                            Ao criar sua conta, você concorda com os <TextLink message={"Termos e Condições"} link={"https://www.gov.br/esporte/pt-br/acesso-a-informacao/lgpd"}/> e nossa <TextLink message={"Política de Privacidade."} link={"https://www.gov.br/esporte/pt-br/acesso-a-informacao/lgpd"}/>
                        </label>
                    </div>
                    <div className="flex gap-2 items-start sm:w-[320px] w-[200px]">
                        <ButtonMain
                            link={""}
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