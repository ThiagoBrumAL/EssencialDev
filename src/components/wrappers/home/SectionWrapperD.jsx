import React, { memo } from "react"
import Img from "../../img/ImgForHome"
import { motion } from "framer-motion"
import { useTheme } from "../../../contexts/theme/useTheme"
import { cloudinary } from "../../../cloud/cloudinary"
import { useNavigate } from "react-router-dom"

const SectionWrapperD = React.memo(function SectionWrapperD({ path }){

    const { theme, validateTheme } = useTheme();
    const navigate = useNavigate();

    return (
        <section
            className="
                flex
                flex-col
                items-center
                justify-center
                w-full
                sm:mt-[100px]
        ">
            <div className="
                w-auto
                h-auto
                px-[24px]
                text-center
                mt-[70px]
                mb-[20px]
            ">
                <p className={`
                    text-[1.375rem]
                    leading-normal
                    ${validateTheme(theme, "text-[#000000]", "text-[#FFFAFE]")}
                    font-normal
                    font-DmSans
                    mb-[14px]
                `}>
                    Fale Conosco 
                </p>
                <p className={`
                    sm:text-[1.575rem]
                    text-[1.425rem]
                    leading-normal
                    ${validateTheme(theme, "text-[#000000]", "text-[#FFFAFE]")}
                    font-bold
                    font-DmSans
                    mb-[46px]
                `}>
                    Tire suas dúvidas com nosso assistente virtual
                </p>
            </div>
            <div className="
                max-h-[120px]
                max-w-[120px]
                w-full
                mb-[52px]
                flex
                justify-center
            ">
                <Img 
                    light={cloudinary[path].imageChatBot.light}
                    dark={cloudinary[path].imageChatBot.dark}
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
                <p className={`
                    text-[1rem]
                    leading-normal
                    ${validateTheme(theme, "text-[#3B5266]", "text-[#FFFAFE]")}
                    font-normal
                    font-DmSans
                    max-w-[570px]
                    mb-[32px]
                `}>
                    Tem alguma dúvida sobre agendamento, especialidades ou resultados? Nosso chatbot responde rápido e te ajuda a resolver tudo sem complicação. 
                </p>
                <motion.button 
                    whileTap={ { scale: 0.9 } }
                    onClick={() => navigate("/chat")}
                    className={`
                        ${validateTheme(theme, "bg-sky-300", "bg-indigo-600")}
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
                    `}
                >
                        CONHEÇA O AGENTE
                </motion.button>
            </div>
        </section>
    )
})

export default SectionWrapperD