
// Components
import ButtonMain from "./ButtonMain";
import FormField from "./FormField";
import TextLink from "./TextLink";

// Função para enviar os dados
import { sendDatasPost } from "../../api/api.jsx";

// Hooks
import { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";

// Contexts
import { ScreenContext } from "../../contexts/ScreenContext.jsx";
import { GlobalContext } from "../../contexts/GlobalContext.jsx";





function FormSignUp(){

    const locale = useLocation()

    // Estado (State) criado para executar um transição suave entre alternância de formulário.
    const [userOpacity, setUserOpacity] = useState(0);

    // useEffect criado para monitorar o path atual. Caso ele seja igual ao path pertencente ao formulário, eu renderizo ele.
    useEffect(() => {
        if(locale.pathname === "/sign-up") setUserOpacity(1)
    }, [locale.pathname])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    })

    // Estado (State) criado para armazenar se os "termos e condições" está preenchido
    const [isChecked, setIsChecked] = useState(null);

    // Estado (State) criado para armazenar a cor dos "termos e condições". Se ele tiver erro, essa cor irá mudar.
    const [checkColor, setCheckColor] = useState("text-slate-500")


    const { 

        fields, // Fields é um estado (state) que guarda todos os valores dos campos input. Ele é um array de objetos, onde cada objeto representa um campo.

    } = useContext(ScreenContext) // useContext é um hook utilizado para transmitir informações para outros componentes sem o uso de props. Dentro dele você deve indicar qual contexto irá ser utilizado.


    const { 

        theme, // Estado (State) que contém qual é o tema que está sendo utilizado pelo usuário.

        validateTheme, // Função que valida e troca o tema.

    } = useContext(GlobalContext) // useContext é um hook utilizado para transmitir informações para outros componentes sem o uso de props. Dentro dele você deve indicar qual contexto irá ser utilizado.

    const [signUpFields, setSignUpFields] = useState(fields.map(field => field.type === "password" ? {...field, link: false} : field ))

    const leftFields = signUpFields.slice(0, (signUpFields.length/2));

    const rightFields = signUpFields.slice(signUpFields.length/2);

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
                                    fields={signUpFields}
                                    setFields={setSignUpFields}
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
                                    fields={signUpFields}
                                    setFields={setSignUpFields}
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
                        sm:mt-[50px 
                        mt-[60px] 
                        relative
                ">
                    <input 
                        type="checkbox" 
                        id="authorized" 
                        checked={isChecked} 
                        onChange={(event) => setIsChecked(event.target.checked)} // A cada mudança o valor do state isChecked é alterado
                        name="authorized" 
                        className="
                            absolute 
                            top-[5px] 
                            w-4 
                            h-4
                    "/>
                    <label 
                        className={`
                            p-0 
                            m-0 
                            inline-block 
                            text-[14px] 
                            ml-[24px] 
                            ${checkColor}
                            font-Inter
                    `}> 
                        Ao criar sua conta, você concorda com os <TextLink message={"Termos e Condições"} link={"https://www.gov.br/esporte/pt-br/acesso-a-informacao/lgpd"}/> e nossa <TextLink message={"Política de Privacidade."} link={"https://www.gov.br/esporte/pt-br/acesso-a-informacao/lgpd"}/>
                    </label>
                </div>

                <div 
                    className="
                        flex 
                        gap-2 
                        items-start 
                        sm:w-[320px] 
                        w-[200px]
                ">
                    <ButtonMain
                        name={"CADASTRAR"}
                        marginTop={"mt-[90px]"}
                        operation={{sendDatasPost}}
                        URL={"https://essencial-server.vercel.app/auth/sign-up"}
                        fields={signUpFields}
                        setFields={setSignUpFields}
                        isChecked={isChecked}
                        setCheckColor={setCheckColor}
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