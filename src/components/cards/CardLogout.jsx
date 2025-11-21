
import { motion } from "framer-motion"

function CardLogout () {
    return (
        <div className="
            w-full
            max-w-[896px]
            sm:mb-[0px]
            mb-[42px]
            relative
        ">
            <div className='
                w-full
                max-w-[896px]
                sm:mb-[0px]
                mb-[42px]
                relative
            '>

                <div className='
                    h-[41px]
                    w-full
                    flex
                    justify-between
                    items-center
                    mb-[32px]
                '>
                    <h2 className='
                        md:text-[1.275rem]
                        tetx-[1rem]
                        text-[#101828]
                        font-DmSans

                    '>
                        Informações pessoais
                    </h2>
                </div>

            </div>
            <motion.div
                layout
                transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
                exit={{ opacity: 0 }}
                className='
                    w-full
                    bg-[#FFFFFF] 
                    p-[32px]  
                    shadow-lg
                    rounded-2xl
                    border-[2px]
                    border-slate-200
                '>
                    <form 
                        layout="true"
                        action=""
                        className='
                            w-full  
                            h-auto
                    '>
                        logout
                    </form>
            </motion.div>
        </div>
    )
}
export default CardLogout;