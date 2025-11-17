import { handlingAnalyzeDatas } from '../utils/errors/handlers/handlingAnalyzeDatas'
import { useSsr } from '../contexts/ssr/useSsr';

import { badFeedback } from '../utils/helpers/feedback/Failure';

export const useSignIn = () => {

    const { renderCardFeedback } = useSsr();

    const signIn = async (body, axios) => {

        let data = handlingAnalyzeDatas(body.fields, body.setFields);
        if (!data.isValid) throw new Error("Invalid operation");

        try {
            const { isValid: _isValid, role: _role, ...rest } = data
            const response = await axios.post("https://essencial-server.vercel.app/auth/sign-in", rest)

            const returnFromApi = await response.data

            const token = await returnFromApi.user.accessToken
            const dateExpiration = await returnFromApi.user.expiresAt

            const tokenDatas = { token, dateExpiration }

            return body.login(token, () => {
                if(token) return body.login(tokenDatas, () => setTimeout(() => body.navigate("/home"), 1000))
            })

        } catch (error){

            console.log(error);
            const status = error.response?.status
            badFeedback(status, renderCardFeedback, "/sign-in")
            throw new Error(error)
        } 
    }

    return signIn
}

