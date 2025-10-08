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
import Home from "./Home";

//My Handlings
import { handlingFullname, maskHeightWeightDate, maskFullName, maskPassword, maskEmail } from "../handlings/functions.js"

function ScreenForm() {
    // const navigate = useNavigate();
    const locale = useLocation()
    const [theme, setTheme] = useState(true);
    
    const [fields, setFields] = useState([
        { 
            name: "Nome Completo", 
            type: "text", 
            placeholder: "Insira seu nome completo", 
            link: false, 
            id:"name",
            empty: false,
            mask: maskFullName
        },
        { 
            name: "Altura", 
            type: "text", 
            placeholder: "Insira sua altura", 
            link: false, 
            id:"height", 
            mask: maskHeightWeightDate,
        },
        { 
            name: "Data de Nascimento", 
            type: "text", 
            placeholder: "Insira sua data de nascimento", 
            link: false, 
            id:"birthday", 
            mask: maskHeightWeightDate
        },
        { 
            name: "Peso", 
            type: "text", 
            placeholder: "Insira seu peso", 
            link: false, 
            id:"weight", 
            mask: maskHeightWeightDate
        },
        { 
            name: "E-mail", 
            type: "email", 
            placeholder: "Insira seu email", 
            link: false, 
            id:"email",
            mask: maskEmail,
            message: ""
        },
        { 
            name: "Senha", 
            type: "password", 
            placeholder: "Insira sua senha", 
            link: true, 
            id:"password",
            mask: maskPassword
        },
    ]);

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

    function validateFields(array){
        const newFields = array.map((f) => {
            if(!f.empty) return {...f, empty: true, placeholder: "Campo obrigatório"};
        })

        setFields(newFields);
    }

    function validateEmail(value, array){
        const providers = [
            "@gmail.com",
            "@outlook.com",
            "@hotmail.com",
            "@yahoo.com",
            "@protonmail.com",
            "@zoho.com",
            "@icloud.com",
            "@aol.com",
            "@gmx.com",
            "@yandex.com",
            "@mail.com",
            "@fastmail.com",
            "@tutanota.com"
        ]

        let index = value.indexOf("@");
        let provider = value.slice(index, value.length);

        const newFields = array.map((f) => {
            if(!f.empty) return {...f, empty: true, placeholder: "Campo obrigatório"};
            if(f.type === "email" && !(providers.includes(provider))) return {...f, empty: true, message: "Provedor não encontrado"}
        })
        
        setFields(newFields);
    }




    async function sendDatas(event){
        event.preventDefault();

        const authorized = document.getElementById("authorized");
        const data = {
            role: "pacient"
        };

        for(let f of fields){
            const field = document.getElementById(`${f.id}`);

            if(!(document.getElementById(f.id).value)){
                field.placeholder = "Campo obrigatório";
                validateFields(fields);
                if(f.type === "email") validateEmail(document.getElementById(f.id).value, fields)

                throw new Error("Field Blank");
            }else{
                field.classList.remove("border-red-500")
                field.classList.remove("placeholder:text-red-500")

                if(f.id === "height" || f.id === "weight"){
                    const value = document.getElementById(f.id).value;
                    data[f.id] = parseFloat(value);
                }else{
                    data[f.id] =  document.getElementById(f.id).value;
                }
            }
        }

        data["name"] = handlingFullname(data.name);

        if(!authorized) throw new Error("Field Blank");
        data["authorized"] = authorized.checked;

        try {
            // const response =  await fetch("https://essencial-server.vercel.app/auth/sign-up", {
            //     method: "POST",
            //     headers: {"Content-type": "application/json"},
            //     body: JSON.stringify(data)
            // })
            console.log(data);
            // if(response.ok) return navigate(<Home />)
        } catch (error) {
            console.log(error.message);
            return false;
        }
        
    }





    
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
