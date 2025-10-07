import { useState } from "react";
import { Lightbulb } from "lucide-react";
import ButtonTheme from "../components/LoginComponents/ButtonTheme";
import FormSignIn from "../components/LoginComponents/FormSignIn";
import FormSignUp from "../components/LoginComponents/FormSignUp";
import FormRecover from "../components/LoginComponents/FormRecover";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import Title from "../components/LoginComponents/Title";
import Welcome from "./Welcome";
import Home from "./Home";

function ScreenForm() {
    const navigate = useNavigate();
    const locale = useLocation()

    const [fields] = useState([
        { name: "Nome Completo", type: "text", placeholder: "Insira seu nome completo", link: false, id:"name",  },
        { name: "Altura", type: "text", placeholder: "Insira sua altura", link: false, id:"height", regex:""},
        { name: "Data de Nascimento", type: "text", placeholder: "Insira sua data de nascimento", link: false, id:"birthday", regex:""},
        { name: "Peso", type: "text", placeholder: "Insira seu peso", link: false, id:"weight", regex:""},
        { name: "E-mail", type: "email", placeholder: "Insira seu email", link: false, id:"email", regex:""},
        { name: "Senha", type: "password", placeholder: "Insira sua senha", link: true, id:"password", regex:""},
    ]);

    const [titles] = useState([
        {page: "/sign-in", title:"Bem vindo(a) de volta!", subTitle:"Cadastre-se e tenha sua saúde na palma da mão."},
        {page: "/sign-up", title:"Estamos prontos para cuidar de você.", subTitle:"Cadastre-se e tenha sua saúde na palma da mão."},
        {page: "/recover", title:"Você esqueceu sua senha", subTitle:"Não se apavore!"},
    ])

    async function sendDatas(event){
        event.preventDefault();

        const authorized = document.getElementById("authorized");
        const data = {
            role: "pacient"
        };

        for(let f of fields){
            if(!(document.getElementById(f.id).value)){
                const field = document.getElementById(`${f.id}`);
                field.placeholder = "Campo obrigatório";
                field.style.borderColor = "oklch(70.4% 0.191 22.216)";
                field.classList.add("placeholder-red-400");
                

                throw new Error("Field Blank");
            }else{
                if(f.id === "height" || f.id === "weight"){
                    const value = document.getElementById(f.id).value;
                    data[f.id] = parseFloat(value);
                }else{
                    data[f.id] =  document.getElementById(f.id).value;
                }
            }
        }

        if(!authorized) throw new Error("Field Blank");
        data["authorized"] = authorized.checked;

        try {
            const response =  await fetch("https://essencial-server.vercel.app/auth/sign-up", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(data)
            })
            console.log(data);
            if(response.ok) return navigate(<Home />)
        } catch (error) {
            console.log(error.message);
            return false;
        }
        
    }

    const [theme, setTheme] = useState(true);
    const changeTheme = () => {
        setTheme((prev) => !prev);
    };

    function validateTheme(theme, light, dark) {
        return theme ? light : dark;
    }

    return (
        <div
        id="login-screen"
        className="w-full min-h-dvh flex md:flex-row flex-col"
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
            )} w-full min-h-dvh flex items-center justify-between py-4 flex-col px-[24px]`}
        >

            <Routes>
                <Route path="/sign-in" element={<FormSignIn theme={theme} validateTheme={validateTheme} fields={fields} />}></Route>
                <Route path="/sign-up" element={<FormSignUp theme={theme} validateTheme={validateTheme} fields={fields} sendDatas={sendDatas}/>}></Route>
                <Route path="/recover" element={<FormRecover theme={theme} validateTheme={validateTheme} fields={fields}/>}></Route>
                <Route path="/" element={<Welcome theme={theme} validateTheme={validateTheme}/>}></Route>
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
