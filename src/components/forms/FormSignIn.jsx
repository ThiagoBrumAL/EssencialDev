
// Components
import ButtonMain from '../buttons/ButtonMain.jsx'
import FormField from "../inputs/FormField.jsx";

// Hooks
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

// Contexts
import { useTheme } from "../../contexts/theme/useTheme.js";
import { useAuth } from "../../contexts/auth/useAuth.js";

//Masks
import { maskEmail } from "../../utils/masks/maskEmail.js";
import { maskPassword } from "../../utils/masks/maskPassword.js";

//Icons
import { Eye } from "lucide-react";

//Api
import { useApi } from "../../api/api.jsx";


function FormSignIn(){

    const navigate = useNavigate();
    const locale = useLocation()
    const api = useApi();

    const [userOpacity, setUserOpacity] = useState(0);

    useEffect(() => {
        if(locale.pathname === "/sign-in") setUserOpacity(1)
    }, [locale.pathname])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    },  [locale.pathname])

    const { 
        theme,
        validateTheme,
    } = useTheme()

    const { login } = useAuth();

    const [fields, setFields] = useState([

            //E-mail
            { 
    
                id: "email",
                name: "E-mail", 
                type: "email",
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
                regex: "",
                link: true,
                mask: maskPassword,
                icon: Eye,
                disabled: false,
                placeholder: "Insira sua senha", 
                hasErrorInField: false,
                messageError: "Campo obrigatório",
    
            },
        ]);

    return (
        <div 
            style={{ opacity: userOpacity }}
            className="
                max-w-[436px] 
                w-full 
                flex 
                flex-col 
                items-center 
                md:mt-[100px] 
                mt-[50px]
                transition
                ease-in-out
                duration-700
        ">
            <div 
                className="
                    flex 
                    justify-center 
                    flex-col 
                    w-full
            ">
                <div
                    className={`
                        ${validateTheme(theme,"text-slate-950","text-slate-500")} 
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
                        Deixe seus exames em dia.
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

                    {fields.map((field, index) => {
                        return (
                            <FormField
                                key={index}
                                field={field}
                                fields={fields}
                                setFields={setFields}
                            />
                        )
                    })}
                    
                    <ButtonMain
                        name={"ENTRAR"}
                        operation={ { api, login } }
                        where={ locale.pathname }
                        method={ "post" }

                        body={{ 
                            fields, 
                            setFields, 
                            navigate 
                        }}
                    />
                </form>
            </div>

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
                Não possui conta?
                &nbsp;
                <Link to={"/sign-up"} className={`${validateTheme(theme,"text-indigo-300", "text-indigo-700")}`}>
                    Faça o seu Cadastro
                </Link>
            </p>
        </div>
    )
}

export default FormSignIn