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
import { maskHeightWeightDate, maskFullName, maskPassword, maskEmail } from "../handlings/functions.js"

function ScreenForm() {
    // const navigate = useNavigate();
    const locale = useLocation()
    const [theme, setTheme] = useState(true);
    const [messageFeedback] = useState("")
    const [error, setError] = useState(false)
    
    const [fields, setFields] = useState([
        { 
            name: "Nome Completo", 
            type: "text", 
            placeholder: "Insira seu nome completo", 
            link: false, 
            id:"name",
            mask: maskFullName,
            hasErrorInField: false,
            messageError: "Campo obrigatório"
        },
        { 
            name: "Altura", 
            type: "text", 
            placeholder: "Insira sua altura", 
            link: false, 
            id:"height",
            mask: maskHeightWeightDate,
            hasErrorInField: false,
            messageError: "Campo obrigatório"
        },
        { 
            name: "Data de Nascimento", 
            type: "text", 
            placeholder: "Insira sua data de nascimento", 
            link: false, 
            id:"birthday",
            mask: maskHeightWeightDate,
            hasErrorInField: false,
            messageError: "Campo obrigatório"
        },
        { 
            name: "Peso", 
            type: "text", 
            placeholder: "Insira seu peso", 
            link: false, 
            id:"weight",
            mask: maskHeightWeightDate,
            hasErrorInField: false,
            messageError: "Campo obrigatório"
        },
        { 
            name: "E-mail", 
            type: "email", 
            placeholder: "Insira seu email", 
            link: false, 
            id:"email",
            mask: maskEmail,
            hasErrorInField: false,
            messageError: "Campo obrigatório"
        },
        { 
            name: "Senha", 
            type: "password", 
            placeholder: "Insira sua senha", 
            link: true, 
            id:"password",
            mask: maskPassword,
            hasErrorInField: false,
            messageError: "Campo obrigatório"
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

    function validateEmail(value, id){
        const providers = [
            "@gmail.com",
            "@outlook.com",
            "@outlook.pt",
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

        if(!providers.includes(provider)){
            setError(true);
            let newFields = fields.map((f) => {
                if(f.id === id){
                    return {...f, hasErrorInField: true, messageError: "Provedor inválido"}
                }else{
                    return {...f}
                }
            })
            setFields(newFields);
            throw new Error("Provider Error");
        }
    }

    function validateInputsFields(data){
        let newFields = [...fields];
        
        newFields = newFields.map((f) => {
            const field = document.getElementById(`${f.id}`);

            if(!(field.value.trim())){
                setError(true);
                return {...f, hasErrorInField: true}
            }else{
                setError(false);

                if(f.id === "email"){
                    validateEmail(field.value, f.id);
                }

                if(f.id === "height" || f.id === "weight"){
                    data[f.id] = parseFloat(field.value);
                }else{
                    data[f.id] =  field.value;
                }

                return {...f, hasErrorInField: false}
            }
        })

        setFields(newFields)
        return data;
    }

    async function sendDatas(event){
        event.preventDefault();

        const authorized = document.getElementById("authorized");
        const data = {
            role: "pacient"
        };
        

        const newData = validateInputsFields(data);
        console.log(newData);

        if(!authorized){
            throw new Error("Field Blank");
        } 
        newData["authorized"] = authorized.checked;
        try {
            // const response =  await fetch("https://essencial-server.vercel.app/auth/sign-up", {
            //     method: "POST",
            //     headers: {"Content-type": "application/json"},
            //     body: JSON.stringify(newData)
            // })
            // if(response.ok) console.log(data) 
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
                <Route path="/sign-in" element={<FormSignIn theme={theme} validateTheme={validateTheme} fields={fields} />}></Route>
                <Route path="/sign-up" element={<FormSignUp theme={theme} validateTheme={validateTheme} fields={fields} sendDatas={sendDatas} error={error}/>}></Route>
                <Route path="/recover" element={<FormRecover theme={theme} validateTheme={validateTheme} fields={fields}/>}></Route>
                <Route path="/" element={<Welcome theme={theme} validateTheme={validateTheme}/>}></Route>
            </Routes>
            
            {<CardFeddback message={error ? messageFeedback : undefined}/>}
            

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
