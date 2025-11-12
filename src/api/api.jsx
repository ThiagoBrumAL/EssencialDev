import axios from 'axios';

import { useSignIn } from '../service/signIn';
import { useSignUp } from '../service/signUp';
import { useRecoverEmail } from '../service/recover';
import { useConfirmPassword } from '../service/confirmPassword';

export const useApi = () => {

    const signIn = useSignIn();
    const signUp = useSignUp();
    const recoverEmail = useRecoverEmail();
    const confirmPassword = useConfirmPassword();

    const api = async (method, where, body) => {

        const routes = {
            "post":{
                "/sign-in": signIn,
                "/sign-up": signUp,
                "/recover": recoverEmail,
                "/recover/confirm-password": confirmPassword
            },
            "get": {},
            "patch":{},
            "put":{},
            "delete":{}
        }

        return routes[method][where](body, axios)
    }

    return api
}

