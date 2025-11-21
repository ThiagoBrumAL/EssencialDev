
import { motion } from "framer-motion"
import { useAuth } from "../../contexts/auth/useAuth"

function CardLogout () {

    const { logout } = useAuth();

    const ClassicButton = ({ text, fn, type }) => {

        return (
            <motion.button
                onClick={() => fn && type === "update" ? fn("patch", "/info/update", body) : fn()}
                whileTap={{ scale: 0.9 }} className={`
                    block
                    ${type === "update" ? "text-white ": "text-slate-950"}
                    ${type === "update" ? "bg-gradient-to-tr ": null}
                    md:text-[0.9rem]
                    text[0.8rem]
                    px-3
                    py-2
                    ${type === "update" ? validateTheme(theme, "from-teal-400 to-indigo-400" , "from-[#01051C] to-[#051782]") : "bg-white border-[2px] border-slate-200"}
                    rounded-xl
                    hover:cursor-pointer
                    font-DmSans
            `}>
                { text }
            </motion.button>
        )
    }

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
                        Para sair da aplicação basta clicar aqui
                        <ClassicButton text={"Logout"} fn={() => logout()} type={"logout"}/>
                    </div>
            </motion.div>
        </div>
    )
}
export default CardLogout;