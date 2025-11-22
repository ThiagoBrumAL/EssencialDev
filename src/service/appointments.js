import { useFeedback } from '../contexts/api/useFeedback';
import { useAuth } from '../contexts/auth/useAuth';

export const useAppointments = () => {

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

    return {
        getAppointments
    }

}
