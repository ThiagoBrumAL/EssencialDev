import { Eye, EyeClosed  } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'

import { useTheme } from "../../contexts/theme/useTheme";
import { handlingInput } from '../../utils/errors/handlers/handlingInput'

function FormFielAppt({ body, value }) {

    const { 

        theme,
        validateTheme,

    } = useTheme()


    if(body["field"].name === "E-mail" || body["field"].name === "Sub"){
        body["field"].disabled = true;
    }


    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="w-full"
            >
                <div 
                    id="form-field" 
                    className="
                        flex 
                        flex-col 
                        w-[100%] 
                        relative
                ">
                    <label
                        className={`
                            mb-2 
                            ${validateTheme(theme, "text-slate-950","text-slate-500")}
                            font-Inter
                            font-normal
                            md:text-[0.95rem]
                            text-[0.96rem]
                        `}
                        htmlFor={body["field"].id}
                    >
                        {body["field"].name}
                    </label>

                    <input
                        className={`
                            py-[6px] 
                            px-[10px]
                            ${validateTheme(
                                theme,
                                (body["field"].disabled ? `bg-slate-200 opacity-[0.4]  placeholder:text-slate-500 text-slate-950` : `bg-slate-200  placeholder:text-slate-500 text-slate-950`),
                                (body["field"].disabled ? `bg-slate-800 opacity-[0.4] placeholder:text-slate-400 text-slate-300` : "bg-slate-900 placeholder:text-slate-400 text-slate-300")
                            )}
                            rounded-[6px]
                            outline-none 
                            border-[2px] 
                            font-Inter
                            text-[0.9em]
                            md:text-[1rem]
                            ${body["field"].hasErrorInField ? "mb-[3px]" : "mb-[0px]"}
                            ${body["field"].hasErrorInField ? "border-red-500" : "border-[#B5B5BD]"}
                        `}

                        pattern={body["field"].regex}
                        
                        type={body["field"].type}

                        placeholder={body["field"].placeholder}

                        name={body["field"].name}

                        id={body["field"].id}

                        value={String(body["field"].value)}

                        disabled={body["field"].disabled}
                        
                        onChange={(e) => {
                            const rawValue = e.target.value;
                            const maskedValue = body["field"].mask ? body["field"].mask(rawValue, body["field"].id) : rawValue;

                            const updatedFields = body["fields"].map(f => f.id === body["field"].id ? { ...f, value: maskedValue } : f)
                            const validatedFields = handlingInput(updatedFields)

                            body["setFields"](validatedFields)
                        }}
                    />
                    
                </div>
            </motion.div>
        </AnimatePresence>
        
    );
}

export default FormFielAppt;
