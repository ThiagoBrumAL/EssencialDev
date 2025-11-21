import { motion } from "framer-motion";
import { useTheme } from "../../contexts/theme/useTheme";

function ClassicButton ({ text, fn, type, body = null }) {

    const { theme, validateTheme } = useTheme();

    return (
        <motion.button
            onClick={() => fn && type === "update" ? fn("patch", "/info/update", body) : fn()}
            whileTap={{ scale: 0.9 }} className={`
                block
                ${type === "update" ? "bg-gradient-to-tr" : "border-[2px]"}
                md:text-[0.9rem]
                text[0.8rem]
                px-3
                py-2
                font-bold
                ${
                    type === "update" ? 
                    validateTheme(
                        theme, 
                        "from-teal-400 to-indigo-400 text-slate-50" , 
                        "from-[#01051C] to-[#051782] text-slate-50"
                    ) 
                    
                    : 
                    
                    validateTheme(
                        theme, 
                        "bg-white border-slate-200 text-slate-950", 
                        "bg-slate-900 border-slate-800 text-slate-300"
                    )
                }
                rounded-xl
                hover:cursor-pointer
                font-DmSans
                flex
                items-center
                gap-[10px]
        `}>
            { text }
        </motion.button>
    )
}

export default ClassicButton;