import { useState } from "react";
import FormField from "../components/LoginComponents/FormField";
import { Lightbulb } from "lucide-react";
import ButtonTheme from "../components/LoginComponents/ButtonTheme";
import ButtonMain from "../components/LoginComponents/ButtonMain";
import MessageAfterLink from "../components/LoginComponents/MessageAfterLink";
import TextLink from "../components/LoginComponents/TextLink";

function SignUp() {

    const [fieldsRight] = useState([
        {name: "Nome Completo",type: "text",placeholder: "Insira seu nome completo", link: false},
        {name: "Data de Nascimento",type: "text",placeholder: "Insira sua data de nascimento", link: false},
        { name: "E-mail", type: "email", placeholder: "Insira seu e-mail", link: false },
    ]);

    const [fieldsLeft] = useState([
        { name: "Altura", type: "text", placeholder: "Insira sua altura", link: false},
        { name: "Peso", type: "text", placeholder: "Insira seu peso", link: false},
        { name: "Senha", type: "password", placeholder: "Insira sua senha", link: false},
    ]);

    const [theme, setTheme] = useState(true);
    const changeTheme = () => {
        setTheme((prev) => !prev);
    };

    function validateTheme(theme, light, dark) {
        return theme ? light : dark;
    }

    return (
        <div
        id="login-screen"
        className="w-full min-h-dvh flex md:flex-row flex-col"
        >
        <section
            id="login-screen-section-one"
            className={` hidden sm:block w-full min-h-full bg-gradient-to-tr ${validateTheme(
            theme,
            "from-indigo-400 to-indigo-300",
            "from-slate-950 to-slate-800"
            )} p-[24px]`}
        >
            <div className="h-[50%] w-full flex justify-center items-center">
                <div id="box" className="space-y-[24px]">
                    <h1 className="text-slate-50 text-4xl text-left font-[700] max-w-[473px]">
                        Estamos prontos para cuidar de você.
                    </h1>
                    <h2 className="text-slate-50 text-left text-lg max-w-[380px]">
                        Cadastre-se e tenha sua saúde na palma da mão.
                    </h2>
                </div>
            </div>

            <div className="h-[50%] w-full flex justify-center ">
                <img
                    id="logo"
                    className="max-h-[180px] max-w-[242px]"
                    src="/Vector.png"
                    alt=""
                />
            </div>
        </section>

        <section
            id="login-screen-div-two"
            className={`${validateTheme(
            theme,
            "bg-slate-50",
            "bg-slate-900"
            )} w-full min-h-dvh flex items-center justify-between py-4 flex-col p-[24px]`}
        >
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
                    <p className="text-[16px] mb-0 md:mb-[70px]">
                        Seu cuidado começa aqui. Crie sua conta em poucos passos.
                    </p>

                </div>
                <form
                id="form"
                className="sm:mb-[15px] w-[100%] flex flex-col items-center"
                action=""
                >
                    <div id="body-form" className=" w-full flex lg:flex-row flex-col lg:gap-[40px] gap-[20px]">
                        <div className="w-full">
                        {fieldsRight.map((field, index) => {
                            return (
                            <FormField
                                key={index}
                                value={field}
                                theme={theme}
                                functionTheme={validateTheme}
                                bool={field.link}
                            />
                            );
                        })}
                        </div>
                        <div className="w-full">
                        {fieldsLeft.map((field, index) => {
                            return (
                            <FormField
                                key={index}
                                value={field}
                                theme={theme}
                                functionTheme={validateTheme}
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
                        />
                    </div>
                </form>
            </div>

            <MessageAfterLink
                message1={"Já possui conta?"}
                message2={"Faça o seu Login"}
                size={"text-[16px]"}
                padding={"px-6"}
                link={"/signin"}
            />
            </div>
            <div
            id="container-theme"
            className="flex flex-col gap-4 items-center sm:gap-12 sm:flex-row"
            >
            <div className="flex gap-1 items-center">
                <Lightbulb className={`m-0 p-0 text-slate-500 font-[500] `} />

                <p className="m-0 p-0 text-slate-500 font-[500]">
                {validateTheme(theme, "Modo escuro", "Modo claro")}
                </p>
            </div>
            <div className="flex items-center">
                <ButtonTheme theme={theme} changeTheme={changeTheme} />
            </div>
            </div>
        </section>
        </div>
    );
}

export default SignUp;
