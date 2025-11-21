//Hooks
import { useState } from "react";

//Context
import { feedbackContext } from "./feedbackContext";


export function FeedbackProvider({ children }){

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
    
    return (
        <feedbackContext.Provider value={{
            messageFeedback,
            showMessage,
            colorFeedback,
            iconFeedback,
            renderCardFeedback
        }}>
            {children}
        </feedbackContext.Provider>
    )

}
