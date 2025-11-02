// Components
import ButtonMain from "../buttons/ButtonMain.jsx";
import FormField from "../inputs/FormField.jsx";
import TextLink from "../texts/TextLink.jsx";

// Hooks
import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

// Contexts
import { useTheme } from "../../contexts/theme/useTheme.js";

//Masks
import { maskDate } from "../../utils/masks/maskDate.js";
import { maskEmail } from "../../utils/masks/maskEmail.js";
import { maskFullName } from "../../utils/masks/maskFullName.js";
import { maskHeight } from "../../utils/masks/maskHeight.js";
import { maskWeight } from "../../utils/masks/maskWeight.js";
import { maskPassword } from "../../utils/masks/maskPassword.js";

//Icons
import { Eye } from "lucide-react";

//Api
import { useApi } from "../../api/api.jsx";

function FormSignUp(){

    const navigate = useNavigate();
    const locale = useLocation()
    const api = useApi();

    const [userOpacity, setUserOpacity] = useState(0);

    useEffect(() => {
        if(locale.pathname === "/sign-up") setUserOpacity(1)
    }, [locale.pathname])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    },  [locale.pathname])

    const [isChecked, setIsChecked] = useState(null);
    const [checkColor, setCheckColor] = useState("text-slate-500")

    const { 
        theme, 
        validateTheme,
    } = useTheme() 

    const [fields, setFields] = useState([

        //Full Name
        { 
            
            id: "name",
            name: "Nome Completo", 
            type: "text",
            value: "",
            regex: "",
            link: false, 
            mask: maskFullName,
            icon: null,
            disabled: false,
            placeholder: "Insira seu nome completo",
            hasErrorInField: false,
            messageError: "Campo obrigatório",

        },

        //Height
        { 

            id: "height",
            name:  "Altura",
            type: "text",
            value: "",
            regex: "",
            link: false, 
            mask: maskHeight,
            icon: null,
            disabled: false,
            placeholder: "Insira sua altura", 
            hasErrorInField: false,
            messageError: "Campo obrigatório",

        },

        //Born Date
        { 

            id: "birthday",
            name: "Data de Nascimento",
            type: "text",
            value: "",
            regex: "",
            link: false, 
            mask: maskDate,
            icon: null,
            disabled: false,
            placeholder: "Insira sua data de nascimento",
            hasErrorInField: false,
            messageError: "Campo obrigatório",

        },

        //Weight
        { 

            id: "weight",
            name: "Peso", 
            type: "text",
            value: "",
            regex: "",
            link: false, 
            mask: maskWeight,
            icon: null,
            disabled: false,
            placeholder: "Insira seu peso",
            hasErrorInField: false,
            messageError: "Campo obrigatório",

        },

        //E-mail
        { 

            id: "email",
            name: "E-mail", 
            type: "email",
            value: "",
            regex: "",
            link: false, 
            mask: maskEmail,
            icon: null,
            disabled: false,
            placeholder: "Insira seu email", 
            hasErrorInField: false,
            messageError: "Campo obrigatório",

        },

        //Password
        { 

            id: "password",
            name: "Senha",
            type: "password",
            value: "",
            regex: "",
            link: false,
            mask: maskPassword,
            icon: Eye,
            disabled: false,
            placeholder: "Insira sua senha", 
            hasErrorInField: false,
            messageError: "Campo obrigatório",

        },
    ]);
    
    const leftFields = fields.slice(0, (fields.length/2));
    const rightFields = fields.slice(fields.length/2);

    return (

        <div 
            style={{ opacity: userOpacity }}
            className="
                max-w-[694px]
                w-full 
                flex 
                flex-col 
                items-center 
                mt-[50px]
                transition
                ease-in-out
                duration-700
            ">

            <div
                className={
                    `${validateTheme(theme,"text-slate-950","text-slate-500")} 
                    w-[100%]`
            }>
                <h1 
                    className="
                        font-[700] 
                        text-[1.50rem]
                        font-Inter
                    ">
                    Faça seu login agora!
                </h1>
                <p 
                    className="
                        text-[0.95rem] 
                        mb-[20px] 
                        md:mb-[70px]
                        font-Inter
                ">
                    Seu cuidado começa aqui. Crie sua conta em poucos passos.
                </p>
            </div>


            <form
                id="form"
                className="
                    w-[100%] 
                    flex 
                    flex-col 
                    items-center"
                action=""
            >

                <div 
                    id="body-form" 
                    className=" 
                        w-full 
                        flex 
                        lg:flex-row 
                        flex-col 
                        lg:gap-[32px]
                ">

                    <div className="w-full">
                        {leftFields.map((field, index) => {

                            return (
                                <FormField
                                    key={index}
                                    field={field}
                                    fields={fields}
                                    setFields={setFields}
                                />
                            );

                        })}
                    </div>

                    <div className="w-full">
                        {rightFields.map((field, index) => {

                            return (
                                <FormField
                                    key={index}
                                    field={field}
                                    fields={fields}
                                    setFields={setFields}
                                />
                            );

                        })}
                    </div>

                </div>

                <div 
                    className="
                        flex 
                        gap-2 
                        max-w-[450px] 
                        sm:mt-[50px]
                        mt-[60px] 
                ">
                    <input 
                        type="checkbox" 
                        id="authorizedTerms" 
                        checked={isChecked} 
                        onChange={(event) => setIsChecked(event.target.checked)}
                        name="authorizedTerms" 
                        className="
                            justify-self-end
                            w-6
                            h-6
                    "/>
                    <label 
                        className={`
                            block
                            p-0 
                            m-0
                            text-[14px] 
                            ${checkColor}
                            font-Inter
                    `}> 
                        Ao criar sua conta, você concorda com os <TextLink message={"Termos e Condições"} link={"https://www.gov.br/esporte/pt-br/acesso-a-informacao/lgpd"}/> e nossa <TextLink message={"Política de Privacidade."} link={"https://www.gov.br/esporte/pt-br/acesso-a-informacao/lgpd"}/>
                    </label>
                </div>

                <div className="
                    max-w-[320px]
                    w-full
                ">
                    
                    <ButtonMain
                        name={ "CADASTRAR" }
                        operation={ { api } }
                        where={ locale.pathname }
                        method={ "post" }
                        
                        body={{ 

                            fields, 
                            setFields, 
                            isChecked, 
                            setCheckColor, 
                            path: locale.pathname,
                            navigate
                            
                        }}
                    />
                </div>
                    
            </form>

            <p 
                className={`
                    m-0 
                    p-0 
                    text-slate-500 
                    font-[600] 
                    text-[0.90rem]
                    font-Inter
                    mt-[24px]
                    mb-[36px]
            `}>
                Já possui conta?
                &nbsp;
                <Link to={"/sign-in"} className={`${validateTheme(theme,"text-indigo-300", "text-indigo-700")}`}>
                    Faça o seu Login
                </Link>
            </p>
        </div>
    )
}

export default FormSignUp;