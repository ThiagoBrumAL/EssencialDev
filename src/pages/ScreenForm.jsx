import { Sun, Moon } from "lucide-react";

// My Components
import ButtonTheme from "../components/login/ButtonTheme.jsx";
import Title from "../components/login/Title.jsx";
import CardFeedback from "../components/login/CardFeedback.jsx";
import { useLocation } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { ScreenContext } from "../contexts/ScreenContext.jsx";
import { AuthProvider } from "../contexts/AuthContext.jsx";
import { GlobalContext } from "../contexts/GlobalContext.jsx";
import Loader from "../components/load/Loader.jsx";

import { cloudinary } from "../cloud/cloudinary.js";

function ScreenForm({ children }) {
    const [load, setLoad] = useState(true)

    const locale = useLocation()
    const {
        messageFeedback,
        showMessage,
        colorFeedback,
        iconFeedback,
        titles
    } = useContext(ScreenContext)

    const { 
        theme, 
        setTheme,
        validateTheme,
    } = useContext(GlobalContext)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoad(false)
        }, 3000)

        return (() => clearTimeout(timer))
    }, [])

    
    const changeTheme = () => {
        setTheme((prev) => {
            return !prev
        });
    };

    const Img = ({ path, theme }) => {

        const directionTheme = theme ? "light" : "dark"

        return (
            <img
                id="logo"
                className="
                    h-full
                    w-full
                    object-contain
                    max-h-[450px]
                    max-w-[450px]"
                src={cloudinary[path][directionTheme]}
                alt="Essecial Dev Logo"
            />
        )
    }

    if(load){
        return <Loader 
            theme={theme} 
            validateTheme={validateTheme}
        />
    }

    return (
        <div
        id="login-screen"
        className={`w-full min-h-dvh flex md:flex-row flex-col overflow-x-hidden`}
        >
            <div className={`
                flex
                sm:flex-row
                flex-col
                w-full 
                h-full 
                transition 
                duration-1000
                ease-in-out
            `}>
                <section
                    id="login-screen-section-one"
                    className={`  
                        ${validateTheme(theme, "from-teal-400 to-indigo-400 ", "from-indigo-900 to-slate-950")} 
                        flex
                        flex-col
                        justify-center
                        items-center
                        w-full 
                        min-h-full 
                        bg-gradient-to-tr
                        py-6 
                        px-[32px]
                `}>

                    <div>
                        <div className=" 
                            w-full 
                            flex 
                            justify-center
                        ">
                            <Title 
                                path={locale.pathname} 
                                titles={titles}
                            />
                        </div>

                        <div className="
                            w-full 
                            flex 
                            justify-center"
                        >
                            <Img 
                                path={locale.pathname} 
                                theme={theme}
                            />
                        </div>
                    </div>
                </section>

                <section
                    id="login-screen-div-two"
                    className={`
                        ${validateTheme(theme,"bg-slate-50","bg-slate-900")} 
                        w-full 
                        min-h-dvh 
                        flex 
                        items-center 
                        justify-between 
                        py-4 
                        flex-col 
                        px-[32px] 
                        relative
                    `}>

                    <AuthProvider>
                        { children }
                    </AuthProvider>

                    <div
                        id="container-theme"
                        className="
                        flex 
                        flex-col 
                        gap-4 
                        items-center 
                        mt-[40px] 
                        sm:gap-12 
                        sm:flex-row"
                    >
                        <div className="
                            flex 
                            gap-1 
                            items-center"
                        >
                            {theme ? <Moon color="#64748b"/> : <Sun color="#64748b"/>}

                            <p className="m-0 p-0 text-slate-500 font-[600] font-Inter">
                            {validateTheme(theme, "Modo escuro", "Modo claro")}
                            </p>
                        </div>

                        <div className="
                            h-[20px]
                            w-auto
                        ">
                            <ButtonTheme theme={theme} changeTheme={changeTheme} />
                        </div>
                        
                    </div>
                </section>

                {messageFeedback && 
                    <CardFeedback 
                        theme={theme} 
                        object={{message: messageFeedback, show: showMessage, color: colorFeedback, icon: iconFeedback}}
                    />
                }
            </div>
        </div>
    );
}

export default ScreenForm;
