import { motion, useInView } from "framer-motion"
import { memo } from "react"
import { useTheme } from "../../contexts/theme/useTheme"

const SpecialtiesCar = memo(function SpecialtiesCar({ dir, ref }){

    const { theme, validateTheme } = useTheme();

    const specialtiesTop = [
        {
            specialty: "Psiquiatria", 
            image: {
                light: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458583/Psiquiatria_ddzzft.png",
                dark: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763862497/Frame_1057_eio5rn.png"
            }
        },
        {
            specialty: "Psicologia", 
            image: {
                light: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458581/Psicologia_w6dwqg.png",
                dark: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763862497/Frame_1057-1_cbnzsx.png"
            }
        },
        {
            specialty: "Neurologia", 
            image: {
                light: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763462081/Neurologia_imrrz5.png",
                dark: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763862497/Frame_1057-2_sz4zgj.png"
            }
        },
        {
            specialty: "Geriatria", 
            image: {
                light: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458577/Geriatria_wxkegf.png",
                dark: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763862498/Frame_1057-3_zvl5uc.png"
            }
        },
        {
            specialty: "Cardiologia", 
            image: {
                light: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763462081/Cardiologia_roivrq.png",
                dark: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763862498/Frame_1057-4_hmbqyp.png"
            }
        },
        {
            specialty: "Clinica Geral",
            image: {
                light: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458576/Clinica_Geral_jvreyq.png",
                dark: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763862499/Frame_1057-5_cspz2u.png"
            }
        },
        {
            specialty: "Pneumologia", 
            image: {
                light: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458580/Pneumologia_giqzfu.png",
                dark: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763862504/Frame_1057-6_ogef3u.png"
            }
        },
        {
            specialty: "Infectologia", 
            image: {
                light: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458579/Infectologia_xdwzwb.png",
                dark: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763862504/Frame_1057-7_ztqokj.png"
            }
        },
    ]
    
    const specialtiesBottom = [
        {
            specialty: "Endocrinologia", 
            image: {
                light: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458577/Endocrinologia_rno75a.png",
                dark: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763862504/Frame_1057-8_iajqnh.png"
            }
        },
        {
            specialty: "Nutrologia", 
            image: {
                light: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458580/Nutrologia_uz7ht9.png",
                dark: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763862504/Frame_1057-9_onq4kh.png"
            }
        },
        {
            specialty: "Ortopedia", 
            image: {
                light: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458580/Ortopedia_y7lgeg.png",
                dark: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763862508/Frame_1057-10_djf8tt.png"
            }
        },
        {
            specialty: "Reumatologia", 
            image: {
                light: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458583/Reumatologia_ytgons.png",
                dark: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763862508/Frame_1057-11_qz37zr.png"
            }
        },
        {
            specialty: "Dermatologia", 
            image: {
                light: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458577/Dermatologia_et86tf.png",
                dark: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763862508/Frame_1057-12_psu83d.png"
            }
        },
        {
            specialty: "Alergologia", 
            image: {
                light: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458576/Alergologia_rhafed.png",
                dark: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763862509/Frame_1057-14_nlrrrs.png"
            }
        },
        {
            specialty: "Ginecologia", 
            image: {
                light: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458578/Ginecologia_insrwh.png",
                dark: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763862508/Frame_1057-13_rwxg9g.png"
            }
        },
        {
            specialty: "Urologia", 
            image: {
                light: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458583/Urologia_jv7fbz.png",
                dark: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763862512/Frame_1057-15_nzgist.png"
            }
        },
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
                    <h2 className={`
                        text-[1.02rem]
                        leading-normal
                        ${validateTheme(theme, "text-[#404040]", "text-[#FFFAFE]")}
                        font-bold
                        font-DmSans
                        mt-4
                        w-[130px]
                        text-center
                    `}>
                        {text}
                    </h2>
                </div>
            </motion.div>
        )
    }

    const renderSpecialties = (dir) => {

        return dir === "top" ?
            specialtiesTop.map((spec, i) => {
                
                const thm = theme ? "light" : "dark"
                
                return <SpecialtyDiv
                    key={i}
                    image={spec.image[thm]}
                    text={spec.specialty}
                />
            
        })
         : specialtiesBottom.map((spec, i) => {

                const thm = theme ? "light" : "dark"
                
                return <SpecialtyDiv
                    key={i}
                    image={spec.image[thm]}
                    text={spec.specialty}
                />
        })
        
    }

    return (
        
        <div className={`
                relative
                w-full
                max-w-[1124px] 
                mb-[62px]
        `}>
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