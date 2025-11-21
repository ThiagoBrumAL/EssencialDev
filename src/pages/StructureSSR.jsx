
// Components.
import ButtonTheme from '../components/buttons/ButtonTheme.jsx'
import Title from "../components/titles/Title.jsx";
import CardFeedback from "../components/cards/CardFeedback.jsx";
import Loader from "../components/loaders/Loader.jsx";
import Img from '../components/img/Img.jsx';
import { Sun, Moon } from "lucide-react";
import { AnimatePresence } from 'framer-motion';



// Hooks.
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


// Contexts.
import { useTheme } from "../contexts/theme/useTheme.js";
import { useFeedback } from "../contexts/api/useFeedback.js";


// SSF - Sign-in / Sign-up / Recover.
function ScreenSSR({ children }) {

    const [load, setLoad] = useState(true)
    const [userOpacity, setUserOpacity] = useState(0);
    
    const { showMessage } = useFeedback();

    const titles = [
        {
            page: "/sign-in", 
            title:"Bem vindo(a) de volta!", 
            subTitle:"Cadastre-se e tenha sua saúde na palma da mão."
        },
        {
            page: "/sign-up", 
            title:"Estamos prontos para cuidar de você.", 
            subTitle:"Cadastre-se e tenha sua saúde na palma da mão."
        },
        {
            page: "/recover", 
            title:"Redefinir acesso", 
            subTitle:"Não se preocupe, nós te ajudamos a recuperar o acesso rapidinho."
        },
    ]


    const locale = useLocation()

    const { 

        theme,
        changeTheme,
        validateTheme, 

    } = useTheme();


    useEffect(() => {

        const timer = setTimeout(() => {
            setLoad(false)
            setUserOpacity(1)
        }, 3000)

        return (() => clearTimeout(timer))

    }, [])

    

    return (

        <div
        id="login-screen"
        className={`
            w-full 
            min-h-dvh
            flex md:flex-row
            flex-col
            overflow-x-hidden
            relative
            ${validateTheme(theme,"bg-[#FAFAFA]","bg-slate-900")}
            z-[1]
            ${load ? "overflow-y-hidden" : null}
        `}>

            {load && <Loader />}

            <div 
            style={{ opacity: userOpacity }} 
            className={`
                flex
                sm:flex-row
                flex-col
                transition 
                duration-1000
                ease-in-out
                ${load ? "opacity-0 h-0 w-0" : "opacity-100 w-full h-full "}
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
                            relative
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
                        ${validateTheme(theme,"bg-[#FAFAFA]","bg-slate-900")} 
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

                    { children }

                    <div
                        id="container-theme"
                        className="
                        flex 
                        flex-col 
                        gap-4 
                        items-center
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


                <AnimatePresence>
                        { showMessage && <CardFeedback params={ "top-[30px]" }/> }
                </AnimatePresence>
                
            </div>
        </div>
    );
}

export default ScreenSSR;