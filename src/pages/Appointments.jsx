import { useEffect, useState } from "react";
import { useAppointment } from "../contexts/appointment/useAppointment";
import { useApi } from "../api/api";
import { useTheme } from "../contexts/theme/useTheme";
import BasicDateCalendar from "../components/calendar/Calendar";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import CardHours from "../components/cards/CardHours";
import { maskFullName } from "../utils/masks/maskFullName";
import FormFielAppt from "../components/inputs/FormFielAppt";
import { maskEmail } from "../utils/masks/maskEmail";
import { badFeedback } from "../utils/helpers/feedback/Failure";
import { useFeedback } from "../contexts/api/useFeedback";
import { useLocation, useNavigate } from "react-router-dom";

import SmallLoader from "../components/loaders/SmallLoader";


function Appointments () {

    const { renderCardFeedback } = useFeedback()

    const { theme, validateTheme } = useTheme();
    const { nameAppt, setNameAppt } = useAppointment(null);

    const [doctors, setDoctors] = useState(null);
    const [openCal, setOpenCal] = useState(false);
    const [openHou, setOpenHou] = useState(false);

    const location = useLocation();

    const [chosenDate, setChosenDate] = useState(dayjs());
    const [chosenHour, setChosenHour] = useState("");
    const [datas, setDatas] = useState();

    const openCalendar = () => setOpenCal((prev) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" 
        });
        setOpenHou(false);
        return !prev
    })

    const openHours = () => setOpenHou((prev) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" 
        });
        setOpenCal(false);
        return !prev
    })

    const [fields, setFields] = useState([])
    const [user, setUser] = useState(null)

    const api = useApi();

    useEffect(() => {
        
        const body = { setDoctors }
        api("get", "/about", body)

    }, [])

    
    useEffect(() => {

        const fetchUser = async () => {
            const body = { setUser }
            api("get", "/info", body);
        };

        fetchUser();
        
    }, [location.pathname]); 

    const Op = ({ name, spec }) => {
        return (
            <option className={`
                ${validateTheme(theme, "text-slate-900", "text-slate-100")}
            `} value={ name }>
                { name } ({ spec })
            </option>
        )
    }

    const toSchedule = (datas) => {
        if(user.email && user.name && nameAppt && chosenDate && chosenHour){
            api("post", "/appointments", datas)
            setOpenHou(false)
            setOpenCal(false)
        }else{
            badFeedback("400", renderCardFeedback, "/appointments")
        }
    }

    const ChoiceDoctor = () => {
        return (
            <div className="
                w-full
                h-auto
            ">
                <label
                    className={`
                        ${validateTheme(theme, "text-slate-950","text-slate-500")}
                        font-Inter
                        font-normal
                        md:text-[0.95rem]
                        text-[0.96rem]
                    `}
                    htmlFor="">
                    Especialista
                </label>
                <select 
                    value={nameAppt?.name || ""}
                    onChange={e => {
                        const doctor = doctors.find(d => d.name === e.target.value);
                        setNameAppt({
                            name: doctor.name,
                            spec: doctor.specialty
                        });
                    }}

                    className={`
                        mt-2
                        ${validateTheme(theme, "bg-slate-100 border-slate-200 ", "bg-slate-800 border-slate-700")}
                        rounded-xl
                        w-full
                        border-[2px]
                        outline-none
                        px-3
                        py-2
                        hover:cursor-pointer
                    `}
                >
                    {doctors.map((doc, index) => (
                        <Op key={index} name={doc.name} spec={doc.specialty} />
                    ))}
                </select>
            </div>
        )
    }

    useEffect(() => {
        if (!doctors || doctors.length === 0) return;

        if (!nameAppt || !nameAppt.name) {
            const first = doctors[0];
            setNameAppt({
                name: first.name,
                spec: first.specialty
            });
        }
    }, [doctors]);

    useEffect(() => {
    
        if(!user) return;
        
        const newFields = [
            { 
                
                id: "name",
                name: "Nome Completo", 
                type: "text",
                originType: "text",
                value: user.name,
                regex: "",
                link: false, 
                mask: maskFullName,
                icon: null,
                disabled: true,
                placeholder: "Insira seu nome completo",
                hasErrorInField: false,
                messageError: "Campo obrigatório",

            },
            { 

                id: "email",
                name: "E-mail", 
                type: "email",
                originType: "email",
                value: user.email,
                regex: "",
                link: false, 
                mask: maskEmail,
                icon: null,
                disabled: true,
                placeholder: "Insira seu email", 
                hasErrorInField: false,
                messageError: "Campo obrigatório",

            },

            { 

                id: "sub",
                name: "Sub",
                type: "text",
                originType: "sub",
                value: user.id,
                regex: "",
                link: false,
                mask: (v) => v,
                icon: null,
                disabled: true,
                placeholder: "", 
                hasErrorInField: false,
                messageError: "",

            }
        ]

        setFields(newFields)
    }, [user])


    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" 
        });
    }, []);

    useEffect(() => {

        if(user && nameAppt){
            setDatas({
                date: chosenDate.format("YYYY-MM-DD"),
                hour: chosenHour,
                specialist: nameAppt.name,
                patientEmail: user.email,
                patientName: user.name,
                patient_id: user.id
            })
        }
        
    }, [chosenDate, chosenHour, nameAppt, user])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
            className={`
                w-full
                h-full
                ${validateTheme(theme,"bg-[#FAFAFA]","bg-slate-900")}
                flex
                md:pt-[150px]
                pt-[50px]
                md:justify-start
                items-center
                flex-col
                px-[24px]
                min-h-[100dvh]
        `}>
            <div className="
                w-full
                flex
                gap-[32px]
                max-w-[900px]
                justify-start
                flex-col
            ">
                <h1 className={`
                    text-[1.475rem]
                    ${validateTheme(theme, "text-black", "text-slate-200")}
                    font-DmSans
                    font-bold
                `}>
                    Consulta ({ nameAppt?.spec || "" })
                </h1>
                    {
                        user ? <motion.div className="
                        w-full
                        flex
                        md:flex-nowrap
                        gap-[32px]
                        max-w-[900px]
                        flex-wrap-reverse
                    ">
                        <div className={`
                            flex
                            flex-col
                            ${validateTheme(theme, "bg-slate-100 border-slate-200", "bg-slate-900 border-slate-700 text-slate-200")}
                            rounded-xl
                            w-full
                            border-[2px]
                            px-[32px]
                            py-[24px]
                            gap-[12px]
                        `}>
                            { doctors && ChoiceDoctor() }

                            {fields.map((field, index) => {

                                return (
                                    <FormFielAppt
                                        key={index}
                                        value={field.value}
                                        body={{
                                            field,
                                            fields,
                                            setFields
                                        }}
                                    />
                                );

                            })}

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => openCalendar()}
                                className={`
                                    w-full
                                    bg-gradient-to-tr
                                    ${validateTheme(
                                        theme, 
                                        "bg-white border-slate-200 text-slate-950", 
                                        "bg-slate-900 border-slate-800 text-slate-300"
                                    )}
                                    border-[2px]
                                    py-2
                                    px-4
                                    rounded-xl
                                    mt-[12px]
                                `}
                            >
                                { openCal ? "Fechar" : "Agendar data" }
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => openHours()}
                                className={`
                                    w-full
                                    bg-gradient-to-tr
                                    ${validateTheme(
                                        theme, 
                                        "bg-white border-slate-200 text-slate-950", 
                                        "bg-slate-900 border-slate-800 text-slate-300"
                                    )}
                                    border-[2px]
                                    py-2
                                    px-4
                                    rounded-xl
                                `}
                            >
                                { openHou ? "Fechar" : "Agendar horário" }
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => toSchedule(datas)}
                                className="
                                    w-full
                                    bg-gradient-to-tr
                                    from-teal-400 to-indigo-400 text-slate-50
                                    py-2
                                    px-4
                                    rounded-xl
                                    font-bold
                                "
                            >
                                Agendar Consulta
                            </motion.button>
                        </div>

                    <AnimatePresence>
                        <div className="
                            md:w-auto
                            w-full
                        ">
                            { openCal && <BasicDateCalendar value={chosenDate} set={setChosenDate}/> }
                            { openHou && <CardHours value={chosenHour} set={setChosenHour}/> }
                        </div>
                    </AnimatePresence>
                    
                    </motion.div> : <SmallLoader/>
                    }
            </div>
            
        </motion.div>
    )
}

export default Appointments;