import { useContext } from "react";
import { feedbackContext } from "./feedbackContext";

export function useFeedback(){

    const context = useContext(feedbackContext)

    if(!context){
        throw new Error("useSsr precisa ser utilizado dentro de um SsrProvider")
    }

    return context
}