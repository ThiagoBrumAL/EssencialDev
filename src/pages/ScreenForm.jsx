import { Sun, Moon } from "lucide-react";

// My Components
import ButtonTheme from "../components/LoginComponents/ButtonTheme";
import Title from "../components/LoginComponents/Title";
import CardFeedback from "../components/LoginComponents/CardFeedback.jsx";
import { useLocation } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { ScreenContext } from "../contexts/ScreenContext.jsx";
import { AuthProvider } from "../contexts/AuthContext.jsx";
import { GlobalContext } from "../contexts/GlobalContext.jsx";
import Loader from "../components/Loader/Loader.jsx";

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
                    max-h-[500px]
                    max-w-[500px]"
                src={cloudinary[path][directionTheme]}
                alt=""
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
                        animate-backgroundScreenForm
                        transition
                        bg-[length:200%_200%]
                        block 
                        w-full 
                        min-h-full 
                        bg-gradient-to-tr
                        py-6 px-[24px]
                `}>
                    <div className="
                        h-[30%] 
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
                        h-[70%] 
                        w-full 
                        flex 
                        justify-center"
                    >
                        <Img 
                            path={locale.pathname} 
                            theme={theme}
                        />
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
                        px-[24px] 
                        relative
                    `}>

                    <AuthProvider>
                        { children }
                    </AuthProvider>


                    {messageFeedback && 
                        <CardFeedback 
                            theme={theme} 
                            object={{message: messageFeedback, show: showMessage, color: colorFeedback, icon: iconFeedback}}
                        />
                    }

                    <div
                        id="container-theme"
                        className="
                        flex 
                        flex-col 
                        gap-4 
                        items-center 
                        mt-[20px] 
                        sm:gap-12 
                        sm:flex-row"
                    >
                        <div className="
                            flex 
                            gap-1 
                            items-center"
                        >
                            {theme ? <Moon color="#64748b"/> : <Sun color="#64748b"/>}

                            <p className="m-0 p-0 text-slate-500 font-[500]">
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
            </div>
        </div>
    );
}

export default ScreenForm;
