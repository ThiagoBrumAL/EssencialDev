import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "../../contexts/theme/useTheme";

export default function CardHours({ value, set }) {

    const { theme, validateTheme } = useTheme();

    const hoursOne = [
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
    ]

    const hoursTwo = [
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00"
    ]


    const Item = ({ hour, value, set }) => {

        return (
            <motion.button 
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => set(value === hour ? "" : hour)}
            className={`
                ${value === hour ? (theme ? "bg-green-400 hover:none " : "bg-green-600 hover:none  text-slate-100") : (theme ? "bg-green-200 hover:bg-green-300" : "bg-green-400 hover:bg-green-300 ")}
                py-3
                px-3
                rounded-xl
                min-w-[100px]     
                transition-colors
                duration-300
            `}>
                { hour }
            </motion.button>
        )
    }


    return (
        <div
            className={`
                ${validateTheme(theme, "bg-slate-100 border-slate-200", "bg-slate-900 border-slate-700")}
                border-[2px] 
                rounded-xl
                flex
                flex-row
                gap-[12px]
                w-full
                p-[12px]
        `}>

            <div className="
                w-full
                flex
                flex-col
                gap-[12px]
            ">
                {
                    hoursOne.map((h) => {
                        return <Item hour={h} value={value} set={set}/>
                    })
                }
            </div>

            <div className="
                w-full
                flex
                flex-col
                gap-[12px]
            ">
                {
                    hoursTwo.map((h) => {
                        return <Item hour={h} value={value} set={set}/>
                    })
                }
            </div>
            
        </div>
  );
}