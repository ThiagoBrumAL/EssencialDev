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
    
    const [token, setToken] = useState(() => Cookies.get("tk") || null)

    const [sub, setSub] = useState(() => Cookies.get("sb") || null);

    const [keepSessionUser, setKeepSessionUser] = useState(false)

    const [ksu, setKsu] = useState(() => Cookies.get("ksu") === "true")

    const [expiresAt, setExpiresAt] = useState(null)

    const timer = useRef(null)

    function login(datas, callback){

        setToken(datas.token)
        setExpiresAt(Number(datas.dateExpiration));
        Cookies.set("tk", datas.token, { expires: Number(datas.dateExpiration) });
        Cookies.set("sb", datas.sub, { expires: Number(datas.dateExpiration) })
        Cookies.set("ksu", keepSessionUser, { expires: 7 })

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
            Cookies.remove("ksu")

            setToken(null)
            setExpiresAt(null)
            setKsu(null)
            setSub(null)
        }
    }

    async function keepSession() {
        const response = await axios.post(
            "https://essencial-server.vercel.app/auth/session",
            {},
            { withCredentials: true }
        );

        const newToken = response.data?.user.accessToken;
        const expire = response.data?.user.expiresAt;
        const sub = response.data?.user.sub;

        if (newToken) {
            setToken(newToken);
            setExpiresAt(Number(expire));

            Cookies.set("tk", newToken);
            Cookies.set("sb", sub)
            navigate("/home")
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
        <AuthContext.Provider value={{ login, logout, token, setSub, sub, setKeepSessionUser, keepSession }}>
            { children }
        </AuthContext.Provider>
    )
}