import { validateInput } from '../utils/errors/handlers/handlingInput'
import { validateCheckbox } from '../utils/errors/handlers/handlingAuthorized';

import { useSsr } from '../contexts/ssrContext/useSsr';

import { goodFeedback } from '../utils/helpers/feedback/Success';
import { badFeedback } from '../utils/helpers/feedback/Failure';

export const useSignUp = () => {

    const { renderCardFeedback } = useSsr();

    const signUp = async (body, axios) => {

        let data = validateInput(body.fields, body.setFields);
        data = validateCheckbox(data, body.isChecked, body.setCheckColor);
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

