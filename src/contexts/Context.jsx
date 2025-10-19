import { createContext, useState } from "react";
import { maskHeightWeightDate, maskFullName, maskPassword, maskEmail, } from "../handlings/functions"
import { Eye } from 'lucide-react';

export const ScreenContext = createContext();

export function ScreenProvider({ children }){

    const [theme, setTheme] = useState(true);

    const [messageFeedback, setMessageFeedback] = useState("undefined");
    const [showMessage, setShowMessage] = useState(false);
    const [colorFeedback, setColorFeedback] = useState("undefined")
    const [iconFeedback, setIconFeedback] = useState()

    const validateTheme = (theme, light, dark) => {
        return theme ? light : dark;
    }

    function renderCardFeedback(icon, indicator, message, timeout){
        setIconFeedback(icon)
        setColorFeedback(indicator)
        setShowMessage(true);
        setMessageFeedback(message);
        setTimeout(() => {
            setShowMessage(false);
        }, timeout)
    }

    const [fields, setFields] = useState([
        { 
            name: "Nome Completo", 
            type: "text", 
            placeholder: "Insira seu nome completo", 
            link: false, 
            id:"name",
            mask: maskFullName,
            hasErrorInField: false,
            messageError: "Campo obrigatório"
        },
        { 
            name: "Altura", 
            type: "text", 
            placeholder: "Insira sua altura", 
            link: false, 
            id:"height",
            mask: maskHeightWeightDate,
            hasErrorInField: false,
            messageError: "Campo obrigatório"
        },
        { 
            name: "Data de Nascimento", 
            type: "text", 
            placeholder: "Insira sua data de nascimento", 
            link: false, 
            id:"birthday",
            mask: maskHeightWeightDate,
            hasErrorInField: false,
            messageError: "Campo obrigatório"
        },
        { 
            name: "Peso", 
            type: "text", 
            placeholder: "Insira seu peso", 
            link: false, 
            id:"weight",
            mask: maskHeightWeightDate,
            hasErrorInField: false,
            messageError: "Campo obrigatório"
        },
        { 
            name: "E-mail", 
            type: "email", 
            placeholder: "Insira seu email", 
            link: false, 
            id:"email",
            mask: maskEmail,
            hasErrorInField: false,
            messageError: "Campo obrigatório",
            disabled: false
        },
        { 
            name: "Senha", 
            type: "password", 
            placeholder: "Insira sua senha", 
            link: true, 
            id:"password",
            mask: maskPassword,
            hasErrorInField: false,
            messageError: "Campo obrigatório",
            icon: Eye
        },
    ]);

    const [titles] = useState([
        {
            page: "/sign-in", 
            title:"Bem vindo(a) de volta!", 
            subTitle:"Cadastre-se e tenha sua saúde na palma da mão."
        },
        {
            page: "/sign-up", 
            title:"Estamos prontos para cuidar de você.", 
            subTitle:"Cadastre-se e tenha sua saúde na palma da mão."
        },
        {
            page: "/recover", 
            title:"Você esqueceu sua senha", 
            subTitle:"Não se apavore!"
        },
    ])

    return (
        <ScreenContext.Provider value={{
            theme, 
            setTheme,
            fields,
            setFields,
            validateTheme,
            messageFeedback,
            showMessage,
            colorFeedback,
            iconFeedback,
            renderCardFeedback,
            titles
        }}>
            {children}
        </ScreenContext.Provider>
    )

}
