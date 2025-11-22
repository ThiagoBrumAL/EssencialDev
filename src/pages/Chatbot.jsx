import { useTheme } from "../contexts/theme/useTheme";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

function Chatbot({ children }){

    const { theme, validateTheme } = useTheme();

    const Option = ({ text }) => {
        return (
            <motion.button 
            whileTap={{ scale: 0.9 }}
            className={`
                border-[2px]
                border-slate-300
                h-[36px]
                w-auto
                flex
                justify-center
                rounded-xl
                md:text-[1rem]
                text-[0.7rem]
                font-DmSans
                items-center
                px-[10px]
            `}>
                { text }
            </motion.button>
        )
    }

    const Response = () => {
        return (
            <div>
                
            </div>
        )
    } 

    return (
        <div className={`
            w-full
            h-full
            ${validateTheme(theme,"bg-[#FAFAFA]","bg-slate-900")}
            min-h-[100dvh]
            flex
            justify-center
            items-start
            px-[24px]
        `}>
            <section className="
                w-full
                h-auto
                md:pt-[80px]
                flex
                justify-center
            ">

                <div className="
                    w-full
                    h-full
                    max-w-[1200px]
                    shadow-lg
                    rounded-2xl
                    border-[2px]
                    border-slate-200
                ">
                    <div className="
                        w-full
                        border-slate-200
                        border-b-[3px]
                        px-[32px]
                        py-[24px]
                    ">
                        <h1 className="
                            md:text-[1.175rem]
                            text-[1rem]
                            font-DmSans
                            flex
                            items-center  
                        ">
                            Assistente Virtual
                        </h1>
                    </div>
                    <div className={`}
                        ${validateTheme(
                            theme, 
                            "bg-white border-slate-200 text-slate-950", 
                            "bg-slate-900 border-slate-800 text-slate-300"
                        )}
                        w-full
                        h-full
                        md:px-[32px] px-[24px]
                        md:py-[42px] py-[32px]
                    `}>

                        

                        <div
                        style={{ scrollbarWidth: "none" }}
                        className="
                            px-[32px]
                            py-[24px]
                            min-h-[400px]
                            overflow-y-scroll
                        ">
                            {/* Body */}
                        </div>

                    </div>
                    <div className="
                        w-full
                        border-slate-200
                        border-t-[3px]
                        px-[32px]
                        py-[24px]
                        flex
                        sm:flex-row
                        flex-col
                        justify-center
                        sm:items-start
                        items-end
                    ">
                        <div className="
                            w-full
                            h-full
                            flex
                            gap-[20px]
                            flex-wrap
                        ">
                            <Option text={"Agendar consulta"}/>
                            <Option text={"Agendar consulta"}/>
                            <Option text={"Agendar consulta"}/>
                            <Option text={"Agendar consulta"}/>
                            <Option text={"Agendar consulta"}/>
                            <Option text={"Agendar consulta"}/>
                            <Option text={"Agendar consulta"}/>
                        </div>
                        <div className="
                            w-full
                            max-w-[50px]
                            h-full
                        ">
                            <motion.button
                            whileTap={{ scale: 0.9 }}
                            className={`
                                bg-gradient-to-tr
                                ${validateTheme(theme,"from-teal-400 to-indigo-400", "from-[#01051C] to-[#051782]")}
                                h-[36px]
                                w-[36px]
                                flex
                                justify-center
                                items-center
                                rounded-lg
                            `}>
                                <Send height={16} width={16} color={`#FFFAFE`}/>
                            </motion.button>
                        </div>
                    </div>
                </div>
                    
                
            </section>
        </div>
    )
}

export default Chatbot