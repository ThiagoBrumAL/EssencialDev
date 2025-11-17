import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react"
import { useTheme } from "../contexts/theme/useTheme";

function HomePage(){

    const locale = useLocation()

    const { 
    
        theme,
        changeTheme,
        validateTheme, 

    } = useTheme();
   
   function Img({ light, dark, theme }){
   
       const [imageIsVisible, setImageIsVisible] = useState(false)
       const targetTheme = theme ? "light" : "dark"
   
       useEffect(() => {
   
           setImageIsVisible(false)
           const timer = setTimeout(() => setImageIsVisible(true), 50)
           return () => clearTimeout(timer)
   
       }, [theme])
   
       return (
           <img
               id="logo"
               className={`
                   h-full
                   w-full
                   object-contain
                   max-h-[450px]
                   max-w-[450px]
                   transition-opacity
                   ease-in-out
                   duration-700
                   ${imageIsVisible ? "opacity-100" : "opacity-0"}
               `}
               src={theme ? light : dark}
               alt="Essecial Dev Logo"
           />
       )
   }
   
    return (
        <div
            className="
                w-full
                h-full
        ">
            <section 
                className="
                    bg-slate-50
                    p-6
                    flex
                    justify-center
                    items-center
                    flex-wrap-reverse
                    gap-[40px]
            ">
                <div
                    className="
                        w-full
                        max-w-[600px]    
                ">
                    <div className="
                        mb-[3rem]
                    ">
                        <h1 
                            className="
                                font-DmSans
                                md:text-[4.275rem]
                                text-[3rem]
                                font-bold
                                md:leading-[3.975rem]
                                leading-[2.675rem]
                                text-sky-300
                                mb-[1.275rem]
                        ">
                            Agende sua consulta em minutos
                        </h1>
                        <p className="
                            font-DmSans
                            text-[1.275rem]
                            text-[#000000]
                            font-normal
                            leading-normal
                        ">
                            Clínica geral e diversas especialidades em um só lugar.
                        </p>
                    </div>

                    <button className="
                        bg-[#A3B3FF]
                        px-6
                        py-2
                        rounded-full
                        text-slate-50
                        font-bold
                        leading-normal
                        text-[1.275rem]
                        shadow-sm
                        duration-200
                        transition-transform
                        md:hover:-translate-y-1
                    ">
                        Agendar Agora
                    </button>
                    
                </div>
                <div>
                    <Img 
                        light={"https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763382138/Cardiologist-bro_1_ezmc76.png"}
                        dark={""}
                        theme={theme}
                    />
                </div>
            </section>
            <section 
                className="
                    bg-slate-50
                    p-6
                    flex
                    justify-center
                    items-center
                    flex-wrap
                    gap-[80px]
            ">
                <div>
                    <Img 
                        light={"https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763405014/Medical_research-bro_i5rnb6.png"}
                        dark={""}
                        theme={theme}
                    />
                </div>
                <div
                    className="
                        w-full
                        max-w-[600px]
                ">
                    <h1 
                        className="
                            font-DmSans
                            md:text-[3.275rem]
                            text-[3rem]
                            font-bold
                            md:leading-[3.975rem]
                            leading-[2.675rem]
                            text-sky-300
                            mb-[1.275rem]
                    ">
                        Sua saúde é a nossa prioridade
                    </h1>
                    <p className="
                        font-DmSans
                        text-[1.275rem]
                        text-[#000000]
                        font-normal
                        leading-normal
                    ">
                        Conte com uma equipe preparada para cuidar de você.
                    </p>
                </div>
            </section>
        </div>
    )

}

export default HomePage;