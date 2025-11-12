import { handlingAnalyzeDatas } from '../utils/errors/handlers/handlingAnalyzeDatas'

import { useSsr } from '../contexts/ssr/useSsr';

import { badFeedback } from '../utils/helpers/feedback/Failure';
import { goodFeedback } from '../utils/helpers/feedback/Success';

import { handlingRecoverEmail } from '../utils/errors/handlers/hadlingRecoverEmail';

export const useRecoverEmail = () => {

    const { renderCardFeedback } = useSsr();

    const recoverEmail = async (body, axios) => {

        let data = handlingAnalyzeDatas(body.fields, body.setFields);
        if (!data.isValid) throw new Error("Invalid operation")

        try {

            const { isValid: _isValid, role: _role, ...rest } = data

            const response = await axios.post("https://essencial-server.vercel.app/auth/forgot-password", rest)

            const status = response.status;
            
            handlingRecoverEmail(body.fields, body.setFields, body.waitSendEmail, body.setWaitSendEmail)
            goodFeedback(status, renderCardFeedback, "/recover")


            body.setReqStatus(status)


            window.history.pushState({}, "", "recover/confirm-password")
            body.setCurrentLocale("/recover/confirm-password");

        } catch (error){

            const status = error.response?.status
            badFeedback(status, renderCardFeedback, "/recover")

            throw new Error(error)
        } 
    }

    return recoverEmail

}
