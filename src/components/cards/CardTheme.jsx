
import { motion } from "framer-motion"
import { useTheme } from "../../contexts/theme/useTheme";
import ButtonTheme from "../buttons/ButtonTheme";

function CardTheme () {

    const { theme, changeTheme } = useTheme();

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
                        Tema
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
                    <div 
                        layout="true"
                        className='
                            w-full  
                            h-auto
                            flex
                            flex-row
                            justify-between
                            items-center
                    '>
                        <h1>
                            Clique aqui para alterar o tema do jeito que preferir
                        </h1>
                        <div className="
                            h-[20px]
                            w-auto
                        ">
                            <ButtonTheme theme={theme} changeTheme={changeTheme} />
                        </div>
                    </div>
            </motion.div>
        </div>
    )
}

export default CardTheme;