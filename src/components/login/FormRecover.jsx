import MessageAfterLink from "./MessageAfterLink";
import ButtonMain from "./ButtonMain";
import FormField from "./FormField";
import { sendDatasPost } from "../../api/api.jsx";

import { useContext, useState, useEffect } from "react";
import { ScreenContext } from "../../contexts/ScreenContext.jsx";
import { GlobalContext } from "../../contexts/GlobalContext.jsx";

import { useLocation, Link } from "react-router-dom";

function FormRecover(){

    const locale = useLocation()

    const [userOpacity, setUserOpacity] = useState(0);

    useEffect(() => {
        if(locale.pathname === "/recover") setUserOpacity(1)
    }, [locale.pathname])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    })

    const { 

        fields,

    } = useContext(ScreenContext)

    const { 

        theme, 

        validateTheme,

    } = useContext(GlobalContext)

    const [recoverField, setRecoverField] = useState(fields.filter(field => field.type === "email"))
    
    return (
        <div 
            style={{ opacity: userOpacity }}
            className="
                max-w-[436px] 
                w-full 
                flex 
                flex-col 
                items-center 
                md:mt-[100px] 
                mt-[50px]
                transition
                ease-in-out
                duration-700
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
                    className="w-[100%] mb-0"
                    action=""
                >
                    <FormField
                        key={0}
                        field={recoverField[0]}
                        fields={recoverField}
                        setFields={setRecoverField}
                    />

                    <ButtonMain
                        name={"ENVIAR"}
                        operation={{sendDatasPost}}
                        URL={"https://essencial-server.vercel.app/auth/forgot-password"}
                        fields={recoverField}
                        marginTop={"mt-[0px]"}
                        setFields={setRecoverField}
                    />
                </form>

                <p 
                    className={`
                        m-0 
                        p-0 
                        text-slate-500 
                        font-[600] 
                        text-[0.90rem]
                        font-Inter
                        text-center
                        mt-[24px]
                        mb-[36px]
                `}>
                    Lembrou sua senha?
                    &nbsp;
                    <Link to={"/sign-in"} className={`${validateTheme(theme,"text-indigo-300", "text-indigo-700")}`}>
                        Retorne para fazer login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default FormRecover