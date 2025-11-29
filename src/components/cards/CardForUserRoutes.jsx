import { DoorOpen } from "lucide-react";
import { useTheme } from "../../contexts/theme/useTheme";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/auth/useAuth";

function CardForUserRoutes ({ params }) {

    const { theme, validateTheme } = useTheme();
    const { logout } = useAuth();

    return (
        <div className="
            w-full
            max-w-[896px]
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
                    <h2 className={`
                        text-[1.475rem]
                        ${validateTheme(theme, "text-black", "text-slate-500")}
                        font-DmSans
                        font-bold
                    `}>
                        { params.title }
                    </h2>
                </div>

            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1}}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                exit={{ opacity: 0 }}
                className={`
                    w-full
                    ${validateTheme(theme, "bg-white border-slate-200", "bg-slate-900 border-slate-800")}
                    p-[32px]  
                    shadow-lg
                    rounded-2xl
                    border-[2px]
                    border-slate-200
                `}>
                    <div 
                        className='
                            w-full  
                            h-auto
                            flex
                            flex-row
                            justify-between
                            items-center
                            gap-2
                    '>
                        <p className={`
                            ${validateTheme(theme, "text-[#000000]", "text-slate-500")}
                            md:text-[1.075rem]
                            text-[0.9rem]
                        `}>
                            { params.text }
                        </p>

                        <div>
                            { params.title === "Sair" ? <params.button text={<> <DoorOpen/> Sair</>} fn={() => logout()} type={"logout"}/> : <params.button /> }
                        </div>
                    </div>
            </motion.div>
        </div>
    )
}

export default CardForUserRoutes;