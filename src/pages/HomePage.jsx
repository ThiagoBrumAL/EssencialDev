import { useEffect, useRef, useState, memo } from "react"
import React from "react";
import { useTheme } from "../contexts/theme/useTheme";
import { useWindowWidth } from '../hooks/WindowWidth'
import { useAuth } from "../contexts/auth/useAuth";

import axios from "axios";

import { ArrowLeft } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import CardDoctor from "../components/cards/CardDoctor";
import SmallLoader from "../components/loaders/SmallLoader";
import SpecialtiesCar from "../components/carrosel/SpecialtiesCar";
import SectionWrapperA from "../components/wrappers/home/SectionWrapperA"
import SectionWrapperB from "../components/wrappers/home/SectionWrapperB";
import SectionWrapperC from "../components/wrappers/home/SectionWrapperC";
import SectionWrapperD from "../components/wrappers/home/SectionWrapperD";


import { cloudinary } from "../cloud/cloudinary";

function HomePage(){

    const [doctors, setDoctors] = useState(null);
    const [touch, setTouch] = useState(0);
    const [howManyClicks, setHowManyClicks] = useState()
    
    const cardRef = useRef();
    const scrollRef = useRef();
    const didRun = useRef(false);
    const refSpecialties = useRef()

    const { token } = useAuth()


    const width = useWindowWidth();


    const { theme, validateTheme } = useTheme();

    const adventages = [
        {
            image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763507355/icon-hospital_ywpghf.png", 
            h2: "Equipe Humanizada", 
            p: "Nossa equipe é dedicada e atenciosa, garantindo que cada paciente se sinta ouvido e cuidado."
        },
        {
            image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763507356/icon-tec_cejhze.png", 
            h2: "Tecnologia Avançada", 
            p: "Utilizamos equipamentos modernos e métodos atualizados para oferecer diagnósticos precisos e rápidos."
        },
        {
            image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763507355/icon-hospital_ywpghf.png", 
            h2: "Foco no Paciente", 
            p: "Cada atendimento é planejado pensando nas necessidades e conforto do paciente, sempre com atenção especial."
        },
        {
            image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763507355/icon-hospital_ywpghf.png", 
            h2: "Acesso Fácil", 
            p: "Agendamento simples, horários flexíveis e facilidade para acessar nossos serviços, sem complicações."
        },
    ]

    const scrollRight = () => {

        if (!cardRef.current) return;

        setHowManyClicks(width >= 1158 ? 3 : (width >= 775 ? 4 : 9))

        if(touch >= howManyClicks) return setTouch(howManyClicks)

        const x = touch + 1
        const size = width >= 1158 ? 3 : (width >= 775 ? 2 : 1)
        setTouch(x)

        const cardWidth = cardRef.current.offsetWidth + 24;
        scrollRef.current.scrollBy({
            left: cardWidth * size,
            behavior: "smooth"
        });
    }

    const scrollLeft = () => {

        if(!cardRef.current) return
        if(touch <= 0) return setTouch(0)

        const x = touch - 1
        const size = width >= 1158 ? 3 : (width >= 775 ? 2 : 1)
        setTouch(x)

        

        const cardWidth = cardRef.current.offsetWidth + 24
        scrollRef.current.scrollBy({
            left: -(cardWidth * size),
            behavior: "smooth"
        })
    }

    const renderButtonArrows = () => {
        return (
            <div 
                className="
                    w-full
                    flex
                    items-center
                    justify-end
                    px-[24px]
                    gap-[12px]
                    mb-[24px]
            ">
                <button 
                    onClick={scrollLeft}
                    className={`
                        ${touch === 0 ? "border-none" : "border-[1px]"}
                        border-[#E6E8EC]
                        rounded-full
                        p-1
                `}>
                    <ArrowLeft width={24} color={touch === 0 ? "#9fa5b4" : "#777E90"}/>
                </button>
                <button 
                    onClick={scrollRight}
                    className={`
                        ${touch === howManyClicks ? "border-none disabled" : "border-[1px]"}
                        border-[#E6E8EC]
                        rounded-full
                        p-1
                `}>
                    <ArrowRight width={24} color={touch === howManyClicks ? "#9fa5b4" : "#777E90"}/>
                </button>
            </div>
        )
    }

    const renderDoctors = () => {
        if (!doctors){
            return (
                <div className="
                    block
                    w-full
                    h-[46px]
                    relative
                ">
                    <SmallLoader />
                </div>
            )
        }
        return doctors.slice(0,10).map((doc, i) => (
            <CardDoctor key={i} ref={i === 0 ? cardRef : null} width={width} specialty={doc.specialty} desc={"Cuide do seu coração com especialistas dedicados."}/>
        ));
    };
    

    useEffect(() => {

        if(didRun.current) return;
        didRun.current = true;

        const getDoctors =  async() => {
            const response = await axios.get("https://essencial-server.vercel.app/doctors", 
                { withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
                 }
            );
            
            setTimeout(() => {
                setDoctors(response.data)
            },1000)
            
        }

        getDoctors()
    }, [])

    useEffect(() => {
        setHowManyClicks(width >= 1158 ? 3 : (width >= 775 ? 4 : 10))
    }, [])

   

   
    return (
        <div
            className="
                w-full
                h-full
        ">
            <SectionWrapperA theme={theme} cloudinary={cloudinary}/>
            <SectionWrapperB theme={theme} cloudinary={cloudinary}/>

            <section className="
                    flex
                    items-center
                    justify-center
                    flex-col
                    w-full
                    px-[24px]
            ">
                <div className="
                    w-auto
                    h-auto
                    px-[24px]
                    text-center
                    mt-[32px]
                    mb-[20px]
                ">
                    <p className="
                        text-[1.275rem]
                        leading-normal
                        text-[#404040]
                        font-normal
                        font-DmSans
                        mb-[18px]
                    ">
                        Mais Procurados  
                    </p>
                    <p className="
                        text-[1.475rem]
                        leading-normal
                        text-[#404040]
                        font-bold
                        font-DmSans
                    ">
                        Encaixes Disponíveis
                    </p>
                </div>
                <div 
                    className={`
                        w-full
                        ${width >= 1158 ? "max-w-[1120px]" : (width >= 775 ? "max-w-[740px]" : (width >= 407 ? "max-w-[352px]" : "max-w-[270px]"))} 
                        mb-[32px]
                        py-[24px]
                `}>

                    {width <= 775 ? null : renderButtonArrows()}
                    
                    <div
                        style={{ scrollbarWidth: "none" }}
                        ref={scrollRef}
                        className={`
                            flex
                            w-full
                            h-full
                            overflow-x-auto
                            overflow-y-hidden
                            gap-[24px]
                            py-[24px]
                            snap-x
                            snap-mandatory
                            scrollbar-none
                            rounded-[20px]
                            md:touch-none
                            md:select-none
                    `}>  
                        { renderDoctors() }
                    </div>
                </div>
                <div className="
                    w-auto
                    h-auto
                    px-[24px]
                    text-center
                    mt-[100px]
                    mb-[20px]
                ">
                    <p className="
                        text-[1.275rem]
                        leading-normal
                        text-[#404040]
                        font-normal
                        font-DmSans
                        mb-[18px]
                    ">
                        Mais Serviços  
                    </p>
                    <p className="
                        text-[1.475rem]
                        leading-normal
                        text-[#404040]
                        font-bold
                        font-DmSans
                        mb-[24px]
                    ">
                        Veja abaixo com quais especialidades trabalhamos
                    </p>
                </div>

                <div ref={ refSpecialties } className="w-full flex justify-center flex-col items-center mb-[100px]">
                    <SpecialtiesCar dir={"top"} ref={ refSpecialties }/>
                    <SpecialtiesCar dir={"bottom"} ref={ refSpecialties }/>
                </div>
            </section>

            <SectionWrapperC adventages={adventages} theme={theme} validateTheme={validateTheme}/>
            <SectionWrapperD theme={theme} cloudinary={cloudinary}/>

        </div>
    )

}

export default HomePage;