//Hooks
import { useEffect, useRef, useState } from "react";

//Context
import { AuthContext } from "./AuthContext";

//Cookies
import Cookies from "js-cookie";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AuthProvider({ children }){

    const navigate = useNavigate();
    
    const [token, setToken] = useState(() => Cookies.get("tk") ? Cookies.get("tk") : undefined)
    const [sub, setSub] = useState(() => Cookies.get("sb") || null);
    const [keepSessionUser, setKeepSessionUser] = useState(false)
    const [ksu, setKsu] = useState(() => localStorage.getItem("ksu") === "true")
    const [user, setUser] = useState();
12
    function login(datas, callback){

        setToken(datas.token)
        Cookies.set("tk", datas.token, { expires: datas.dateExpiration});
        Cookies.set("sb", datas.sub, { expires: datas.dateExpiration})
        localStorage.setItem("ksu", keepSessionUser)
        setKsu(keepSessionUser)

        if(callback) return callback()

    }

    async function logout(){

        const response = await axios.post(
            "https://essencial-server.vercel.app/auth/logout",
            {},
            { withCredentials: true }
        );

        const status = response.status;
        if(status === 200){
            Cookies.remove("tk")
            Cookies.remove("sb")
            localStorage.removeItem("ksu")

            setToken(null)
            setSub(null)
            setKsu(null)
        }

        navigate("/sign-in")
    }
    
    async function keepSession() {

        const response = await axios.post(
            "https://essencial-server.vercel.app/auth/session",
            {},
            { withCredentials: true }
        );

        const newToken = response.data?.user.accessToken;
        const sub = response.data?.user.sub;


        if (newToken) {
            setToken(newToken);

            Cookies.set("tk", newToken, { expires: response.data?.user.expiresAt});
            Cookies.set("sb", sub, { expires: response.data?.user.expiresAt})
        }
    }

    useEffect(() => {
        localStorage.setItem("ksu", ksu)
    }, [ksu])


    return (
        <AuthContext.Provider value={{
            login,
            logout,
            token,
            sub,
            ksu,
            setKsu,
            keepSession,
            user,
            setUser,
            setKeepSessionUser,
            setToken, 
        }}>
            { children }
        </AuthContext.Provider>
    )
}