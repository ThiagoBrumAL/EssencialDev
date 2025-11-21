import { UserRound, DoorOpen, Image, Lightbulb, X } from 'lucide-react';

import { motion } from 'framer-motion';

import FormFieldUserPage from '../components/inputs/FormFieldUserPage';

import { useEffect, useRef, useState } from 'react';


//Masks
import { maskDate } from '../utils/masks/maskDate'; 
import { maskEmail } from '../utils/masks/maskEmail'; 
import { maskFullName } from '../utils/masks/maskFullName'; 
import { maskHeight } from '../utils/masks/maskHeight'; 
import { maskWeight } from '../utils/masks/maskWeight';  

import { useTheme } from '../contexts/theme/useTheme';
import { useApi } from '../api/api';
import { useLocation } from 'react-router-dom';

function UserPage(){

    const { theme, validateTheme } = useTheme();
    const api = useApi();
    const locale = useLocation();

    const [user, setUser] = useState(null)
    
    const [originalFields, setOriginalFields] = useState([])
    const [showEdit, setShowEdit] = useState(true)

    const [statusReq, setStatusReq] = useState(0)

    const options = [
        {icon: UserRound, text: "Meu Perfil", fn: () => "Hello World", path: "/info"},
        {icon: Image , text: "Meus Agendamentos", fn: () => "Hello World", path: "/appointments"},
        {icon: Lightbulb, text: "Modo claro", fn: () => "Hello World", path: "/theme"},
        {icon: DoorOpen, text: "Sair", fn: () => "Hello World", path: "/logout"}
    ]

    const [fields, setFields] = useState([]);

    const [update, setUpdate] = useState(false);

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
                    text-[0.9rem]
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

    const MyLi = ({ icon: Icon, text, fn, path }) => {

        const isActive = locale.pathname === path

        return (
            <li className='
                w-full
                h-auto
            '>

                <motion.button 
                onClick={() => fn()}
                className='
                    flex
                    items-center
                    gap-2
                    w-full
                    h-full
                    hover:bg-slate-200
                    py-[12px]
                    rounded-lg
                    duration-200
                '>
                    &nbsp;
                    { <Icon color={isActive ? "#000000" : "#777E90"}/> }
                    <span className={` ${isActive ? "text-[#000000]" : "text-[#777E90]"} leading-normal text-[1rem] font-DmSans`}>{ text }</span>
                    &nbsp;
                </motion.button>

            </li>
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
        <div className={`
            w-full
            h-full
            bg-[#FFFAFE]
            transition duration-1000 ease-in-out
            min-h-[100dvh]
            flex
            justify-center
            items-start
            px-[24px]
        `}>
            <section className="
                w-full
                h-auto
                max-w-[1280px]
                pt-[80px]
                flex
                gap-[50px]
                md:flex-row
                flex-col
            ">
                <div className="
                    bg-[#FFFFFF]
                    w-full
                    h-auto
                    md:max-w-[280px]
                    max-h-[572px]
                    shadow-lg
                    rounded-2xl
                    px-[32px]
                    py-[42px]
                    border-[2px]
                    border-slate-200
                ">

                    <ul className='
                        w-full
                        h-full
                    '>
                        {
                            options.map((op, i) => {
                                
                                    if(options.length -1 === options.indexOf(op)){
                                        return <div key={i} className='w-full h-auto mt-[17px]'>< MyLi icon={op.icon} text={op.text} path={op.path}/></div>
                                    }
                                    
                                    return (
                                        <div
                                            key={i}
                                            className='
                                                w-full
                                                h-auto
                                                mt-[12px]
                                        '>
                                            < MyLi icon={op.icon} text={op.text} path={op.path}/>
                                            <hr className='border-slate-200 mt-[12px]'/>
                                        </div>
                                    )
                            })
                        }
                    </ul>

                </div>


                <div className='
                    w-full
                    max-w-[896px]
                    mb-[42px]
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
                            text-[1.275rem]
                            text-[#101828]
                            font-DmSans

                        '>
                            Informações pessoais
                        </h2>
                        { showEdit && <ClassicButton text={"Editar Perfil"} fn={enableFields} pos={"block"}/> }
                    </div>

                    { user &&  <div className='
                        w-full
                        bg-[#FFFFFF] 
                        p-[32px]  
                        shadow-lg
                        rounded-2xl
                        border-[2px]
                        border-slate-200
                    '>
                        <form action=""
                            className='
                                w-full  
                                h-auto
                                pb-[32px]
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
                        <div className='
                            w-full
                            min-h-[45px]
                            flex
                            gap-3
                        '>
                            { update && <ClassicButton text={`Atualizar perfil`} fn={ api } type={"update"}/>}
                            { update && <ClassicButton 
                                text={
                                    <> 
                                        <X height={24} width={24} className='inline-block'/> <span className='text-[0.9rem]'>Cancelar</span>
                                    </>
                                } fn={disableFields} tupe={"classic"}/>}
                            
                        </div>
                        
                    </div>}
                    

                </div>
            </section>
            
        </div>
    )
}

export default UserPage