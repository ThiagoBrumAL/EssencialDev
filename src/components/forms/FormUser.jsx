import { useApi } from "../../api/api";
import { useTheme } from "../../contexts/theme/useTheme";
import { useState, useEffect } from "react";

import { motion } from "framer-motion";

//Masks
import { maskDate } from "../../utils/masks/maskDate.js";
import { maskEmail } from "../../utils/masks/maskEmail.js";
import { maskFullName } from "../../utils/masks/maskFullName.js";
import { maskHeight } from "../../utils/masks/maskHeight.js";
import { maskWeight } from "../../utils/masks/maskWeight.js";

import FormFieldUserPage from "../inputs/FormFieldUserPage.jsx";
import ClassicButton from "../buttons/ClassicButton.jsx";

import { X } from "lucide-react";
import SmallLoader from "../loaders/SmallLoader.jsx";

function FormUser() {

    const { theme, validateTheme } = useTheme();
    const api = useApi();

    const [user, setUser] = useState(null)
        
    const [originalFields, setOriginalFields] = useState([])

    const [statusReq, setStatusReq] = useState(0)

    const [showEdit, setShowEdit] = useState(true)

    const [update, setUpdate] = useState(false);

    const [fields, setFields] = useState([]);

    const leftFields = fields.slice(0, (fields.length/2));
    const rightFields = fields.slice(fields.length/2);

    const enableFields = () => {

        setShowEdit(false);

        const newFields = fields.map((field) => {
            return { ...field, disabled: false }
        })

        setFields(newFields)
        setUpdate(true)
    }

    const disableFields = () => {

        setShowEdit(true);
        setFields(originalFields)
        setUpdate(false)
    }

    useEffect(() => {

        const body = { setUser }
        api("get", "/info", body)

    }, [])

    useEffect(() => {
        if(statusReq === 200){
            const body = { setUser };
            api("get", "/info", body);
            setUpdate(false);
            setShowEdit(true);
        }

        setTimeout(() => {
            setStatusReq(0)
        }, 1500)

    }, [statusReq])

    useEffect(() => {

        if(!user) return;
        
        const newFields = [
            { 
                
                id: "name",
                name: "Nome Completo", 
                type: "text",
                originType: "text",
                value: user.name,
                regex: "",
                link: false, 
                mask: maskFullName,
                icon: null,
                disabled: true,
                placeholder: "Insira seu nome completo",
                hasErrorInField: false,
                messageError: "Campo obrigatório",

            },

            //Height
            { 

                id: "height",
                name:  "Altura",
                type: "text",
                originType: "text",
                value: String(user.height),
                regex: "",
                link: false, 
                mask: maskHeight,
                icon: null,
                disabled: true,
                placeholder: "Insira sua altura", 
                hasErrorInField: false,
                messageError: "Campo obrigatório",

            },

            //Born Date
            { 

                id: "birthday",
                name: "Data de Nascimento",
                type: "text",
                originType: "text",
                value: String(user.birthday),
                regex: "",
                link: false, 
                mask: maskDate,
                icon: null,
                disabled: true,
                placeholder: "Insira sua data de nascimento",
                hasErrorInField: false,
                messageError: "Campo obrigatório",

            },

            //Weight
            { 

                id: "weight",
                name: "Peso", 
                type: "text",
                originType: "text",
                value: String(user.weight),
                regex: "",
                link: false, 
                mask: maskWeight,
                icon: null,
                disabled: true,
                placeholder: "Insira seu peso",
                hasErrorInField: false,
                messageError: "Campo obrigatório",

            },

            //E-mail
            { 

                id: "email",
                name: "E-mail", 
                type: "email",
                originType: "email",
                value: user.email,
                regex: "",
                link: false, 
                mask: maskEmail,
                icon: null,
                disabled: true,
                placeholder: "Insira seu email", 
                hasErrorInField: false,
                messageError: "Campo obrigatório",

            },

            //Sub
            { 

                id: "sub",
                name: "Sub",
                type: "text",
                originType: "sub",
                value: user.id,
                regex: "",
                link: false,
                mask: (v) => v,
                icon: null,
                disabled: true,
                placeholder: "", 
                hasErrorInField: false,
                messageError: "",

            }
        ]

        setFields(newFields)
        setOriginalFields(newFields)
    }, [user, statusReq])

    return (
        <div className="
            w-full
            max-w-[896px]
            sm:mb-[0px]
            mb-[42px]
            relative
        ">
            <div className='
                w-full
                max-w-[896px]
                sm:mb-[0px]
                mb-[42px]
                relative
            '>

                <div className='
                    h-[41px]
                    w-full
                    flex
                    justify-between
                    items-center
                    mb-[32px]
                '>
                    <h2 className={`
                        text-[1.475rem]
                        ${validateTheme(theme, "text-black", "text-slate-500")}
                        font-DmSans
                        font-bold
                    `}>
                        Informações pessoais
                    </h2>
                    { showEdit && user ? <ClassicButton text={"Editar Perfil"} fn={enableFields} pos={"block"} type={"edit"}/> : null}
                </div>

            </div>
            <div className="
                w-full
                h-full
                relative
            ">
                {user ? <motion.div
                    layout
                    transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
                    exit={{ opacity: 0 }}
                    className={`
                        w-full
                        ${validateTheme(theme, "bg-white border-slate-200", "bg-slate-900 border-slate-800")}
                        p-[32px]  
                        shadow-lg
                        rounded-2xl
                        border-[3px]
                    `}>
                        <form 
                            layout="true"
                            action=""
                            className='
                                w-full  
                                h-auto
                        '>
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
                                            <FormFieldUserPage
                                                key={index}
                                                value={field.value}
                                                body={{
                                                    field,
                                                    fields,
                                                    setFields
                                                }}
                                            />
                                        );

                                    })}
                                </div>

                                <div className="w-full">
                                    {rightFields.map((field, index) => {

                                        return (
                                            <FormFieldUserPage
                                                key={index}
                                                value={field.value}
                                                body={{
                                                    field,
                                                    fields,
                                                    setFields
                                                }}
                                            />
                                        );

                                    })}
                                </div>

                            </div>
                        </form>
                        <motion.div 
                        layout
                        className='
                            w-full
                            h-auto
                            flex
                            gap-3
                            md:flex-row
                            flex-col
                        '>
                            { update && <ClassicButton text={`Atualizar perfil`} fn={ api } type={"update"} body={{ fields, setFields, setStatusReq }}/>}
                            { update && <ClassicButton 
                                text={
                                    <> 
                                        <X height={24} width={24} className='inline-block'/> <span className='text-[0.9rem]'>Cancelar</span>
                                    </>
                                } fn={disableFields} tupe={"classic"}/>}
                            
                        </motion.div>
                </motion.div> : <SmallLoader />}
            </div>
        </div>
    )
}

export default FormUser;