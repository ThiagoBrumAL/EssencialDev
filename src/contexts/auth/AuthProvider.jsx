//Hooks
import { useEffect, useRef, useState } from "react";

//Context
import { AuthContext } from "./AuthContext";

//Cookies
import Cookies from "js-cookie";

import axios from "axios";

export function AuthProvider({ children }) {

    const [token, setToken] = useState(() => Cookies.get("tk") || null);
    const [sub, setSub] = useState(() => Cookies.get("sb") || null);

    const [keepSessionUser, setKeepSessionUser] = useState(() => {
        const value = Cookies.get("ksu");
        return value === "true";
    });

    const [expiresAt, setExpiresAt] = useState(null);

    const timer = useRef(null);

    function login(datas, callback) {

        const expire = Number(datas.dateExpiration);

        setToken(datas.token);
        setSub(datas.sub);
        setExpiresAt(expire);

        if (keepSessionUser) {
            // cookie persistente
            Cookies.set("tk", datas.token, { expires: new Date(expire) });
            Cookies.set("sb", datas.sub, { expires: new Date(expire) });
        } else {
            // cookie de sessão
            Cookies.set("tk", datas.token);
            Cookies.set("sb", datas.sub);
        }

        if (callback) return callback();
    }


    async function logout() {

        await axios.post(
            "https://essencial-server.vercel.app/auth/logout",
            {},
            { withCredentials: true }
        );

        Cookies.remove("tk");
        Cookies.remove("sb");
        Cookies.remove("ksu");

        setToken(null);
        setSub(null);
        setExpiresAt(null);
        setKeepSessionUser(false);
    }

    async function keepSession() {
        try {
            const response = await axios.post(
                "https://essencial-server.vercel.app/auth/session",
                {},
                { withCredentials: true }
            );

            const newToken = response.data?.user.accessToken;
            const expire = Number(response.data?.user.expiresAt);

            if (newToken) {
                setToken(newToken);
                setExpiresAt(expire);

                if (keepSessionUser) {
                    Cookies.set("tk", newToken, { expires: new Date(expire) });
                } else {
                    Cookies.set("tk", newToken); // cookie de sessão
                }
            }

        } catch (err) {
            console.error("Erro no keepSession:", err);
            logout();
        }
    }

    useEffect(() => {
        Cookies.set("ksu", keepSessionUser ? "true" : "false");
    }, [keepSessionUser]);

    useEffect(() => {
        if (!token) return;

        if (keepSessionUser) {
            // tornar persistente
            Cookies.set("tk", token, { expires: new Date(expiresAt) });
            Cookies.set("sb", sub, { expires: new Date(expiresAt) });
        } else {
            // tornar cookie de sessão
            Cookies.set("tk", token);
            Cookies.set("sb", sub);
        }
    }, [keepSessionUser]);

    useEffect(() => {
        if (!token || !expiresAt) return;

        const now = Date.now();

        if (now >= expiresAt) {
            if (keepSessionUser) keepSession();
            else logout();
            return;
        }

        const timeLeft = expiresAt - now;

        timer.current = setTimeout(() => {
            if (keepSessionUser) keepSession();
            else logout();
        }, timeLeft);

        return () => clearTimeout(timer.current);

    }, [token, expiresAt]);

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            token,
            sub,
            setSub,
            keepSessionUser,
            setKeepSessionUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}
