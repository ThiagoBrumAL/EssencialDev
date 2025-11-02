import { validateInput } from '../utils/errors/handlers/handlingInput'

import { useSsr } from '../contexts/ssr/useSsr';

import { badFeedback } from '../utils/helpers/feedback/Failure';
import { goodFeedback } from '../utils/helpers/feedback/Success';

import { showMessageRecoverEmail } from '../utils/errors/handlers/hadlingRecoverEmail';

export const useRecoverEmail = () => {

    const { renderCardFeedback } = useSsr();

    const recoverEmail = async (body, axios) => {

        let data = validateInput(body.fields, body.setFields);
        if (!data.isValid) throw new Error("Invalid operation")

        try {

            const { isValid: _isValid, role: _role, ...rest } = data
            const response = await axios.post("https://essencial-server.vercel.app/auth/forgot-password", rest)

            const status = response.status;
            
            showMessageRecoverEmail(body.fields, body.setFields, body.waitSendEmail, body.setWaitSendEmail)
            goodFeedback(status, renderCardFeedback, "/recover")

        } catch (error){

            const status = error.response?.status
            badFeedback(status, renderCardFeedback, "/recover")

            throw new Error(error)
        } 
    }

    return recoverEmail

}
