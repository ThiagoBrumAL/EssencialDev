import { useEffect, useRef, useState, memo } from "react"
import React from "react";
import { useTheme } from "../contexts/theme/useTheme";
import { useWindowWidth } from '../hooks/WindowWidth'
import { useAuth } from "../contexts/auth/useAuth";

import axios from "axios";

import { ArrowLeft } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import CardHome from "../components/cards/CardHome";
import SmallLoader from "../components/loaders/SmallLoader";
import SpecialtiesCar from "../components/carrosel/SpecialtiesCar";
import SectionWrapperA from "../components/wrappers/home/SectionWrapperA"
import SectionWrapperB from "../components/wrappers/home/SectionWrapperB";
import SectionWrapperC from "../components/wrappers/home/SectionWrapperC";
import SectionWrapperD from "../components/wrappers/home/SectionWrapperD";


import { cloudinary } from "../cloud/cloudinary";
import { useApi } from "../api/api";

function Home(){

    const [doctors, setDoctors] = useState(null);
    const [touch, setTouch] = useState(0);
    const [howManyClicks, setHowManyClicks] = useState()
    
    const cardRef = useRef();
    const scrollRef = useRef();
    const refSpecialties = useRef()

    const { token, sub, setUser } = useAuth();

    const images = [
        "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763909804/Vector-1_iqtiks.png",
        "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763909805/Vector-3_jiucdf.png",
        "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763909805/Vector-5_xflgvf.png",
        "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763909805/Vector-7_dhajit.png",
        "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763909805/Vector-7_dhajit.png",
        "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763909812/Vector-12_yxuqwf.png"
    ]

    const width = useWindowWidth();
    const api = useApi();

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

    const renderCards = () => {
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
            <CardHome 
                key={i} 
                ref={i === 0 ? cardRef : null} 
                width={width} 
                desc={"Cuide do seu coração com especialistas dedicados."}
                image={images[i]}
                doctor={{
                    name: doc.name,
                    specialty: doc.specialty
                }}
            />
        ));
    };  

    useEffect(() => {

        const body = { setDoctors }
        api("get", "/home", body)

    }, [])

    useEffect(() => {

        if(!token && !sub) return;

        const body = { setUser }
        api("get", "/info", body);

    }, [token, sub]); 

    useEffect(() => {
        setHowManyClicks(width >= 1158 ? 3 : (width >= 775 ? 4 : 10))
    }, [])

    
   
    return (
        <div
            className={`
                w-full
                ${validateTheme(theme,"bg-[#FAFAFA]","bg-slate-900")}
                mt-[90px]
        `}>
            <SectionWrapperA 
                cloudinary={cloudinary} 
                h1={"Agende sua consulta em minutos"} 
                text={"Clínica geral e diversas especialidades em um só lugar."}
                hasButton={true}
                path={"/home"}
                maxWidth={"max-w-[500px]"}
            />
            <SectionWrapperB 
                cloudinary={cloudinary}
                h1={"Sua saúde é a nossa prioridade"} 
                text={"Conte com uma equipe preparada para cuidar de você."}
                path={"/home"}
                maxWidth={"max-w-[500px]"}
            />

            <section className="
                    flex
                    items-center
                    justify-center
                    flex-col
                    w-full
            ">
                <div className="
                    w-auto
                    h-auto
                    text-center
                    mt-[32px]
                    mb-[20px]
                    px-[24px]
                ">
                    <p className={`
                        text-[1.275rem]
                        leading-normal
                        ${validateTheme(theme, "text-[#404040]", "text-[#FFFAFE]")}
                        font-normal
                        font-DmSans
                        mb-[12px]
                    `}>
                        Mais Procurados  
                    </p>
                    <p className={`
                        text-[1.475rem]
                        leading-normal
                        ${validateTheme(theme, "text-[#404040]", "text-[#FFFAFE]")}
                        font-bold
                        font-DmSans
                        mb-[24px]
                    `}>
                        Encaixes Disponíveis
                    </p>
                </div>
                <div 
                    className={`
                        w-full
                        ${width >= 1158 ? "max-w-[1120px]" : (width >= 775 ? "max-w-[740px]" : (width >= 407 ? "max-w-[352px]" : "max-w-[270px]"))} 
                        sm:mb-[32px]
                        sm:py-[24px]
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
                        { renderCards() }
                    </div>
                </div>
                <div className="
                    w-auto
                    h-auto
                    text-center
                    sm:mt-[100px]
                    mt-[50px]
                    mb-[20px]
                    px-[24px]
                ">
                    <p className={`
                        text-[1.275rem]
                        leading-normal
                        ${validateTheme(theme, "text-[#404040]", "text-[#FFFAFE]")}
                        font-normal
                        font-DmSans
                        mb-[18px]
                    `}>
                        Mais Serviços  
                    </p>
                    <p className={`
                        text-[1.475rem]
                        leading-normal
                        ${validateTheme(theme, "text-[#404040]", "text-[#FFFAFE]")}
                        font-bold
                        font-DmSans
                        mb-[24px]
                    `}>
                        Veja abaixo com quais especialidades trabalhamos
                    </p>
                </div>

                <div ref={ refSpecialties } className="w-full flex justify-center flex-col items-center sm:mb-[100px] mb-[20px]">
                    <SpecialtiesCar dir={"top"} ref={ refSpecialties }/>
                    <SpecialtiesCar dir={"bottom"} ref={ refSpecialties }/>
                </div>
            </section>

            <SectionWrapperC adventages={ adventages }/>
            <SectionWrapperD path={"/home"}/>

        </div>
    )

}

export default Home;