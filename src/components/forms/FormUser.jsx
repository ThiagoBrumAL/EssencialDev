import { useApi } from "../../api/api";
import { useLocation } from "react-router-dom";
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

    const ClassicButton = ({ text, fn, type }) => {

        const body = { fields, setFields, setStatusReq }

        return (
            <motion.button
                onClick={() => fn && type === "update" ? fn("patch", "/info/update", body) : fn()}
                whileTap={{ scale: 0.9 }} className={`
                    block
                    ${type === "update" ? "text-white ": "text-slate-950"}
                    ${type === "update" ? "bg-gradient-to-tr ": null}
                    md:text-[0.9rem]
                    text[0.8rem]
                    px-3
                    py-2
                    ${type === "update" ? validateTheme(theme, "from-teal-400 to-indigo-400" , "from-[#01051C] to-[#051782]") : "bg-white border-[2px] border-slate-200"}
                    rounded-xl
                    hover:cursor-pointer
                    font-DmSans
            `}>
                { text }
            </motion.button>
        )
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
                    <h2 className='
                        md:text-[1.275rem]
                        tetx-[1rem]
                        text-[#101828]
                        font-DmSans

                    '>
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
                    className='
                        w-full
                        bg-[#FFFFFF] 
                        p-[32px]  
                        shadow-lg
                        rounded-2xl
                        border-[2px]
                        border-slate-200
                    '>
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
                            { update && <ClassicButton text={`Atualizar perfil`} fn={ api } type={"update"}/>}
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