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

    const Link = ({ name, link }) => {
        return (
            <a 
                href={link} 
                className="
                    text-slate-50 
                    text-[16px] 
                    font-[600]
                    leading-[20px]
            ">
                { name }
            </a>
        )
    }
    
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
        <div 
            className={`
                w-[100%]
                h-[100dvh]
                ${validateTheme(theme,"bg-indigo-100","bg-slate-900")}
        `}>
            <header 
                className={`
                    ${validateTheme(theme,"from-teal-400 to-indigo-400", "from-[#01051C] to-[#051782]")}
                    bg-gradient-to-tr
                    h-[80px]
                    w-[100%]
                    sm:px-[160px]
                    px-[24px]
                    justify-between
            `}>

                    <div 
                        className="
                            flex
                            sm:gap-[88px]
                            h-[100%]
                            items-center
                    ">
                        <Link name={"Inicio"} link={""}/>
                        <Link name={"Blog"} link={""}/>
                        <Link name={"Sobre nós"} link={""}/>
                        <Link name={`Agendar Aqui`} link={""}/>
                    </div>

                    <div>

                    </div>

            </header>
        </div>
    )
}

export default Home;