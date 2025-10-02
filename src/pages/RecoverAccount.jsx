import { useState } from "react";
import FormField from "../components/LoginComponents/FormField";
import { Lightbulb } from "lucide-react";
import ButtonTheme from "../components/LoginComponents/ButtonTheme";
import ButtonMain from "../components/LoginComponents/ButtonMain";
import MessageAfterLink from "../components/LoginComponents/MessageAfterLink";

function RecoverAccount() {
    const [fields] = useState([
        { name: "E-mail", type: "email", placeholder: "Insira seu E-mail" },
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
            )} py-6`}
        >
            <div className="h-[50%] w-full flex justify-center items-center">
            <div id="box" className="space-y-[24px]">
                <h1 className="text-slate-50 text-4xl text-left font-[700]">
                Bem vindo(a) de volta!
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
            )} w-full min-h-dvh flex items-center justify-between py-4 flex-col`}
        >
            <div className="max-w-[436px] w-full flex flex-col items-center md:mt-[100px]">
            <div className="flex justify-center flex-col w-full">
                <div
                className={`${validateTheme(
                    theme,
                    "text-slate-950",
                    "text-slate-500"
                )} w-[100%] px-6`}
                >
                <h1 className="font-[700] text-[28px]">Recupere sua conta!</h1>
                <p className="text-[16px] mb-0 md:mb-[70px]">
                    digite seu e-mail para receber um link de verificação
                </p>
                </div>

                <form
                id="form"
                className="sm:mb-[31px] w-[100%] p-6 mb-0"
                action=""
                >
                {fields.map((field, index) => {
                    return (
                    <FormField
                        key={index}
                        value={field}
                        theme={theme}
                        functionTheme={validateTheme}
                    />
                    );
                })}
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

            <div
            id="container-theme"
            className="flex flex-col gap-4 items-center mt-2 sm:gap-12 sm:flex-row"
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

export default RecoverAccount;
