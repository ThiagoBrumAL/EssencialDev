import { useFeedback } from '../contexts/api/useFeedback';
import { useAuth } from '../contexts/auth/useAuth';
import { handlingAnalyzeDatas } from '../utils/errors/handlers/handlingAnalyzeDatas'
import { badFeedback } from '../utils/helpers/feedback/Failure';
import { goodFeedback } from '../utils/helpers/feedback/Success';

export const useUser = () => {

    const { sub, token } = useAuth();
    const { renderCardFeedback } = useFeedback();

    const getUser = async (body, axios) => {
        const response = await axios.get(`https://essencial-server.vercel.app/users/${sub}`,
            { 
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        const datas = await response.data
        body.setUser(datas)
    }

    const updateUser = async (body, axios) => {

        console.log(body.fields);
        let data = handlingAnalyzeDatas(body.fields, body.setFields);
        if (!data.isValid) throw new Error("Invalid operation")

        try {

            const { isValid: _isValid, role: _role, password:_password, ...rest } = data

            const response = await axios.patch(`https://essencial-server.vercel.app/users/${sub}`, 
                rest,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
                }
            )

            const status = response.status;
            goodFeedback(status, renderCardFeedback, "/info/update")
            body.setStatusReq(status)

        } catch (error){

            console.log(error);
            const status = error.response?.status
            badFeedback(status, renderCardFeedback, "/info/update")

            throw new Error(error)
        } 
    }

    return {
        updateUser,
        getUser
    }

}
