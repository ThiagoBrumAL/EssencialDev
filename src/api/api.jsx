import axios from 'axios';

import { useSignIn } from '../service/signIn';
import { useSignUp } from '../service/signUp';
import { useRecoverEmail } from '../service/recover';
import { useConfirmPassword } from '../service/confirmPassword';
import { useUser } from '../service/user';
import { useDoctors } from '../service/doctors';
import { useAppointments } from '../service/appointments';

export const useApi = () => {

    const signIn = useSignIn();
    const signUp = useSignUp();
    const recoverEmail = useRecoverEmail();
    const confirmPassword = useConfirmPassword();
    const { getUser } = useUser();
    const { updateUser } = useUser();
    const getDoctors = useDoctors();
    const { getAppointments, postAppointments, deleteAppointment } = useAppointments()

    const api = async (method, where, body) => {

        const routes = {
            "post":{
                "/sign-in": signIn,
                "/sign-up": signUp,
                "/recover": recoverEmail,
                "/recover/confirm-password": confirmPassword,
                "/appointments": postAppointments
            },
            "get": {
                "/home": getDoctors,
                "/info": getUser,
                "/info/appointments": getAppointments,
                "/about": getDoctors,
            },
            "patch":{
                "/info/update": updateUser
            },
            "put":{},
            "delete":{
                "/info/appointments": deleteAppointment,
            }
        }

        return routes[method][where](body, axios)
    }

    return api
}

