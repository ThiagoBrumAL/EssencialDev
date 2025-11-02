import axios from 'axios';

import { useSignIn } from '../service/signIn';
import { useSignUp } from '../service/signUp';
import { useRecoverEmail } from '../service/recover';

export const useApi = () => {

    const signIn = useSignIn();
    const signUp = useSignUp();
    const recoverEmail = useRecoverEmail();

    const api = async (method, where, body) => {

        const routes = {
            "post":{
                "/sign-in": signIn,
                "/sign-up": signUp,
                "/recover": recoverEmail
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

