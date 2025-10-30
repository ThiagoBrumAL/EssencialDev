
// Components
import ButtonMain from "./ButtonMain";
import FormField from "./FormField";

// Função para enviar os dados
import { sendDatasPost } from "../../api/api.jsx";

// Hooks
import { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

// Contexts
import { ScreenContext } from "../../contexts/ScreenContext.jsx";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { GlobalContext } from "../../contexts/GlobalContext.jsx";


function FormSignIn(){

    const locale = useLocation()

     // Estado (State) criado para executar um transição suave entre alternância de formulário.
    const [userOpacity, setUserOpacity] = useState(0);

    // useEffect criado para monitorar o path atual. Caso ele seja igual ao path pertencente ao formulário, eu renderizo ele.
    useEffect(() => {

        if(locale.pathname === "/sign-in") setUserOpacity(1)

    }, [locale.pathname])

    useEffect(() => {
        
        window.scrollTo({ top: 0, behavior: "smooth" })

    },  [locale.pathname])

    const { 

        fields, // Fields é um estado (state) que guarda todos os valores dos campos input. Ele é um array de objetos, onde cada objeto representa um campo.

    } = useContext(ScreenContext) // useContext é um hook utilizado para transmitir informações para outros componentes sem o uso de props. Dentro dele você deve indicar qual contexto irá ser utilizado.

    const { 

        theme, // Estado (State) que contém qual é o tema que está sendo utilizado pelo usuário.

        validateTheme, // Função que valida e troca o tema.

    } = useContext(GlobalContext) // useContext é um hook utilizado para transmitir informações para outros componentes sem o uso de props. Dentro dele você deve indicar qual contexto irá ser utilizado.

    const { login } = useContext(AuthContext)

    const [signInFields, setSignInFields] = useState(fields.filter(field => field.type === "password" || field.type === "email"))

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

                    {signInFields.map((field, index) => {
                        return (
                            <FormField
                                key={index}
                                field={field}
                                fields={signInFields}
                                setFields={setSignInFields}
                            />
                        )
                    })}
                    
                    <ButtonMain
                        name={"ENTRAR"}
                        marginTop={"mt-[90px]"}
                        operation={{ sendDatasPost, login }}
                        URL={"https://essencial-server.vercel.app/auth/sign-in"}
                        fields={signInFields}
                        setFields={setSignInFields}
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