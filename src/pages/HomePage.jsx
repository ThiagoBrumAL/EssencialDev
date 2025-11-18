import { useEffect, useRef, useState } from "react"
import { useTheme } from "../contexts/theme/useTheme";
import { useWindowWidth } from '../hooks/WindowWidth'

import axios from "axios";

import { ArrowLeft } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import CardDoctor from "../components/cards/CardDoctor";
import SmallLoader from "../components/loaders/SmallLoader";

import { cloudinary } from "../cloud/cloudinary";


function HomePage(){

    const [doctors, setDoctors] = useState(null);
    const cardRef = useRef();
    const scrollRef = useRef();
    const didRun = useRef(false);
    const width = useWindowWidth();

    const [touch, setTouch] = useState(0);
    const [howManyClicks, setHowManyClicks] = useState()

    const { theme } = useTheme();

    const doctorsDesc = [
        { department: "Cardiologia", desc: "Cuide do seu coração com especialistas dedicados."},
        { department: "Cardiologia", desc: "Cuide do seu coração com especialistas dedicados."},
        { department: "Cardiologia", desc: "Cuide do seu coração com especialistas dedicados."},
        { department: "Cardiologia", desc: "Cuide do seu coração com especialistas dedicados."},
        { department: "Cardiologia", desc: "Cuide do seu coração com especialistas dedicados."},
        { department: "Cardiologia", desc: "Cuide do seu coração com especialistas dedicados."},
        { department: "Cardiologia", desc: "Cuide do seu coração com especialistas dedicados."},
        { department: "Cardiologia", desc: "Cuide do seu coração com especialistas dedicados."},
        { department: "Cardiologia", desc: "Cuide do seu coração com especialistas dedicados."},
        { department: "Cardiologia", desc: "Cuide do seu coração com especialistas dedicados."},
    ]

    const specialtiesTop = [
        {specialty: "Psiquiatria", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458583/Psiquiatria_ddzzft.png"},
        {specialty: "Psicologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458581/Psicologia_w6dwqg.png"},
        {specialty: "Neurologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763462081/Neurologia_imrrz5.png"},
        {specialty: "Geriatria", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458577/Geriatria_wxkegf.png"},
        {specialty: "Cardiologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763462081/Cardiologia_roivrq.png"},
        {specialty: "Clinica Geral", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458576/Clinica_Geral_jvreyq.png"},
        {specialty: "Pneumologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458580/Pneumologia_giqzfu.png"},
        {specialty: "Infectologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458579/Infectologia_xdwzwb.png"},
    ]

    const specialtiesBottom = [
        {specialty: "Endocrinologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458577/Endocrinologia_rno75a.png"},
        {specialty: "Nutrologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458580/Nutrologia_uz7ht9.png"},
        {specialty: "Ortopedia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458580/Ortopedia_y7lgeg.png"},
        {specialty: "Reumatologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458583/Reumatologia_ytgons.png"},
        {specialty: "Dermatologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458577/Dermatologia_et86tf.png"},
        {specialty: "Alergologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458576/Alergologia_rhafed.png"},
        {specialty: "Ginecologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458578/Ginecologia_insrwh.png"},
        {specialty: "Urologia", image: "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763458583/Urologia_jv7fbz.png"},
    ]
   
    function Img({ light, dark, theme }){
    
        const [imageIsVisible, setImageIsVisible] = useState([])
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

    const SpecialtyDiv = ({ image, text }) => {
        return (
            <div className="
                flex
                flex-col
                justify-center
                items-center
                w-[130px]
            ">
                <img
                    className="
                        w-[98px]
                        h-[98px]
                    "
                    src={image} 
                    alt={text} 
                />
                <h2 className="
                    text-[1.02rem]
                    leading-normal
                    text-[#404040]
                    font-bold
                    font-DmSans
                    mt-4
                    w-[130px]
                    text-center
                ">
                    {text}
                </h2>
            </div>
        )
    }

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

    const renderSpecialties = (dir) => {

        return dir === "top" ? 
            specialtiesTop.map((spec, i) => 
                <SpecialtyDiv
                    key={i}
                    image={spec.image}
                    text={spec.specialty}
                />
            )
         : specialtiesBottom.map((spec, i) => 
                <SpecialtyDiv 
                    key={i}
                    image={spec.image}
                    text={spec.specialty}
                />
            )
        
    }

    useEffect(() => {

        if(didRun.current) return;
        didRun.current = true;

        const getDoctors =  async() => {
            const response = await axios.get("https://essencial-server.vercel.app/doctors");
            
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
            <section 
                className="
                    p-6
                    flex
                    justify-center
                    items-center
                    flex-wrap-reverse
                    gap-[40px]
                    w-full
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
                        light={cloudinary["/home"].imageTop.light}
                        dark={""}
                        theme={theme}
                    />
                </div>
            </section>
            <section 
                className="
                    p-6
                    flex
                    justify-center
                    items-center
                    flex-wrap
                    gap-[80px]
                    w-full
            ">
                <div>
                    <Img 
                        light={cloudinary["/home"].imageMiddle.light}
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
                `}>

                    {width <= 775 ? null : renderButtonArrows()}
                    
                    <div
                        style={{ scrollbarWidth: "none" }}
                        ref={scrollRef}
                        className={`
                            flex
                            w-full
                            overflow-x-auto
                            overflow-y-hidden
                            gap-[24px]
                            snap-x
                            snap-mandatory
                            scrollbar-none
                            rounded-[20px]
                            md:touch-none
                            md:select-none
                    `}>  
                        {renderDoctors()}
                    </div>
                </div>
                <div className="
                    w-auto
                    h-auto
                    px-[24px]
                    text-center
                    mt-[70px]
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

                <div 
                    className={`
                        w-full
                        max-w-[1124px] 
                        mb-[62px]
                `}>     
                    <div
                        style={{ scrollbarWidth: "none" }}
                        className={`
                            flex
                            w-full
                            overflow-x-auto
                            overflow-y-hidden
                            gap-[12px]
                            scrollbar-none
                            md:touch-none
                            md:select-none
                    `}>  
                        {renderSpecialties("top")}
                    </div>
                </div>
                <div 
                    className={`
                        w-full
                        max-w-[1124px] 
                        mb-[62px]
                `}>     
                    <div
                        style={{ scrollbarWidth: "none" }}
                        className={`
                            flex
                            w-full
                            overflow-x-auto
                            overflow-y-hidden
                            gap-[12px]
                            scrollbar-none
                            md:touch-none
                            md:select-none
                    `}>  
                        {renderSpecialties("bottom")}
                    </div>
                </div>
            </section>
        </div>
    )

}

export default HomePage;