import { handlingAnalyzeDatas } from '../utils/errors/handlers/handlingAnalyzeDatas'

import { useSsr } from '../contexts/ssr/useSsr';

import { badFeedback } from '../utils/helpers/feedback/Failure';
import { goodFeedback } from '../utils/helpers/feedback/Success';

export const useConfirmPassword = () => {

    const { renderCardFeedback } = useSsr();

    const confirmPassword = async (body, axios) => {

        let data = handlingAnalyzeDatas(body.fields, body.setFields);
        if (!data.isValid) throw new Error("Invalid operation")

        try {

            const { isValid: _isValid, role: _role, password:_password, ...rest } = data
            rest.email = body.emailFieldValue;

            const response = await axios.post("https://essencial-server.vercel.app/auth/confirm-forgot-password", rest)

            const status = response.status;
            
            goodFeedback(status, renderCardFeedback, "/recover/confirm-password")
            body.setReqStatus(status)

            if(status === 200) return setTimeout(() => body.navigate("/sign-in"), 2000)

        } catch (error){

            const status = error.response?.status
            badFeedback(status, renderCardFeedback, "/recover/confirm-password")

            throw new Error(error)
        } 
    }

    return confirmPassword

}
