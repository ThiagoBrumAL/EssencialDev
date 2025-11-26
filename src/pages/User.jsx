import { UserRound, DoorOpen, Image, Lightbulb } from 'lucide-react';

import { motion } from 'framer-motion';

import { useTheme } from '../contexts/theme/useTheme';
import { useLocation, useNavigate } from 'react-router-dom';

function User({ children }){

    const { theme, validateTheme } = useTheme();
    const locale = useLocation();
    const navigate = useNavigate();

    const options = [
        {
            icon: UserRound, 
            text: "Meu Perfil",
            fn: () => navigate("/info"),
            path: "/info"
        },
        {
            icon: Image , 
            text: "Meus Agendamentos", 
            fn: () => navigate("/info/appointments"),
            path: "/info/appointments"
        },
        {
            icon: Lightbulb, 
            text: "Tema",
            fn: () => navigate("/info/theme"),
            path: "/info/theme"},
        {
            icon: DoorOpen, 
            text: "Sair",
            fn: () => navigate("/info/logout"),
            path: "/info/logout"
        }
    ]

    const MyLi = ({ icon: Icon, text, fn, path }) => {

        const isActive = locale.pathname === path

        return (
            <li className='
                w-full
                h-auto
            '>

                <motion.button 
                onClick={() => fn()}
                className={`
                    flex
                    items-center
                    gap-2
                    w-full
                    h-full
                    ${validateTheme(theme, "hover:bg-slate-200" , "hover:bg-slate-700")}
                    py-[12px]
                    rounded-lg
                    duration-200
                `}>
                    &nbsp;
                    { <Icon color={isActive ? validateTheme(theme, "#000000", "#FFFFFF") : "#777E90"}/> }
                    <span className={` ${isActive ? validateTheme(theme, "text-[#000000]", "text-slate-100") : "text-[#777E90]"} leading-normal text-[1rem] font-DmSans`}>{ text }</span>
                    &nbsp;
                </motion.button>

            </li>
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
            pt-[50px]
        `}>
            <section className="
                w-full
                h-auto
                max-w-[1280px]
                md:pt-[80px]
                flex
                gap-[50px]
                md:flex-row
                flex-col
            ">
                <div className={`}
                    ${validateTheme(
                        theme, 
                        "bg-white border-slate-200 text-slate-950", 
                        "bg-slate-900 border-slate-800 text-slate-300"
                    )}
                    w-full
                    h-full
                    md:max-w-[280px]
                    shadow-lg
                    rounded-2xl
                    md:px-[32px] px-[24px]
                    md:py-[42px] py-[32px]
                    border-[2px]
                    border-slate-200
                `}>

                    <ul className='
                        w-full
                        h-full
                    '>
                        {
                            options.map((op, i) => {
                                
                                    if(options.length -1 === options.indexOf(op)){
                                        return <div key={i} className='w-full h-auto md:mt-[17px] mt-[12px]'>< MyLi icon={op.icon} text={op.text} path={op.path} fn={op.fn}/></div>
                                    }
                                    
                                    return (
                                        <div
                                            key={i}
                                            className='
                                                w-full
                                                h-auto
                                                mt-[12px]
                                        '>
                                            < MyLi icon={op.icon} text={op.text} path={op.path} fn={op.fn}/>
                                            <hr className='border-slate-200 mt-[12px]'/>
                                        </div>
                                    )
                            })
                        }
                    </ul>

                </div>
                    
                { children }
            </section>
        </div>
    )
}

export default User