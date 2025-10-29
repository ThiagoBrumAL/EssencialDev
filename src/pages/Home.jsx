import { useContext, useEffect, useState } from "react";
import Loader from "../components/load/Loader.jsx";
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

    const Link = ({ name, link, path, condition}) => {
        const isActive = locale.pathname === path ? true : false

        return (
                <a 
                    href={link} 
                    className={`
                        text-white
                        ${condition}
                        text-[1rem] 
                        font-[600]
                        leading-[1rem]
                        ${!isActive ? "transition duration-500 sm:hover:translate-y-[-10px]" : null}
                        text-center
                        relative
                        h-full
                        w-[20%]
                        group
                `}>
                    <span className="
                        absolute
                        left-[50%]
                        translate-x-[-50%]
                        top-[50%]
                        translate-y-[-50%]
                        w-full
                    ">
                        { name }
                    </span>

                    <div className="
                        absolute
                        w-[100%]
                        h-[5px]
                        bg-[#E6E8EC]
                        bottom-0
                        left-0
                        rounded-[1px]
                        scale-x-0
                        transition-all
                        duration-300
                        group-hover:scale-x-100
                        origin-left
                    "></div>
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
                    px-[32px]
                    justify-center
                    flex
                    items-center
            `}>

                    <div className="
                        flex
                        justify-center
                        w-[90%]
                    ">
                        <div 
                            className="
                                flex
                                items-center
                                justify-between
                                h-[80px]
                                w-[100%]
                            ">

                            <img 
                                src="https://res.cloudinary.com/essencialdev-cloudinary/image/upload/g_auto/f_auto/v1761500133/Logo_xy67v8.png" 
                                alt=""
                                className="
                                    w-[186px]
                                    h-[46px]
                                    outline-none
                                    p-0
                                    m-0
                                    md:block
                                    hidden
                                "/>

                            <div className="
                                w-[2px]
                                bg-white
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
                                    link={""}
                                />

                                <Link 
                                    path={"/home"} 
                                    name={"Blog"}
                                    condition={"md:block hidden"}
                                    link={""}
                                />
                                
                                <Link 
                                    path={"/home"} 
                                    name={"Sobre Nós"}
                                    condition={"md:block hidden"}
                                    link={""}
                                />

                                <Link 
                                    path={"/home"} 
                                    name={<>Assistente <br /> Virtual</>}
                                    condition={"md:block hidden"}
                                    link={""}
                                />
                                
                            </nav>

                            <div className="
                                md:hidden
                                block
                            ">
                                <TextAlignJustify color="#FFFFFF"/>
                            </div>


                            <div className="
                                h-full
                                w-auto
                                flex
                                items-center
                            ">
                                <button
                                    className={`
                                        relative
                                        md:w-[100px]
                                        md:h-full
                                        h-[30px]
                                        w-[30px]
                                        group
                                `}>
                                    <span className="
                                        absolute
                                        left-[50%]
                                        translate-x-[-50%]
                                        top-[50%]
                                        translate-y-[-50%]
                                    ">
                                        <User size={30} color="#FFFFFF"/>
                                    </span>

                                    <div className="
                                        md:block
                                        hidden
                                        absolute
                                        w-[100%]
                                        h-[5px]
                                        bg-[#E6E8EC]
                                        bottom-0
                                        left-0
                                        rounded-[1px]
                                        scale-x-0
                                        transition-all
                                        duration-300
                                        group-hover:scale-x-100
                                        origin-left
                                    "></div>
                                </button>
                            </div>
                        </div>
                        
                    </div>
            </header>
        </div>
    )
}

export default Home;