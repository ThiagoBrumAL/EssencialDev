import { AnimatePresence, motion } from "framer-motion"
import { useApi } from "../../api/api"
import { useEffect, useState } from "react"
import { useTheme } from "../../contexts/theme/useTheme"
import SmallLoader from "../loaders/SmallLoader"
import { Trash } from "lucide-react"

function CardAppointments ({ params }) {

    const api = useApi()
    const { theme, validateTheme } = useTheme()

    const [keyReload, setKeyReload] = useState(false);
    const [deletedStatus, setDeletedStatus] = useState(0);

    const [values, setValues] = useState(null);
    const [user, setUser] = useState(null)

    const [existAppointment, setExistAppointment] = useState(null);
    const [loading, setLoading] = useState(true);

    const [renderConfirmDelete, setRenderConfirmDelete] = useState({ isActive: false, id: null });

    const deleteAppointment = (id) => {
        const body = { id, setDeletedStatus, setRenderConfirmDelete }
        api("delete", "/info/appointments", body)

    }

    useEffect(() => {
        
        const body = { setValues }
        api("get", "/info/appointments", body)
        return

    }, [])

    useEffect(() => {

        const body = { setUser }
        api("get", "/info", body)
        return 

    }, [])

    useEffect(() => {
        if (keyReload) {
            const body = { setValues };
            api("get", "/info/appointments", body);
        }
    }, [keyReload]);

    useEffect(() => {
        if(deletedStatus === 204){
            setKeyReload(prev => !prev)
        }
    }, [deletedStatus])


    useEffect(() => {
        if (values && user) {
            const has = values.some(a => a.patient_id === user.id)
            setExistAppointment(has)
            setLoading(false)
        }
    }, [values, user])


    const MyStyle = ({ text, param }) => {
        return (
            <h1 className={`
                md:text-[1rem]
                text-[0.8rem]
                font-DmSans
                font-bold
                flex
                items-center  
                md:justify-end
                justify-start
            `}>
                <span className={`
                    ${validateTheme(theme, "bg-slate-200", "bg-slate-800")}
                    rounded-xl
                    px-3
                    py-1
                    ${validateTheme(theme, "text-slate-800", "text-slate-400")}
                `}>
                    { text }:
                </span>
                &nbsp;
                &nbsp;
                <span className={`
                    w-auto
                    ${validateTheme(theme, "text-slate-800", "text-slate-400")}  
                `}>
                    { param }
                </span> 
            </h1>
        )
    }

    const handleAppointments = () => {
        const bool = values.some((a) => a.patient_id === user.id)

        if(bool == true) return setExistAppointment(true)
        else return setExistAppointment(false)
    }

    const Line = ({ doctor, date, id, hour, username }) => {

        const transformDate = date.split('')
        transformDate[4] = "/"
        transformDate[7] = "/"
        
        const newDate = transformDate.join("")

        return (

            <motion.div
                layout
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`
                    border-[2px]
                    ${validateTheme(theme, "border-slate-200", "border-slate-500")}
                    rounded-2xl
                    
            `}>
                <div className={`
                    w-full
                    ${validateTheme(theme,"bg-slate-200", "bg-slate-800")}
                    rounded-tr-xl
                    rounded-tl-xl
                    md:px-[32px]
                    px-[22px]
                    py-[12px]
                `}>
                    <h1 className={`
                        md:text-[1rem]
                        text-[0.8rem]
                        ${validateTheme(theme, "text-slate-900", "text-slate-300")}
                        font-DmSans
                        font-bold    
                    `}>

                        Id: { id }
                    </h1>
                </div>
                <div
                    className={`
                        w-full
                        ${validateTheme(theme, "bg-slate-50", "bg-slate-900")}
                        pb-[32px]
                        md:px-[32px]
                        px-[22px] 
                        shadow-lg
                        rounded-br-2xl
                        rounded-bl-xl
                        min-h-[200px]
                    `}>
                        
                        <div className="
                            h-full
                            w-full
                            flex
                            justify-between
                            pt-[24px]
                            md:flex-row
                            flex-col
                            md:gap-0
                            gap-6
                        ">
                            <div className="
                                flex
                                flex-col
                                gap-6
                            ">
                                <div className="
                                    h-auto
                                    w-full
                                    flex
                                    gap-2
                                    items-center
                                ">
                                    <div className="min-h-[34px] min-w-[34px] max-w-[34px] max-h-[34px] rounded-full bg-indigo-400 flex justify-center items-center font-bold text-[#FFFAFE] text-[1.2rem]">

                                        <p className="
                                            font-DmSans
                                            font-bold 
                                            text-[#FFFAFE] 
                                            md:text-[1rem] 
                                            text-[0.9rem]
                                        ">
                                            { doctor?.charAt(2) === "a" ? doctor?.charAt(5) : doctor?.charAt(4) }
                                        </p>
                                        
                                    </div>

                                    <p className={`
                                        md:text-[1rem]
                                        text-[0.8rem]
                                        font-DmSans
                                        font-bold
                                        ${validateTheme(theme, "text-slate-800", "text-slate-400")}  
                                    `}>
                                        { doctor || "Paciente" }
                                    </p>
                                </div>
                                
                                <MyStyle text={ "Data da consulta" } param={ newDate }/>

                            </div>
                            <div className="
                                flex
                                flex-col
                                gap-6
                                justify-end
                            ">
                                <div className="
                                    h-auto
                                    w-full
                                    flex
                                    gap-2
                                    items-center

                                ">
                                    <div className="min-h-[34px] min-w-[34px] max-w-[34px] max-h-[34px] rounded-full bg-yellow-400 flex justify-center items-center ">
                                        <p className="
                                            font-DmSans
                                            font-bold 
                                            text-[#FFFAFE] 
                                            md:text-[1rem] 
                                            text-[0.9rem]
                                        ">
                                            {user?.name?.charAt(0)}
                                        </p>
                                    </div>

                                    <p className={`
                                        md:text-[1rem]
                                        text-[0.8rem]
                                        font-DmSans
                                        font-bold
                                        ${validateTheme(theme, "text-slate-800", "text-slate-400")}  
                                    `}>
                                        { username || "Paciente" }
                                    </p>
                                </div>
                                <MyStyle text={ "Horário da consulta" } param={ hour }/>
                                <motion.button 
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setRenderConfirmDelete(prev => ({
                                    isActive: true, id: id
                                }))}
                                className="
                                        bg-red-600
                                        text-slate-50
                                        py-2
                                        px-4
                                        rounded-lg
                                        font-DmSans
                                        font-bold
                                        text-[1rem]
                                        max-w-[243px]
                                        md:ml-auto
                                        md:mr-0
                                        mr-auto
                                        ml-0
                                "   
                                >
                                    Cancelar agendamento
                                </motion.button>
                            </div>
                        </div>

                </div>
            </motion.div>
            
        )    
    }

    const ConfirmDelete = () => {

        const { id } = renderConfirmDelete 

        return (
            <motion.div
                transition={{ duration: 0.5 }}
                className={`
                    fixed
                    border-[2px]
                    ${validateTheme(theme, "bg-slate-100 border-slate-200", "border-slate-500 bg-slate-900")}
                    rounded-2xl
                    z-50
                    left-[50%]
                    top-[50%]
                    translate-x-[-50%]
                    translate-y-[-50%]
                    min-w-[300px]
                `}
            >
                <div className={`
                    w-full
                    ${validateTheme(theme,"bg-slate-200", "bg-slate-800")}
                    rounded-tr-xl
                    rounded-tl-xl
                    px-[24px]
                    py-[12px]
                `}>
                    <h1 className={`
                        md:text-[1rem]
                        text-[0.8rem]
                        ${validateTheme(theme, "text-slate-900", "text-slate-300")}
                        font-DmSans
                        font-bold    
                    `}>
                        Id: { id }
                    </h1>
                </div>
                <div className="
                    flex
                    flex-col
                    h-full
                    p-[24px]
                ">
                    <div>
                        <h2 className={`
                            md:text-[1rem]
                            text-[0.8rem]
                            ${validateTheme(theme, "text-slate-900", "text-slate-300")}
                            font-DmSans
                            font-bold
                            mb-[50px]   
                        `}>
                            Você realmente deseja cancelar sua consulta?
                        </h2>
                    </div>
                    <div 
                        className="
                            flex
                            gap-2
                            flex-col
                            w-full
                            mt-auto
                        "
                    >
                        <motion.button 
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteAppointment(id)}
                            className="
                                bg-red-600
                                text-slate-50
                                py-2
                                px-4
                                rounded-lg
                                font-DmSans
                                font-bold
                                text-[1rem]
                                flex justify-center
                            "
                        >
                            <span className="flex gap-2">
                                Sim <Trash color="#FFFFFF" height={20} width={20}/>
                            </span>
                        </motion.button>
                        <motion.button 
                            whileTap={{ scale: 0.9 }} 
                            onClick={() => setRenderConfirmDelete(prev => ({
                                isActive: false, id: null
                            }))}
                            className="
                                bg-sky-500
                                text-slate-50
                                py-2
                                px-4
                                rounded-lg
                                font-DmSans
                                font-bold
                                text-[1rem]                        
                            "
                        >
                            Voltar
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        )
    }

    return (
        <div className="
            w-full
            max-w-[896px]
            sm:mb-[0px]
            mb-[42px]
            relative
        ">
            <AnimatePresence>
                {renderConfirmDelete.isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="
                            fixed inset-0
                            bg-black bg-opacity-60 
                            z-40
                        "
                        onClick={() => setRenderConfirmDelete({ isActive: false, id: null })}
                    />
                )}
            </AnimatePresence>
            
            <AnimatePresence>
                { renderConfirmDelete.isActive && <ConfirmDelete/> }
            </AnimatePresence>

            <div className='
                w-full
                max-w-[896px]
                sm:mb-[0px]
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
                        Agendamentos
                    </h2>
                </div>
                
                    <motion.div
                        key={keyReload}
                        style={{ scrollbarWidth: "none" }}
                        className={`
                            flex flex-col gap-4
                            min-h-[380px] max-h-[450px]
                            overflow-y-scroll rounded-xl relative
                        `}
                    >

                        {loading && (
                            <div className="flex w-full h-full justify-center items-center">
                                <SmallLoader />
                            </div>
                        )}

                        {!loading && existAppointment && (
                            <AnimatePresence mode="popLayout">
                                {values?.map((field) => {
                                    if(user && user.id === field.patient_id){
                                        return (
                                            <Line
                                                key={field.id}
                                                id={field.id}
                                                doctor={field.specialist}
                                                hour={field.hour}
                                                date={field.date}
                                                username={field.patientName}
                                            />
                                        );
                                    }
                                })}
                            </AnimatePresence>
                        )}

                        {!loading && existAppointment === false && (
                            <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex w-full justify-center">
                                <h1 className={`
                                    md:text-[1.375rem]
                                    text-[1.125rem]
                                    ${validateTheme(theme, "text-slate-700", "text-slate-500")}
                                    font-DmSans font-bold text-center
                                `}>
                                    Ops! Você não possui agendamentos :(
                                </h1>
                            </motion.div>
                        )}

                    </motion.div>
                </div>
            
        </div>
    )
}

export default CardAppointments