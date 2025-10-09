import MessageAfterLink from "./MessageAfterLink";
import ButtonMain from "./ButtonMain";
import FormField from "./FormField";
import { useState } from "react";
import { maskPassword, maskEmail, validateEmail } from "../../handlings/functions"

function FormSignIn({theme, validateTheme}){

    const [fields, setFields] = useState([
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

    function validateInputsFields(){
        let data = {}
        let newFields = [...fields];
        
        newFields = newFields.map((f) => {
            const field = document.getElementById(`${f.id}`);

            if(!(field.value.trim())){
                return {...f, hasErrorInField: true}
            }else{

                if(f.id === "email"){
                    return validateEmail(field.value, f);
                }

                data[f.id] =  field.value;
                return {...f, hasErrorInField: false}
            }
        })

        setFields(newFields)
        return data;
    }

    async function sendDatas(event){
        event.preventDefault();
        
        const newData = validateInputsFields();
        console.log(newData);
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

    return (
        <div className="max-w-[436px] w-full flex flex-col items-center md:mt-[100px]">
            <div className="flex justify-center flex-col w-full">
                <div
                className={`${validateTheme(
                    theme,
                    "text-slate-950",
                    "text-slate-500"
                )} w-[100%]`}
                >
                    <h1 className="font-[700] text-[28px]">
                        Faça seu login agora!
                    </h1>
                    <p className="text-[16px] mb-[20px] md:mb-[70px]">
                        Deixe seus exames em dia.
                    </p>
                </div>
                <form
                id="form"
                className="sm:mb-[31px] w-[100%] flex flex-col items-center"
                action=""
                >
                {fields.map((field, index) => {
                    return (
                    <FormField
                        key={index}
                        object={field}
                        theme={theme}
                        functionTheme={validateTheme}
                        bool={field.link ?? false}
                        id={field.id}
                    />
                    );
                })}
                <ButtonMain
                    marginDefault={"mt-[30px]"}
                    marginResponsive={"sm:mt-[90px]"}
                    name={"ENTRAR"}
                    operation={sendDatas}
                />
                </form>
            </div>

            <MessageAfterLink
                message1={"Não possui conta?"}
                message2={"Faça o seu Cadastro"}
                size={"text-[16px]"}
                link={"/sign-up"}
                flexAlign={"items-center"}
                flexJustify={"justify-center"}
            />
        </div>
    )
}

export default FormSignIn