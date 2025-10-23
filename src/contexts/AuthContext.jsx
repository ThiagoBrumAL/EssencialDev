import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }){
    const [token, setToken] = useState(() => {
        // const existingToken = localStorage.getItem("token")
        // return existingToken ? existingToken : null
        return false
    })


    function login(token, callback){
        setToken(token)
        localStorage.setItem("token", token)
        if(token && callback) callback()
    }

    function logout(){
        setToken(null)
        localStorage.removeItem("token")
    }


    return (
        <AuthContext.Provider value={{ login, logout, token }}>
            { children }
        </AuthContext.Provider>
    )
}