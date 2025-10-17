import { createContext, useState } from "react";
import { maskHeightWeightDate, maskFullName, maskPassword, maskEmail, } from "../handlings/functions"
import { Eye } from 'lucide-react';

import { useLocation } from "react-router-dom";

export const ScreenContext = createContext();

export function ScreenProvider({ children }){
    const locale = useLocation();
    const [theme, setTheme] = useState(true);

    const validateTheme = (theme, light, dark) => {
        return theme ? light : dark;
    }

    const [fieldsSignUp, setFieldsSignUp] = useState([
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
            messageError: "Campo obrigatório"
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

    const [fieldsRecover, setFieldsRecover] = useState([
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
    ]);

    const [fieldsSignIn, setFieldsSignIn] = useState([
        { 
            name: "E-mail", 
            type: "email", 
            placeholder: "Insira seu email", 
            link: false, 
            id:"email",
            mask: maskEmail,
            hasErrorInField: false,
            messageError: "Campo obrigatório"
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

    return (
        <ScreenContext.Provider value={{
            locale,
            theme, 
            setTheme,
            fieldsSignUp,
            setFieldsSignUp,
            fieldsRecover,
            setFieldsRecover,
            fieldsSignIn,
            setFieldsSignIn,
            validateTheme
        }}>
            {children}
        </ScreenContext.Provider>
    )

}
