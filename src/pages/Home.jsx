import { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader/Loader.jsx";
import { GlobalContext } from "../contexts/GlobalContext.jsx";

import { User, TextAlignJustify  } from 'lucide-react';
import { useLocation } from "react-router-dom";

function Home(){

    const [load, setLoad] = useState(true)
    const locale = useLocation()

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

    const Link = ({ name, link, path}) => {
        const isActive = locale.pathname === path ? true : false

        return (
            <a 
                href={link} 
                className={`
                    ${isActive ? "text-slate-950" : "text-white"}
                    text-[16px] 
                    font-[600]
                    leading-[20px]
                    ${!isActive ? "transition duration-500 sm:hover:translate-y-[-10px]" : null}
            `}>
                { name }
            </a>
        )
    }
    
    if(load){
        return (
            <Loader 
                validateTheme={validateTheme} 
                theme={theme}
            />
        )
    }

    return (
        <div 
            className={`
                w-[100%]
                h-[100dvh]
                ${validateTheme(theme,"bg-white","bg-slate-900")}
        `}>
            <header 
                className={`
                    ${validateTheme(theme,"from-teal-400 to-indigo-400", "from-[#01051C] to-[#051782]")}
                    bg-gradient-to-tr
                    h-[80px]
                    w-full
                    px-[24px]
                    justify-center
                    flex
                    items-center
            `}>

                    <div className="
                        flex
                        justify-between
                        xl:w-[77%]
                        w-[100%]
                    ">
                        <div 
                            className="
                                flex
                                sm:gap-[34px]
                                items-center
                                h-[40px]
                                md:max-w-[680px]
                                max-w-[160px]
                                w-[100%]
                            ">

                            <div className="
                                h-full
                                flex
                                justify-center
                                items-center
                                rounded-full
                            ">
                                <img 
                                    src="https://res.cloudinary.com/essencialdev-cloudinary/image/upload/g_auto/f_auto/v1761500133/Logo_xy67v8.png" 
                                    alt=""
                                    className="
                                        w-[170px]
                                        h-[30px]
                                        outline-none
                                        p-0
                                        m-0
                                        md:block
                                        hidden
                                    "/>
                            </div>

                            <div className="
                                h-full
                                w-[2px]
                                bg-white
                                md:block
                                hidden
                            "></div>

                            <div className="
                                hidden
                                items-center
                                justify-between
                                w-[100%]
                                md:flex
                            ">
                                <Link 
                                    path={"/home"} 
                                    name={"Inicio"} 
                                    link={""}
                                />
                                <Link 
                                    path={"/blog"} 
                                    name={"Blog"} 
                                    link={""}
                                />
                                <Link 
                                    path={"/about"} 
                                    name={"Sobre nós"} 
                                    link={""}
                                />
                                <Link 
                                    path={"/scheduling"} 
                                    name={`ChatBot`} 
                                    link={""}
                                />
                            </div>

                            <div className="
                                md:hidden
                                block
                            ">
                                <TextAlignJustify color="#FFFFFF"/>
                            </div>
                        </div>

                        <div className="
                            flex
                            gap-[90px]
                            w-auto
                        ">
                            <User size={30} color="#FFFFFF"/>
                        </div>
                    </div>
                    
            </header>
        </div>
    )
}

export default Home;