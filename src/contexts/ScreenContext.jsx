import { createContext, useState } from "react";
import { maskHeightWeightDate, maskFullName, maskPassword, maskEmail, } from "../handlings/functions"
import { Eye } from 'lucide-react';

export const ScreenContext = createContext();

export function ScreenProvider({ children }){

    const [messageFeedback, setMessageFeedback] = useState("undefined");
    const [showMessage, setShowMessage] = useState(false);
    const [colorFeedback, setColorFeedback] = useState("undefined")
    const [iconFeedback, setIconFeedback] = useState()

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
            regex: "^[A-Za-z]+$",
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
            regex: "^[0-2]\\.[0-9]{2}$",
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
            regex: "^(?:(?:31\\/(?:0?[13578]|1[02]))|(?:29|30\\/(?:0?[13-9]|1[0-2]))|(?:0?[1-9]|1\\d|2[0-8]\\/(?:0?[1-9]|1[0-2])))\\/(?:19|20)\\d{2}$|^(29\\/02\\/(?:19|20)(?:[02468][048]|[13579][26]))$",
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
            regex: "^[0-9]{3}\\.[0-9]{2}$",
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
            regex: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,63}",
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
            regex: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{5,20}$",
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
            title:"Redefinir acesso", 
            subTitle:"Não se preocupe, nós te ajudamos a recuperar o acesso rapidinho."
        },
    ])

    return (
        <ScreenContext.Provider value={{
            fields,
            setFields,
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
