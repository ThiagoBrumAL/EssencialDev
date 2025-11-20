import { forwardRef } from "react"
import { AnimatePresence, motion } from "framer-motion"

const CardDoctor = forwardRef((props, ref) => {
    
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
                    border-[#B1B5C3]
                    rounded-[20px]
                    snap-start
                    shadow-md
                `}>

                    <div>
                        <div className="
                            w-full
                            h-[273px]
                            bg-teal-400
                            rounded-tl-[16px]
                            rounded-tr-[16px]
                            block
                        "></div>
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
                            <h2 className="
                                text-[#141416]
                                leading-normal
                                font-DmSans
                                text-[1.275rem]
                                text-left
                                mb-[10px]
                            ">
                                {props.specialty}
                            </h2>
                            <p className="
                                text-[#141416]
                                leading-normal
                                font-DmSans
                                text-[1rem]
                            ">
                                {props.desc} 
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <button className="
                                bg-[#A3B3FF]
                                px-6
                                py-2
                                rounded-full
                                text-slate-50
                                font-bold
                                leading-normal
                                text-[1rem]
                                shadow-sm
                                max-w-[210px]
                            ">
                                AGENDAR AGORA
                            </button>
                        </motion.button>
                    </div>
                    
                </div>
            </motion.div>
        </AnimatePresence>
        )
    }
)

export default CardDoctor