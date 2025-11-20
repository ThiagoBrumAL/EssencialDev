import React, { memo } from "react"
import Img from "../../img/ImgForHome"
import { motion } from "framer-motion"


const SectionWrapperD = React.memo(function SectionWrapperD({ theme, cloudinary }){
    return (
        <section
            className="
                flex
                flex-col
                items-center
                justify-center
                w-full
                mt-[100px]
        ">
            <div className="
                w-auto
                h-auto
                px-[24px]
                text-center
                mt-[70px]
                mb-[20px]
            ">
                <p className="
                    text-[1.375rem]
                    leading-normal
                    text-[#000000]
                    font-normal
                    font-DmSans
                    mb-[14px]
                ">
                    Fale Conosco 
                </p>
                <p className="
                    text-[1.575rem]
                    leading-normal
                    text-[#000000]
                    font-bold
                    font-DmSans
                    mb-[46px]
                ">
                    Tire suas dúvidas com nosso assistente virtual
                </p>
            </div>
            <div className="
                max-h-[120px]
                max-w-[120px]
                mb-[52px]
            ">
                <Img 
                    light={cloudinary["/home"].imageChatBot.light}
                    dark={""}
                    theme={theme}
                />
            </div>
            <div className="
                w-auto
                h-auto
                px-[24px]
                text-center
                mb-[180px]
            ">
                <p className="
                    text-[1rem]
                    leading-normal
                    text-[#3B5266]
                    font-normal
                    font-DmSans
                    max-w-[570px]
                    mb-[32px]
                ">
                    Tem alguma dúvida sobre agendamento, especialidades ou resultados? Nosso chatbot responde rápido e te ajuda a resolver tudo sem complicação. 
                </p>
                <motion.button 
                    whileTap={ { scale: 0.9 } }
                >
                    <button className="
                        bg-[#A3B3FF]
                        px-6
                        py-3
                        rounded-full
                        text-slate-50
                        font-bold
                        leading-normal
                        text-[1rem]
                        shadow-sm
                        duration-200
                        transition-transform
                        md:hover:-translate-y-1
                    ">
                        CONHEÇA O AGENTE
                    </button>
                </motion.button>
            </div>
        </section>
    )
})

export default SectionWrapperD