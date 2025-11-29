import { useFeedback } from '../contexts/api/useFeedback';
import { useAuth } from '../contexts/auth/useAuth';
import { badFeedback } from '../utils/helpers/feedback/Failure';
import { goodFeedback } from '../utils/helpers/feedback/Success';

export const useAppointments = () => {

    const { renderCardFeedback } = useFeedback();
    const { sub, token } = useAuth();

    const getAppointments = async (body, axios) => {

        if (!body || !body.setValues) {
            console.error("getAppointments chamado SEM setValues");
            return;
        }

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

    const getAppointmentsId = async (body, axios) => {

        if (!body || !body.setValues) {
            console.error("getAppointments chamado SEM setValues");
            return;
        }

        const response = await axios.get(`https://essencial-server.vercel.app/appointments/${sub}`,
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

        const { setStatus, ...rest } = body;

        try{
            const response = await axios.post(`https://essencial-server.vercel.app/appointments`, rest,
                { 
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const datas = await response.data
            
            if(response.status === 201) setStatus(response.status);
            

            return goodFeedback(response.status, renderCardFeedback, "/appointments")

        }catch(e){
            const status = error.response?.status
            badFeedback(status, renderCardFeedback, "/appointments")
            throw new Error(error)
        }
        
    }

    const deleteAppointment = async (body = null, axios) => {

        try{
            const response = await axios.delete(`https://essencial-server.vercel.app/appointments/${body.id}`, 
                { 
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if(response.status === 204) {
                body.setDeletedStatus(response.status)
                setTimeout(() => {
                    body.setRenderConfirmDelete(() => {
                        return { isActive: false, id: null }
                    })
                }, 1000)
            }
            
        }catch{
            const status = error.response?.status
            badFeedback(status, renderCardFeedback, "/appointments")
            throw new Error(error)
        }

    }

    return {
        getAppointments,
        postAppointments,
        getAppointmentsId, 
        deleteAppointment
    }

}
