//Components
import ButtonMain from "../buttons/ButtonMain.jsx";
import FormField from "../inputs/FormField.jsx";

//Hooks
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

//Context
import { useTheme } from "../../contexts/theme/useTheme.js";

//Masks
import { maskEmail } from "../../utils/masks/maskEmail.js";

//Api
import { useApi } from "../../api/api.jsx";


function FormRecover(){

    const locale = useLocation()
    const api = useApi();

    const [userOpacity, setUserOpacity] = useState(0);

    useEffect(() => {
        if(locale.pathname === "/recover") setUserOpacity(1)
    }, [locale.pathname])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [locale.pathname])

    const { 
        theme, 
        validateTheme,
    } = useTheme()

    const [fields, setFields] = useState([

            //E-mail
            { 
    
                id: "email",
                name: "E-mail", 
                type: "email",
                value: "",
                regex: "",
                link: false, 
                mask: maskEmail,
                icon: null,
                disabled: false,
                placeholder: "Insira seu email", 
                hasErrorInField: false,
                messageError: "Campo obrigatório",
    
            },

        ]);
    
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
                        field={fields[0]}
                        fields={fields}
                        setFields={setFields}
                    />

                    <ButtonMain
                        name={ "ENVIAR" }
                        operation={ { api } }
                        where={ locale.pathname }
                        method={ "post" }

                        body={{ 
                            fields, 
                            setFields,
                        }}
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