import React, { memo } from "react"
import Img from "../../img/ImgForHome"
import { useTheme } from "../../../contexts/theme/useTheme";


const SectionWrapperB = React.memo(function SectionWrapperB({ cloudinary, h1, text, path }){

    const { theme, validateTheme } = useTheme();

    return (
        <section 
            className="
                p-6
                flex
                justify-center
                items-center
                flex-wrap
                gap-[80px]
                w-full
        ">
            <div className="
                max-h-[450px]
                max-w-[450px]
                flex
                justify-center
            ">
                <Img 
                    light={cloudinary[path].imageMiddle.light}
                    dark={cloudinary[path].imageMiddle.dark}
                    theme={theme}
                />
            </div>
            <div
                className="
                    w-full
                    max-w-[600px]
            ">
                <h1 
                    className="
                        font-DmSans
                        md:text-[3.275rem]
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
        </section>
    )
})

export default SectionWrapperB