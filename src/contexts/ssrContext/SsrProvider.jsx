//Hooks
import { useState } from "react";

//Context
import { SsrContext } from "./SsrContext";

//Icon
import { Eye } from 'lucide-react';

export function SsrProvider({ children }){

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

    //Title SSR (Sing-in, Sign-up and Recover)
    const [titles] = useState([

        //Sign-in Page
        {
            page: "/sign-in", 
            title:"Bem vindo(a) de volta!", 
            subTitle:"Cadastre-se e tenha sua saúde na palma da mão."
        },

        //Sign-up Page
        {
            page: "/sign-up", 
            title:"Estamos prontos para cuidar de você.", 
            subTitle:"Cadastre-se e tenha sua saúde na palma da mão."
        },

        //Recover Page
        {
            page: "/recover", 
            title:"Redefinir acesso", 
            subTitle:"Não se preocupe, nós te ajudamos a recuperar o acesso rapidinho."
        },
    ])


    return (
        <SsrContext.Provider value={{
            messageFeedback,
            showMessage,
            colorFeedback,
            iconFeedback,
            renderCardFeedback,
            titles,
        }}>
            {children}
        </SsrContext.Provider>
    )

}
