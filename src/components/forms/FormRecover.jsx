//Icons
import { Eye } from 'lucide-react'

//Components
import ButtonMain from "../buttons/ButtonMain.jsx";
import FormField from "../inputs/FormField.jsx";
import { motion, AnimatePresence } from 'framer-motion'

//Hooks
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

//Context
import { useTheme } from "../../contexts/theme/useTheme.js";

//Masks
import { maskEmail } from "../../utils/masks/maskEmail.js";
import { maskPassword } from "../../utils/masks/maskPassword.js";
import { maskConfirmCode } from '../../utils/masks/maskConfirmCode.js'

//Api
import { useApi } from "../../api/api.jsx";


function FormRecover(){

    const locale = useLocation()
    const [currentLocale, setCurrentLocale] = useState(locale.pathname)
    const api = useApi();

    const [userOpacity, setUserOpacity] = useState(0);
    const [reqStatus, setReqStatus] = useState(400)

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

    const [emailField, setEmailField] = useState([

            //E-mail
            { 
    
                id: "email",
                name: "E-mail", 
                type: "email",
                originType: "text",
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

    const [confirmCodeFields, setConfirmCodesFields] = useState([

            { 
    
                id: "confirmationCode",
                name: "Digite o código", 
                type: "text",
                originType: "text",
                value: "",
                regex: "",
                link: false, 
                mask: maskConfirmCode,
                icon: null,
                disabled: false,
                placeholder: "Insira o código", 
                hasErrorInField: false,
                messageError: "Campo obrigatório",
    
            },

            { 

                id: "password",
                name: "Digite sua nova senha",
                type: "password",
                originType: "password",
                value: "",
                regex: "",
                link: false,
                mask: maskPassword,
                icon: Eye,
                disabled: false,
                placeholder: "Insira sua senha", 
                hasErrorInField: false,
                messageError: "Campo obrigatório",

            },

            { 

                id: "newPassword",
                name: "Confirme sua nova senha",
                type: "password",
                originType: "password",
                value: "",
                regex: "",
                link: false,
                mask: maskPassword,
                icon: Eye,
                disabled: false,
                placeholder: "Insira sua senha", 
                hasErrorInField: false,
                messageError: "Campo obrigatório",
            }

        ]);

    const renderConfirmCodeFields = () => {
        return (
            confirmCodeFields.map((field, index) => {
                return (
                    <FormField
                        key={index}
                        body={{
                            field,
                            fields: confirmCodeFields,
                            setFields: setConfirmCodesFields
                        }}
                    />
                )
            })
        )
    }

    const renderDefaultFields = () => {
        return (
            <FormField
                key={0}
                body={{
                    field: emailField[0],
                    fields: emailField,
                    setFields: setEmailField
                }}
            />
        )
    }

    const renderlinkAfterButton = () => {
        return (
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
        )
    }

    const renderlinkAfterButtonConfirmCode = () => {
        return (
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
                
                Caso não tenha recebido o código <button 
                onClick={() => setReqStatus(400)}
                    className={`
                        ${validateTheme(theme,"text-indigo-300", "text-indigo-700")}
                        p-0
                        m-0
                        bg-none
                        inline-block
                    `}
                >
                    clique aqui para reenviá-lo
                </button>
            </p>
        )
    }


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
                    className="
                        w-[100%] 
                        mb-0
                    "
                    action=""
                >
                    {reqStatus === 200 ? renderConfirmCodeFields() : renderDefaultFields()}
                    
                    

                    <ButtonMain
                        name={ "ENVIAR" }
                        operation={ { api } }
                        where={ currentLocale }
                        method={ "post" }

                        body={{ 
                            fields: reqStatus === 200 ? confirmCodeFields : emailField, 
                            setFields: reqStatus === 200 ? setConfirmCodesFields : setEmailField,
                            setReqStatus,
                            setCurrentLocale
                        }}
                    />
                </form>

                {reqStatus === 200 ? renderlinkAfterButtonConfirmCode() : renderlinkAfterButton()}
            </div>
        </div>
    )
}

export default FormRecover