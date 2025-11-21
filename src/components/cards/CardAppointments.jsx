
import { motion } from "framer-motion"
import { useApi } from "../../api/api"
import { useEffect } from "react"
import { useTheme } from "../../contexts/theme/useTheme"

function CardAppointments ({ params }) {

    const api = useApi()
    const { theme, validateTheme } = useTheme()

    useEffect(() => {
        
        api("get", "/info/appointments")
        return

    }, [])

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

            </div>
            <motion.div
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
                        appointments
                    </form>
            </motion.div>
        </div>
    )
}

export default CardAppointments