import { AnimatePresence, motion, transform } from "framer-motion"
import { useApi } from "../../api/api"
import { useEffect, useState } from "react"
import { useTheme } from "../../contexts/theme/useTheme"
import SmallLoader from "../loaders/SmallLoader"

function CardAppointments ({ params }) {

    const api = useApi()
    const { theme, validateTheme } = useTheme()

    const [values, setValues] = useState(null);
    const [user, setUser] = useState(null)

    useEffect(() => {
        
        const body = { setValues }

        api("get", "/info/appointments", body)
        return

    }, [])

    useEffect(() => {

        const body = { setUser }
        api("get", "/info", body)

    }, [])


    const MyStyle = ({ text, param }) => {
        return (
            <h1 className={`
                md:text-[1rem]
                text-[0.8rem]
                font-DmSans
                font-bold
                flex
                items-center  
                justify-end    
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
                            </div>
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
                        Agendamentos
                    </h2>
                </div>
                
                <motion.div
                style={{ scrollbarWidth: "none" }}
                className={`
                    flex
                    flex-col
                    gap-4
                    min-h-[380px]
                    max-h-[450px]
                    overflow-y-scroll
                    rounded-xl
                    relative
                `}>
                    
                    {user && <AnimatePresence mode="popLayout">
                        {values && values ? values.map((field) => {

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
                                )
                            }
                        }) : <SmallLoader />}
                    </AnimatePresence> }

                </motion.div>
                
            </div>
            
        </div>
    )
}

export default CardAppointments