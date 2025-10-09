import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { Routes, Route, useLocation } from "react-router-dom"

// My Components
import ButtonTheme from "../components/LoginComponents/ButtonTheme";
import FormSignIn from "../components/LoginComponents/FormSignIn";
import FormSignUp from "../components/LoginComponents/FormSignUp";
import FormRecover from "../components/LoginComponents/FormRecover";
import Title from "../components/LoginComponents/Title";
import Welcome from "./Welcome";
import CardFeddback from "../components/LoginComponents/CardFeedback.jsx";
import Home from "./Home";

//My Handlings

function ScreenForm() {
    // const navigate = useNavigate();
    const locale = useLocation()
    const [theme, setTheme] = useState(true);

    const [titles] = useState([
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
            title:"Você esqueceu sua senha", 
            subTitle:"Não se apavore!"
        },
    ])
    
    const changeTheme = () => {
        setTheme((prev) => !prev);
    };



    function validateTheme(theme, light, dark) {
        return theme ? light : dark;
    }



    return (
        <div
        id="login-screen"
        className="w-full min-h-dvh flex md:flex-row flex-col overflow-x-hidden"
        >
        {locale.pathname === "/" ? null : <section
            id="login-screen-section-one"
            className={` hidden sm:block w-full min-h-full bg-gradient-to-tr ${validateTheme(
            theme,
            "from-teal-400 to-indigo-400",
            "from-slate-950 to-slate-800"
            )} py-6 px-[24px]`}
        >
            <div className="h-[50%] w-full flex justify-center items-center">
                <Title path={locale.pathname} titles={titles}/>
            </div>

            <div className="h-[50%] w-full flex justify-center ">
            <img
                id="logo"
                className="max-h-[180px] max-w-[242px]"
                src="/Vector.png"
                alt=""
            />
            </div>
        </section>}

        <section
            id="login-screen-div-two"
            className={`${validateTheme(
            theme,
            "bg-slate-50",
            "bg-slate-900"
            )} w-full min-h-dvh flex items-center justify-between py-4 flex-col px-[24px] relative`}
        >

            <Routes>
                <Route 
                    path="/sign-in" 
                    element={
                        <FormSignIn 
                            theme={theme} 
                            validateTheme={validateTheme} 
                        />
                    }>
                </Route>

                <Route 
                    path="/sign-up" 
                    element={
                        <FormSignUp 
                            theme={theme} 
                            validateTheme={validateTheme} 
                        />
                    }>
                </Route>

                <Route 
                    path="/recover" 
                    element={
                        <FormRecover 
                            theme={theme} 
                            validateTheme={validateTheme} 
                        />
                    }>
                </Route>

                <Route 
                    path="/" 
                    element={
                        <Welcome 
                            theme={theme} 
                            validateTheme={validateTheme}
                        />
                    }>
                </Route>
            </Routes>
            

            <div
            id="container-theme"
            className="flex flex-col gap-4 items-center mt-2 sm:gap-12 sm:flex-row"
            >
                <div className="flex gap-1 items-center">
                    <Lightbulb className={`m-0 p-0 text-slate-500 font-[500] `} />

                    <p className="m-0 p-0 text-slate-500 font-[500]">
                    {validateTheme(theme, "Modo escuro", "Modo claro")}
                    </p>
                </div>
                <div className="flex items-center">
                    <ButtonTheme theme={theme} changeTheme={changeTheme} />
                </div>
            </div>
        </section>
        </div>
    );
}

export default ScreenForm;
