import { validateInput } from '../utils/errors/handlers/handlingInput'
import { useSsr } from '../contexts/ssr/useSsr';

import { badFeedback } from '../utils/helpers/feedback/Failure';

export const useSignIn = () => {

    const { renderCardFeedback } = useSsr();

    const signIn = async (body, axios) => {

        let data = validateInput(body.fields, body.setFields);
        if (!data.isValid) throw new Error("Invalid operation");

        try {
            const { isValid: _isValid, role: _role, ...rest } = data
            const response = await axios.post("https://essencial-server.vercel.app/auth/sign-in", rest)

            const body = await response.data
            const token = await body.accessToken
            return body.login(token, () => body.navigate("/home"))

        } catch (error){

            const status = error.response?.status
            badFeedback(status, renderCardFeedback, "/sign-in")
            throw new Error(error)
        } 
    }

    return signIn
}

