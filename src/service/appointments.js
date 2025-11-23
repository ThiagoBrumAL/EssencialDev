import { useFeedback } from '../contexts/api/useFeedback';
import { useAuth } from '../contexts/auth/useAuth';
import { badFeedback } from '../utils/helpers/feedback/Failure';
import { goodFeedback } from '../utils/helpers/feedback/Success';

export const useAppointments = () => {

    const { renderCardFeedback } = useFeedback();
    const { token } = useAuth();

    const getAppointments = async (body = null, axios) => {
        const response = await axios.get(`https://essencial-server.vercel.app/appointments`,
            { 
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        const datas = await response.data

        setTimeout(() => {
            body.setValues(datas)
        },1000)
        
    }


    const postAppointments = async (body = null, axios) => {

        console.log(body);
        
        try{
            const response = await axios.post(`https://essencial-server.vercel.app/appointments`, body,
                { 
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const datas = await response.data
            
            return goodFeedback(response.status, renderCardFeedback, "/appointments")

        }catch(e){
            console.log(e);
            const status = error.response?.status
            badFeedback(status, renderCardFeedback, "/appointments")
            throw new Error(error)
        }
        
    }

    return {
        getAppointments,
        postAppointments
    }

}
