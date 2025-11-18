import { forwardRef } from "react"

const CardDoctor = forwardRef((props, ref) => {
    
    return (
        <div ref={ref} className="
            min-w-[352px]
            border-[2px]
            border-[#B1B5C3]
            rounded-[20px]
            snap-start
            shadow-md
        ">

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
                <div>
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
                        mb-[14px]
                    ">
                        {props.desc} 
                    </p>
                </div>

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
            </div>
            
        </div>
        )
    }
)

export default CardDoctor