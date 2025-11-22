import React, { memo } from "react"
import Img from "../../img/ImgForHome"
import { motion } from "framer-motion"
import { useTheme } from "../../../contexts/theme/useTheme";

const SectionWrapperA = React.memo(function SectionWrapperA({ cloudinary, h1, text, hasButton, path }){

    const { theme, validateTheme } = useTheme();

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
                        { h1 }
                    </h1>
                    <p className={`
                        font-DmSans
                        text-[1.275rem]
                        ${validateTheme(theme, "text-[#000000]", "text-[#FFFAFE]")}
                        font-normal
                        leading-normal
                    `}>
                        { text }
                    </p>
                </div>

                { hasButton && <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="
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