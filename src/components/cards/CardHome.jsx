import { forwardRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useTheme } from "../../contexts/theme/useTheme"
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../../contexts/appointment/useAppointment";

const CardHome = forwardRef((props, ref) => {

    const { theme, validateTheme } = useTheme();
    const navigate = useNavigate();

    const { setNameAppt } = useAppointment();

    const mapCard = ( name ) => {
        setNameAppt( name )

        return navigate("/appointments")
    }
    
    return (
        <AnimatePresence mode="wait">
            <motion.div 
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
                
            >
                <div ref={ref} className={`
                    ${props.width <= 407 ? "min-w-[270px]" : "min-w-[352px]"}
                    border-[2px]
                    ${validateTheme(theme, "border-[#B1B5C3]", "border-slate-600")}
                    rounded-[20px]
                    snap-start
                    shadow-md
                `}>

                    <div>
                        <div className={`
                            w-full
                            h-[273px]
                            ${validateTheme(theme,"from-teal-400 to-indigo-400", "from-[#01051C] to-[#051782]")}
                            bg-gradient-to-tr
                            rounded-tl-[16px]
                            rounded-tr-[16px]
                            block
                        `}></div>
                    </div>
                    <div className="
                        w-full
                        px-[24px]
                        pt-[32px]
                        pb-[16px]
                        flex
                        items-center
                        justify-center
                        flex-col
                    ">
                        <div className="
                            mb-[22px]
                        ">
                            <h2 className={`
                                ${validateTheme(theme, "text-[#141416]", "text-slate-200")}
                                leading-normal
                                font-DmSans
                                text-[1.275rem]
                                text-left
                                mb-[10px]
                            `}>
                                {props.doctor.specialty}
                            </h2>
                            <p className={`
                                ${validateTheme(theme, "text-[#141416]", "text-slate-500")}
                                leading-normal
                                font-DmSans
                                text-[1rem]
                            `}>
                                {props.desc} 
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => mapCard({ name: props.doctor.name, spec: props.doctor.specialty })}
                            className={`
                                ${validateTheme(theme, "bg-sky-300", "bg-indigo-600")}
                                px-6
                                py-2
                                rounded-full
                                text-slate-50
                                font-bold
                                leading-normal
                                text-[1rem]
                                shadow-sm
                                max-w-[210px]
                            `}
                        >
                            AGENDAR AGORA
                        </motion.button>
                    </div>
                    
                </div>
            </motion.div>
        </AnimatePresence>
        )
    }
)

export default CardHome