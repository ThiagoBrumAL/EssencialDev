import { useAuth } from '../contexts/auth/useAuth';

export const useDoctors = () => {

    const { token } = useAuth();

    const getDoctors=  async (body, axios) => {
        const response = await axios.get("https://essencial-server.vercel.app/doctors", 
            { withCredentials: true,
                headers: {
                    Authorization: `Bearer ${ token }`
                }
                }
        );
        
        setTimeout(() => {
            body.setDoctors(response.data)
        },1000)
        
        
    }

    return getDoctors

}
