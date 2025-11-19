import React, { memo } from "react"
import CardAdventages from "../../cards/CardAdvantages"

const SectionWrapperC = React.memo(function SectionWrapperC({ adventages, theme, validateTheme }){
    return (
        <section className="
            block
            w-full
        ">
            <div className={`
                py-[42px]
                bg-gradient-to-tr
                ${validateTheme(theme,"from-teal-400 to-indigo-400", "from-[#01051C] to-[#051782]")}
                w-full
                flex
                justify-center
                items-center
                flex-col
                px-[24px]
            `}>
                <div className="
                    mb-[56px]
                ">
                    <h2 className="
                        text-[1.775rem]
                        leading-normal
                        text-[#FFFAFE]
                        font-normal
                        font-DmSans
                        mb-[12px]
                        text-center
                    ">
                        Nossas Vantagens
                    </h2>
                    <h1 className="
                        text-[1.775rem]
                        leading-normal
                        text-[#FFFAFE]
                        font-bold
                        font-DmSans
                        text-center
                    ">
                        A Qualidade do Atendimento é Nossa Prioridade
                    </h1>
                </div>

                <div className="
                    flex
                    w-full
                    justify-center
                    items-start
                    flex-wrap
                    gap-[24px]
                ">
                    {adventages.map((el, i) => {
                        return <CardAdventages key={i} image={el.image} h2={el.h2} p={el.p}/>
                    })}
                </div> 
            </div>
        </section>
    )
})

export default SectionWrapperC