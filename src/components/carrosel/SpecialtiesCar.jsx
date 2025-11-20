import { motion, useInView } from "framer-motion"
import { memo } from "react"

const SpecialtiesCar = memo(function SpecialtiesCar({ dir, ref }){

    const specialtiesTop = [
        {specialty: "Psiquiatria", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458583/Psiquiatria_ddzzft.png"},
        {specialty: "Psicologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458581/Psicologia_w6dwqg.png"},
        {specialty: "Neurologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763462081/Neurologia_imrrz5.png"},
        {specialty: "Geriatria", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458577/Geriatria_wxkegf.png"},
        {specialty: "Cardiologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763462081/Cardiologia_roivrq.png"},
        {specialty: "Clinica Geral", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458576/Clinica_Geral_jvreyq.png"},
        {specialty: "Pneumologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458580/Pneumologia_giqzfu.png"},
        {specialty: "Infectologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458579/Infectologia_xdwzwb.png"},
    ]
    
    const specialtiesBottom = [
        {specialty: "Endocrinologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458577/Endocrinologia_rno75a.png"},
        {specialty: "Nutrologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458580/Nutrologia_uz7ht9.png"},
        {specialty: "Ortopedia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458580/Ortopedia_y7lgeg.png"},
        {specialty: "Reumatologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458583/Reumatologia_ytgons.png"},
        {specialty: "Dermatologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458577/Dermatologia_et86tf.png"},
        {specialty: "Alergologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458576/Alergologia_rhafed.png"},
        {specialty: "Ginecologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458578/Ginecologia_insrwh.png"},
        {specialty: "Urologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458583/Urologia_jv7fbz.png"},
    ]

    const inView = useInView(ref, {
        once: true,
        margin: "0px 0px -50px 0px"
    })

    const variants = {
        hidden: { opacity: 0, y: 75},
        visible: { opacity: 1, y: 0}
    }

    const SpecialtyDiv = ({ image, text }) => {

        return (
            <motion.div
                variants={variants}
                initial="hidden"
                animate={ inView ? "visible" : "hidden" }
                transition={{ duration: 0.5, delay: 0.25 }}
                className="w-full"
            >
                <div className="
                    flex
                    flex-col
                    justify-center
                    items-center
                    w-[130px]
                ">
                    <img
                        className="
                            w-[78px]
                            h-[78px]
                            md:w-[98px]
                            md:h-[98px]
                        "
                        src={image} 
                        alt={text} 
                    />
                    <h2 className="
                        text-[1.02rem]
                        leading-normal
                        text-[#404040]
                        font-bold
                        font-DmSans
                        mt-4
                        w-[130px]
                        text-center
                    ">
                        {text}
                    </h2>
                </div>
            </motion.div>
        )
    }

    const renderSpecialties = (dir) => {

        return dir === "top" ?
            specialtiesTop.map((spec, i) => 
                <SpecialtyDiv
                    key={i}
                    image={spec.image}
                    text={spec.specialty}
                />
            
            )
         : specialtiesBottom.map((spec, i) => 
                <SpecialtyDiv 
                    key={i}
                    image={spec.image}
                    text={spec.specialty}
                />
            )
        
    }

    return (
        
        <div className={`
                relative
                w-full
                max-w-[1124px] 
                mb-[62px]
        `}>
            <div 
                className="
                    absolute left-0 top-0 bottom-0 z-10 w-12 pointer-events-none 
                    [background:linear-gradient(to_right,white,transparent)]
                "
            />
            <div 
                className="
                    absolute right-0 top-0 bottom-0 z-10 w-12 pointer-events-none 
                    [background:linear-gradient(to_left,white,transparent)]
                "
            />
            <div
                style={{ scrollbarWidth: "none" }}
                className={`
                    flex
                    w-full
                    overflow-x-auto
                    overflow-y-hidden
                    gap-[12px]
                    scrollbar-none
                    md:touch-none
                    md:select-none
                `}
            >  
                {dir === "top" ? renderSpecialties("top") : renderSpecialties("bottom")}
            </div>
        </div>
    )
})

export default SpecialtiesCar