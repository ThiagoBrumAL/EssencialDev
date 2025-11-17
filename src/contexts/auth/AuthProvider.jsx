//Hooks
import { useEffect, useRef, useState } from "react";

//Context
import { AuthContext } from "./AuthContext";

//Cookies
import Cookies from "js-cookie";

import axios from "axios";

export function AuthProvider({ children }){
    
    const [token, setToken] = useState(() => {
        const existToken = Cookies.get("tk");

        if(existToken && existToken.length === 1071){
            return existToken
        }

        return null
    })

    const [keepSessionUser, setKeepSessionUser] = useState(false) // ------
    const [expiresAt, setExpiresAt] = useState(null)
    const timer = useRef(null)

    function login(tokenDatas, callback){

        setToken(tokenDatas.token)
        setExpiresAt(Number(tokenDatas.dateExpiration));
        Cookies.set("tk", tokenDatas.token);

        if(callback) return callback()

    }

    async function logout(){

        const response = await axios.post("https://essencial-server.vercel.app/auth/logout");
        const status = response.status;

        if(status === 200){
            Cookies.remove("tk")
            setToken(null)
            setExpiresAt(null)
        }
    }

    async function keepSession(){

        const response = await axios.post(
            "https://essencial-server.vercel.app/auth/session",
            {},
            { withCredentials: true }
        );

        const status = response.status

        if(status === 200){
            Cookies.remove("tk")
            setToken(response.data.user.accessToken)
            Cookies.set("tk", response.data.user.accessToken)
            setExpiresAt(Date.now() + 7000);
        }

    }


    useEffect(() => {

        if(!token || !expiresAt) return

        const now = Date.now();
    
        if(now >= expiresAt){

            if(keepSessionUser){
                keepSession()
                return
            }else{
                logout();
                return 
            }
            
        }

        const timeLeft = expiresAt - now

        timer.current = setTimeout(() => {
            if(keepSessionUser){
                keepSession()
                return
            }else{
                logout();
                return 
            }
        }, timeLeft)

        return () => {
            if(timer.current) clearTimeout(timer.current)
        }

    }, [token, expiresAt])

    return (
        <AuthContext.Provider value={{ login, logout, token }}>
            { children }
        </AuthContext.Provider>
    )
}