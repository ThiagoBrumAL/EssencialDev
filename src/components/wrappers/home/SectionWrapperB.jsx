import React, { memo } from "react"
import Img from "../../img/ImgForHome"


const SectionWrapperB = React.memo(function SectionWrapperB({ theme, cloudinary }){
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
            ">
                <Img 
                    light={cloudinary["/home"].imageMiddle.light}
                    dark={""}
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
                    Sua saúde é a nossa prioridade
                </h1>
                <p className="
                    font-DmSans
                    text-[1.275rem]
                    text-[#000000]
                    font-normal
                    leading-normal
                ">
                    Conte com uma equipe preparada para cuidar de você.
                </p>
            </div>
        </section>
    )
})

export default SectionWrapperB