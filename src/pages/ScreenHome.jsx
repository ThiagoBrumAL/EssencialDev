import { useEffect, useState } from "react";
import Loader from "../components/loaders/Loader.jsx";

import { useTheme } from "../contexts/Theme/useTheme.js";

import { User, TextAlignJustify  } from 'lucide-react';
import { useLocation } from "react-router-dom";

function ScreenHome({ children }){

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
    } = useTheme()

    const Link = ({ name, path, condition}) => {
        const isActive = locale.pathname === path ? true : false

        return (
                <a 
                    href={path} 
                    className={`
                        text-white
                        ${condition}
                        text-[1rem] 
                        font-[600]
                        leading-[1rem]
                        text-center
                        relative
                        h-full
                        ${path === "/info" ? "w-full" : "w-[20%]"}
                        group
                        font-Inter
                `}>
                    <div className="
                        flex
                        justify-center
                        items-center
                        h-full
                        w-full
                    ">
                        { name }
                    </div>

                    <div className={`
                        absolute
                        w-[100%]
                        h-[5px]
                        ${isActive ? "bg-[#e0eafe]" : "bg-[#E6E8EC]"}
                        bottom-0
                        left-0
                        rounded-[1px]
                        ${isActive ? "" : "scale-x-0 transition-all duration-300 group-hover:scale-x-100 origin-left"}
                    `}></div>
                </a>
        )
    }

    return (
        <div 
            className={`
                w-[100%]
                h-[100dvh]
                ${validateTheme(theme,"bg-[#FFFAFE]","bg-slate-900")}
        `}>

            {load && <Loader /> }

            <header 
                className={`
                    ${validateTheme(theme,"from-teal-400 to-indigo-400", "from-[#01051C] to-[#051782]")}
                    bg-gradient-to-tr
                    h-[76px]
                    w-full
                    px-[32px]
                    justify-center
                    flex
                    items-center
                    transition 
                    duration-1000
                    ease-in-out
                    ${load ? "opacity-0" : "opacity-100"}
            `}>

                    <div className="
                        flex
                        justify-center
                        h-full
                        w-[90%]
                    ">
                        <div 
                            className="
                                flex
                                items-center
                                justify-between
                                h-full
                                w-[100%]
                            ">

                            <img 
                                src="https://res.cloudinary.com/essencialdev-cloudinary/image/upload/g_auto/f_auto/v1761500133/Logo_xy67v8.png" 
                                alt=""
                                className="
                                    w-[186px]
                                    h-[43px]
                                    outline-none
                                    p-0
                                    m-0
                                    md:block
                                    hidden
                                "/>

                            <div className="
                                w-[2px]
                                bg-[#FFFAFE]
                                md:block
                                hidden
                                h-[40px]
                            "></div>

                            <nav className="
                                w-[50%]
                                h-full
                                items-center
                                justify-between
                                hidden
                                md:flex
                            ">
                                
                                <Link 
                                    path={"/home"} 
                                    name={"Inicio"}
                                    condition={"md:block hidden"}
                                />

                                <Link 
                                    path={"/blog"} 
                                    name={"Blog"}
                                    condition={"md:block hidden"}
                                />
                                
                                <Link 
                                    path={"/about"} 
                                    name={"Sobre Nós"}
                                    condition={"md:block hidden"}
                                />

                                <Link 
                                    path={"/chat"} 
                                    name={<>Assistente <br /> Virtual</>}
                                    condition={"md:block hidden"}
                                />
                                
                            </nav>

                            <div className="
                                md:hidden
                                block
                            ">
                                <TextAlignJustify color="#FFFFFF"/>
                            </div>

                            <div className="
                                flex
                                justify-center
                                items-center
                                md:w-[100px]
                                md:h-full
                                h-[30px]
                                w-[30px]
                            ">
                                <Link 
                                    path={"/info"} 
                                    name={<User size={30} color="#FFFFFF"/>}
                                    condition={""}
                                />
                            </div>
                        </div>
                        
                    </div>
            </header>

            <main className={`
                h-auto
                w-full
                transition 
                duration-1000
                ease-in-out
                ${load ? "opacity-0" : "opacity-100"}
            `}>
                { children }
            </main>
        </div>
    )
}

export default ScreenHome;