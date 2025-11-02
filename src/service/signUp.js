import { handlingAnalyzeDatas } from '../utils/errors/handlers/handlingAnalyzeDatas'
import { handlingAuthorized } from '../utils/errors/handlers/handlingAuthorized';

import { useSsr } from '../contexts/ssr/useSsr';

import { goodFeedback } from '../utils/helpers/feedback/Success';
import { badFeedback } from '../utils/helpers/feedback/Failure';

export const useSignUp = () => {

    const { renderCardFeedback } = useSsr();

    const signUp = async (body, axios) => {

        console.log(body.fields);

        let data = handlingAnalyzeDatas(body.fields, body.setFields);
        data = handlingAuthorized(data, body.isChecked, body.setCheckColor);
        if (!data.isValid) throw new Error("Invalid operation")

        try {
            const { isValid: _, ...rest } = data
            const response = await axios.post("https://essencial-server.vercel.app/auth/sign-up", rest)

            return goodFeedback(response.status, renderCardFeedback, "/sign-up")

        } catch (error){

            const status = error.response?.status
            badFeedback(status, renderCardFeedback, "/sign-up")
            throw new Error(error)
        } 
    }

    return signUp
}

