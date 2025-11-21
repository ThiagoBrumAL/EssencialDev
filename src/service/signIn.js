import { handlingAnalyzeDatas } from '../utils/errors/handlers/handlingAnalyzeDatas'
import { useFeedback } from '../contexts/api/useFeedback';

import { badFeedback } from '../utils/helpers/feedback/Failure';
import { useAuth } from '../contexts/auth/useAuth';

export const useSignIn = () => {

    const { renderCardFeedback } = useFeedback();
    const { setSub } = useAuth();

    const signIn = async (body, axios) => {

        let data = handlingAnalyzeDatas(body.fields, body.setFields);
        if (!data.isValid) throw new Error("Invalid operation");

        try {
            const { isValid: _isValid, role: _role, ...rest } = data
            const response = await axios.post(
                "https://essencial-server.vercel.app/auth/sign-in",
                rest,
                {
                    withCredentials: true
                }
            )

            const returnFromApi = await response.data

            const token = await returnFromApi.user.accessToken
            const dateExpiration = await returnFromApi.user.expiresAt
            const sub = await returnFromApi.user.sub

            const datas = { token, dateExpiration, sub }

            return body.login(token, () => {
                if(token) return body.login(datas, () => setTimeout(() => body.navigate("/home"), 1000))
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

