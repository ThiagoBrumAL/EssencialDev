import { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader/Loader.jsx";
import { GlobalContext } from "../contexts/GlobalContext.jsx";

function Home(){

    const [load, setLoad] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoad(false)
        }, 3000)

        return (() => clearTimeout(timer))
    }, [])

    const { 
        theme,
        validateTheme,
    } = useContext(GlobalContext)
    
    if(load){
        return (
        <div
            id="login-screen"
            className={`
                w-full 
                min-h-dvh 
                flex 
                md:flex-row 
                flex-col 
                overflow-x-hidden
        `}>
            <Loader />
        </div>
        )
    }

    return (
        <section 
            className={`
                ${validateTheme(theme,"bg-slate-50","bg-slate-900")}
        `}>
            <h1>Home Page</h1>
        </section>
    )
}

export default Home;