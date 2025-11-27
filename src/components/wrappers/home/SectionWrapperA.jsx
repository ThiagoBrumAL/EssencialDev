import React, { memo } from "react"
import Img from "../../img/ImgForHome"
import { motion } from "framer-motion"
import { useTheme } from "../../../contexts/theme/useTheme";
import { useNavigate } from "react-router-dom";

const SectionWrapperA = React.memo(function SectionWrapperA({ cloudinary, h1, text, hasButton, path, maxWidth }){

    const { theme, validateTheme } = useTheme();
    const navigate = useNavigate();

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
                className={`
                    w-full
                    ${maxWidth}
            `}>
                <div className="
                    mb-[3rem]
                    w-full
                ">
                    <h1 
                        className={`
                            font-DmSans
                            md:text-[3.275rem]
                            text-[3rem]
                            font-bold
                            md:leading-[2.975rem]
                            leading-[2.675rem]
                            text-sky-300
                            mb-[1.275rem]
                    `}>
                        { h1 }
                    </h1>
                    <p className={`
                        font-DmSans
                        md:text-[1.175rem]
                        text-[1rem]
                        ${validateTheme(theme, "text-[#000000]", "text-[#FFFAFE]")}
                        font-normal
                        leading-normal
                    `}>
                        { text }
                    </p>
                </div>

                { hasButton && <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate("/appointments")}
                    className={`
                        ${validateTheme(theme, "bg-sky-300", "bg-indigo-600")}
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
                `}>
                        Agendar Agora
                </motion.button> }
                
            </div>
            <div className="
                max-h-[450px]
                max-w-[450px]
                flex
                justify-center
            ">
                <Img 
                    light={cloudinary[path].imageTop.light}
                    dark={cloudinary[path].imageTop.dark}
                    theme={theme}
                />
            </div>
        </section>
    )
})

export default SectionWrapperA