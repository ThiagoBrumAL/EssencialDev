import { useEffect, useState } from "react";
import Loader from "../components/loaders/Loader.jsx";

import { useTheme } from "../contexts/theme/useTheme.js";

import { User, TextAlignJustify  } from 'lucide-react';
import { useLocation } from "react-router-dom";
import { useOs } from "../contexts/os/useOs.js";

import { AnimatePresence, motion } from "framer-motion";
import { useFeedback } from "../contexts/api/useFeedback.js";
import CardFeedback from "../components/cards/CardFeedback.jsx";
import { useWindowWidth } from "../hooks/WindowWidth.jsx";


function ScreenHome({ children }){

    const [load, setLoad] = useState(true)
    const locale = useLocation()
    const { isWindows } = useOs()

    const width = useWindowWidth();
    const [isOpen, setIsOpen] = useState(false);

    const { showMessage } = useFeedback();

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

    const LinkSide = ({ name, path }) => {
        return (
            <a 
                href={path}
                className={`
                    text-white
                    text-[1rem] 
                    font-[600]
                    leading-[1rem]
                    text-center
                    relative
                    h-full
                    group
                    font-Inter
            `}>
                <div className="
                    flex
                    justify-start
                    items-center
                    h-full
                    w-full
                ">
                    { name }
                </div>
    
            </a>
        )
    }

    const SideBar = () => {
        return (
            <motion.div 
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="
                md:top-[116px]
                top-[86px]
                py-[32px]
                px-[24px]
                w-full
                h-auto
                max-w-[220px]
                bg-sky-300
                left-[24px]
                flex
                flex-col
                fixed
                rounded-xl
            ">
                <div className="
                    flex
                    flex-col
                    gap-[32px]
                ">
                    <LinkSide path={"/home"} name={"Inicio"}/>
                    <LinkSide path={"/about"} name={"Sobre Nós"}/>
                    <LinkSide path={"/chat"} name={"Assistente Virtual"}/>
                    <LinkSide path={"/blog"} name={"Blog"}/>
                </div>
            </motion.div>
        )
    }

    const openSide = () => {
        setIsOpen((prev) => !prev)
    }

    const Structure = () => {
        return <div className="
            w-full
            h-full
        ">
            <AnimatePresence mode="sync">
                <motion.div
                    key={"structure"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9 }}
                    className="w-full h-full relative"
                >
                    <header 
                        className={`
                            ${validateTheme(theme,"from-teal-400 to-indigo-400", "from-[#01051C] to-[#051782]")}
                            bg-gradient-to-tr
                            ${isWindows ? "md:h-[74px]" : "md:h-[90px]"}
                            ${isWindows ? "md:h-[70px]" : "md:h-[86px]"}
                            h-[62px]
                            w-full
                            px-[32px]
                            justify-center
                            flex
                            items-center
                            transition 
                            duration-1000
                            ease-in-out
                            z-50
                            fixed
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
                                        <motion.button 
                                        onClick={() => openSide()}
                                        className="

                                        ">
                                            <TextAlignJustify color="#FFFFFF"/>
                                        </motion.button>
                                    </div>

                                    <div className="
                                        flex
                                        justify-center
                                        items-center
                                        md:w-[100px]
                                        md:h-full
                                        h-full
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
                        md:pt-[80px]
                        pt-[86px]
                        relative
                    `}>
                        <AnimatePresence>
                            {isOpen && <SideBar /> }
                        </AnimatePresence>
                        
                        { children }
                    </main>

                    <footer className={`
                        mt-[50px]
                        w-full
                        p-[24px]
                        bg-gradient-to-tr
                        flex
                        justify-center
                        items-center
                        flex-col
                        ${validateTheme(theme,"from-teal-400 to-indigo-400", "from-[#01051C] to-[#051782]")}    
                    `}>
                        <h1 className="
                            text-[1.375rem]
                            leading-normal
                            text-[#FFFAFE]
                            font-normal
                            font-DmSans
                        ">
                            Clinica EssencialDev
                        </h1>
                        <h2 className="
                            text-[1.175rem]
                            leading-normal
                            text-[#FFFAFE]
                            font-normal
                            font-DmSans
                        ">
                            Sua saúde, nossa prioridade!
                        </h2>
                    </footer>
                </motion.div>

                { showMessage && <CardFeedback params={"top-[100px]"}/> }
            </AnimatePresence>
            
        </div>
    }

    return (
        <div 
            className={`
                block
                w-full
                ${validateTheme(theme,"bg-[#FAFAFA]","bg-slate-900")}
        `}>

            {load ? <Loader /> : Structure()}

        </div>
    )
}

export default ScreenHome;