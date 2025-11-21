import { motion } from "framer-motion";
import { useFeedback } from "../../contexts/api/useFeedback";
import { useTheme } from "../../contexts/theme/useTheme";

function CardFeedback({ params }){

    const { 

        messageFeedback,
        colorFeedback,
        iconFeedback

    } = useFeedback();

    const { theme } = useTheme();
    
    return (
        <motion.div
        initial={{ opacity: 0, x: 1000 }}
        animate={{ opacity: 1, x: -24 }}
        exit={{ opacity: 0, x: 1000 }}
        transition={{ duration: 0.9 }}
        className={`
            fixed 
            flex 
            items-center 
            ${theme ? "bg-indigo-200" : "bg-slate-700"}
            ${params}
            right-0
            transition 
            transform 
            ease-in-out 
            duration-700 
            rounded-md 
            text-slate-50 
            shadow-md
            mt-[24px]`}>
                <div 
                    className={` 
                        ${ colorFeedback } 
                        rounded-tl-[4px] 
                        rounded-bl-[4px] 
                        flex 
                        items-center 
                        justify-center
                        px-[6px]
                        py-[12px]
                `}>
                    { iconFeedback }
                </div>

                <h1 
                    className="
                        ml-[12px] 
                        sm:text-[16px] 
                        text-[12px]
                        font-[600] 
                        font-Inter
                        mr-[12px]
                ">
                    { messageFeedback }
                </h1>
        </motion.div>
            
    )
}

export default CardFeedback;