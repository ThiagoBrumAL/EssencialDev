import { motion } from "framer-motion";
import { useFeedback } from "../../contexts/api/useFeedback";
import { useTheme } from "../../contexts/theme/useTheme";
import { User2Icon } from "lucide-react";

function CardFeedback({ params }){

    const { 

        messageFeedback,
        colorFeedback,
        iconFeedback

    } = useFeedback();

    const k = 0

    const { theme } = useTheme();
    
    return (
        <motion.div
        initial={{ opacity: 0, x: 1000 }}
        animate={{ opacity: 1, x: -24 }}
        exit={{ opacity: 0, x: 1000 }}
        className={`
            fixed 
            flex 
            items-center 
            ${theme ? "bg-slate-50 border-slate-300" : "bg-slate-700 border-slate-600"}
            border-[2px]
            ${params}
            right-0
            transition-transform
            ease-in-out 
            duration-700 
            rounded-md 
            text-slate-50 
            shadow-md
            mt-[24px]`}>
                <div 
                    className={` 
                        ${ colorFeedback } 
                        bg-green-500
                        rounded-tl-[4px] 
                        rounded-bl-[4px] 
                        flex 
                        items-center 
                        justify-center
                        px-[8px]
                        py-[17px]
                        border-r-[2px]
                        ${theme ? " border-slate-300" : "border-slate-600"}
                `}>
                    { iconFeedback }
                </div>

                <h1 
                    className={`
                        ml-[12px] 
                        sm:text-[1.2rem] 
                        text-[0.8rem]
                        font-[600] 
                        font-Inter
                        mr-[12px]
                        ${theme ? "text-slate-800" : 'text-slate-300'}
                `}>
                    { messageFeedback }
                </h1>
        </motion.div>
            
    )
}

export default CardFeedback;