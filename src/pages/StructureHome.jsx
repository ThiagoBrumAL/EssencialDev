import { useEffect, useState } from "react";
import Loader from "../components/loaders/Loader.jsx";

import { useTheme } from "../contexts/theme/useTheme.js";
import Cookies from 'js-cookie'

import { User, TextAlignJustify  } from 'lucide-react';
import { useLocation } from "react-router-dom";
import { useOs } from "../contexts/os/useOs.js";

import { AnimatePresence, motion } from "framer-motion";
import { useFeedback } from "../contexts/api/useFeedback.js";
import CardFeedback from "../components/cards/CardFeedback.jsx";
import { useWindowWidth } from "../hooks/WindowWidth.jsx";
import { useAuth } from "../contexts/auth/useAuth.js";


function StructureHome({ children }){

    const [load, setLoad] = useState(true)
    const locale = useLocation()
    const { isWindows } = useOs()

    const width = useWindowWidth();
    const [isOpen, setIsOpen] = useState(false);

    const { keepSession, ksu, setToken, logout } = useAuth();

    const { showMessage } = useFeedback();

    useEffect(() => {

        const timer = setTimeout(() => {
            setLoad(false)
        }, 2000)

        return (() => clearTimeout(timer))
    }, [])

    useEffect(() => {
        const checkToken = () => {
            const currentToken = Cookies.get("tk");
            if(!currentToken){
                setToken(null)

                if(ksu) {
                    keepSession();
                } else {
                    logout(); 
                }
            } 
        }

        const interval = setInterval(checkToken, 1000);
        return () => clearInterval(interval)
    }, [])

    const { 
        theme,
        validateTheme,
    } = useTheme()

    const Info = ({ h3, arr }) => {
        return (
            <div>
                <h3 className="
                    font-DmSans
                    font-normal
                    text-[1.275rem]
                    text-white
                    mb-[12px]
                ">
                    { h3 }
                </h3>
                {
                    arr.map((p, index) => {
                        return <p
                            key={index}
                            className="
                            font-DmSans
                            font-normal
                            text-[1rem]
                            text-white
                            leading-normal
                        ">
                            { p }
                        </p>
                    })
                }
                { width <= 640 ? <hr className="mt-[16px]"/> : null }
            </div>
        )
    }

    const SocialMedia = ({ link, alt }) => {
        return (
            <img 
                src={ link } 
                alt={ alt } 
                className="
                    w-[32px]
                    h-[32px]
                "
            />
        )
    }

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

    const openSide = () => {
        setIsOpen((prev) => !prev)
    }

    return (
        <div 
            style={{ height: "100%" }}
            className={`
                w-full
                h-full
                ${validateTheme(theme,"bg-[#FAFAFA]","bg-slate-900")}
        `}>

            {load ? <Loader /> : <div className="
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
                    className="w-full h-full flex flex-col"
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
                                            path={"/about"} 
                                            name={"Sobre Nós"}
                                            condition={"md:block hidden"}
                                        />

                                        <Link 
                                            path={"/chat"} 
                                            name={<>Assistente Virtual</>}
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
                    <div className={`
                        ${isWindows ? "md:h-[74px]" : "md:h-[90px]"}
                        ${isWindows ? "md:h-[70px]" : "md:h-[86px]"}
                    `}></div>

                    <main className={`
                        ${validateTheme(theme,"bg-[#FAFAFA]","bg-slate-900")}
                        w-full
                        transition-transform
                        duration-1000
                        ease-in-out
                        relative
                        flex-1
                        py-[32px]
                    `}>
                        <AnimatePresence>
                            { width <= 939 && isOpen ? <motion.div 
                                    initial={{ opacity: 0, x: -300 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -300 }}
                                    className={`
                                        md:top-[116px]
                                        top-[86px]
                                        py-[32px]
                                        px-[24px]
                                        w-full
                                        h-auto
                                        max-w-[220px]
                                        ${validateTheme(theme, "bg-[#59CCEF] border-[#ace4f7]", "bg-[#4F39F6] border-[#6a58f1]")}
                                        border-[2px]
                                        left-[24px]
                                        flex
                                        flex-col
                                        fixed
                                        rounded-xl
                                        z-50
                                        transition-transform
                                        duration-300
                                        ease-in-out
                                    `}>
                                        <div className="
                                            flex
                                            flex-col
                                            gap-[32px]
                                        ">
                                            <LinkSide path={"/home"} name={"Inicio"}/>
                                            <LinkSide path={"/about"} name={"Sobre Nós"}/>
                                            <LinkSide path={"/chat"} name={"Assistente Virtual"}/>
                                            <LinkSide path={"/info/appointments"} name={"Meus agendamentos"}/>
                                        </div>
                                    </motion.div> : null }
                        </AnimatePresence>
                        
                        { children }
                    </main>
                    <footer className={`
                        w-full
                        py-[24px]
                        md:px-[36px]
                        px-[24px]
                        bg-gradient-to-t
                        flex
                        flex-col
                        justify-between
                        items-center
                        ${validateTheme(theme,"from-teal-400 to-indigo-400", "from-[#01051C] to-[#051782]")}
                    `}>

                        <div className="
                            w-full
                            h-auto
                            flex
                            justify-start
                            items-start
                            mb-[42px]
                        ">
                            <div className="
                                w-full
                                max-w-[1400px]
                                h-auto
                                flex
                                sm:flex-row
                                flex-col
                                justify-between
                                gap-3
                            ">
                                <Info h3={"Sobre nós"} arr={["Quem somos", "Nossa missão", "+1-2345-6789", "Chat / Suporte Técnico"]}/>
                                <Info h3={"Contato"} arr={["E-mail", "Telefone / WhatsApp", "Endereço", "Horário de atendimento"]}/>
                                <Info h3={"Legal"} arr={["Termos de Uso", "Política de Privacidade", "Política de Cookies"]}/>
                                <Info h3={"Serviços"} arr={["Agendamentos", "Exames", "Análises"]}/>
                            </div>
                        </div>

                        <div className="
                            w-full
                            h-auto
                            flex
                            justify-between
                        ">
                            <div className="
                                w-full
                                max-w-[168px]
                                h-auto
                                flex
                                flex-row
                                justify-between
                            ">
                                <SocialMedia 
                                    link={"https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1764385667/Link_z2r2s2.png"} 
                                    alt={"Facebook"}
                                />
                                <SocialMedia 
                                    link={"https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1764385668/Link-1_lz4f5w.png"} 
                                    alt={"Linkedin"}
                                />
                                <SocialMedia 
                                    link={"https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1764385668/Link-2_nldwxh.png"} 
                                    alt={"Twitter"}
                                />
                                <SocialMedia 
                                    link={"https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1764385668/Link-3_m2wgfd.png"} 
                                    alt={"Instagram"}
                                />
                            </div>

                            <div className="
                                w-auto
                                h-auto
                            ">
                                <img 
                                    src="https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763457834/Slice_1-removebg-preview_v3clbw.png"
                                    alt="Essencial Dev"
                                    className="
                                        md:h-[47px]
                                        md:w-[50px]
                                        h-[37px]
                                        w-[40px]
                                    "
                                />
                            </div>
                        </div>


                    </footer>
                </motion.div>

                { showMessage && <CardFeedback params={"top-[100px]"}/> }
            </AnimatePresence>
            
        </div>}

        </div>
    )
}

export default StructureHome;