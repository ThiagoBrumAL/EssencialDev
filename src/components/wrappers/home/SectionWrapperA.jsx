import React, { memo } from "react"
import Img from "../../img/ImgForHome"
import { motion } from "framer-motion"

const SectionWrapperA = React.memo(function SectionWrapperA({ theme, cloudinary }){
    return (
        <section 
            className="
                p-6
                flex
                justify-center
                items-center
                flex-wrap-reverse
                gap-[40px]
                w-full
        ">
            <div
                className="
                    w-full
                    max-w-[600px]    
            ">
                <div className="
                    mb-[3rem]
                ">
                    <h1 
                        className="
                            font-DmSans
                            md:text-[4.275rem]
                            text-[3rem]
                            font-bold
                            md:leading-[3.975rem]
                            leading-[2.675rem]
                            text-sky-300
                            mb-[1.275rem]
                    ">
                        Agende sua consulta em minutos
                    </h1>
                    <p className="
                        font-DmSans
                        text-[1.275rem]
                        text-[#000000]
                        font-normal
                        leading-normal
                    ">
                        Clínica geral e diversas especialidades em um só lugar.
                    </p>
                </div>

                <motion.button
                    whileTap={{ scale: 0.9 }}
                >
                    <button className="
                        bg-[#A3B3FF]
                        px-6
                        py-2
                        rounded-full
                        text-slate-50
                        font-bold
                        leading-normal
                        text-[1.275rem]
                        shadow-sm
                        duration-200
                        transition-transform
                        md:hover:-translate-y-1
                    ">
                        Agendar Agora
                    </button>
                </motion.button>
                
            </div>
            <div className="
                max-h-[450px]
                max-w-[450px]
            ">
                <Img 
                    light={cloudinary["/home"].imageTop.light}
                    dark={""}
                    theme={theme}
                />
            </div>
        </section>
    )
})

export default SectionWrapperA