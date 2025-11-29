import SectionWrapperA from "../components/wrappers/home/SectionWrapperA";
import { useTheme } from "../contexts/theme/useTheme";
import { cloudinary } from "../cloud/cloudinary";
import SectionWrapperB from "../components/wrappers/home/SectionWrapperB";
import { useApi } from "../api/api";
import { useEffect, useState } from "react";
import SmallLoader from "../components/loaders/SmallLoader";

function About () {

    const { theme, validateTheme } = useTheme();
    const [doctors, setDoctors] = useState(null);

    const [top, setTop] = useState(null)
    const [bottom, setBottom] = useState(null)

    const api = useApi();

    const doctorsImages = {
        top: [
            "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763857396/image1_q6je5s.png",
            "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763861390/Middle-2_rmuced.png",
            "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763861389/Middle_yjv32v.png",
            "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763861390/Middle-6_jwcckc.png",
        ],
        bottom: [
            "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763861390/Middle-3_fjqhic.png",
            "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763861390/Middle-4_se0ldf.png",
            "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763921912/Middle-1_t6g9zm.png",
            "https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763921912/Middle_eph2d5.png",
        ]
    }

    useEffect(() => {
    
        const body = { setDoctors }
        api("get", "/about", body)

    }, [])

    useEffect(() => {
        if(doctors){
            setTop(doctors.slice(0,4))
            setBottom(doctors.slice(5,9))
            console.log(doctors);
        }
    },[doctors])
    
    const CardDoctor = ({ name, specialty, image }) => {
        return (
            <div className="
                mb-[30px]
            ">

                <div>
                    <img 
                    className="
                        rounded-xl
                        max-w-[313px]
                    "
                    src={ image }
                    alt=""
                />
                </div>
                <div className="
                    w-full
                    max-w-[313px]
                ">
                    <h2 className={`
                        font-DmSans
                        text-[1.175rem]
                        leading-normal
                        ${validateTheme(theme, "text-slate-900", "text-slate-200")}
                        mt-[12px]
                        font-bold
                    `}>
                        { name }
                    </h2>
                    <p className={`
                        font-Rubik
                        text-[0.9rem]
                        font-bold
                        leading-normal
                        ${validateTheme(theme, "text-slate-900", "text-slate-400")}
                        my-[12px]
                    `}>
                        { specialty }
                    </p>
                    <p className={`
                        font-DmSans
                        text-[1rem]
                        leading-normal
                        ${validateTheme(theme, "text-slate-900", "text-slate-300")}    
                    `}>
                        Especialista em saúde do coração, Ana Flavia acompanha cada paciente com atenção, oferecendo diagnósticos precisos e orientações personalizadas.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div
            className={`
                w-full
                md:mt-[50px]
                mt-[30px]
                mb-[60px]
        `}>
            <div className={`
                w-full
                h-full
                py-[32px]
                ${validateTheme(theme, "bg-slate-50", "bg-slate-800")}
                flex
                justify-center
                items-center
                mb-[50px]
            `}>
                <h1 className={`
                    font-DmSans
                    md:text-[3.275rem]
                    text-[3rem]
                    font-bold
                    md:leading-[3.975rem]
                    leading-[2.675rem]
                    ${validateTheme(theme, "text-slate-950", "text-sky-300")}
                `}>
                    Sobre nós
                </h1>
            </div>
            <SectionWrapperB 
                cloudinary={cloudinary}
                h1={"Nossa história"} 
                text={" Clínica EssencialDEV nasceu com o propósito de facilitar o acesso à saúde e oferecer um atendimento mais humano para quem muitas vezes não consegue encontrar suporte de forma simples ou acessível. Começamos de maneira modesta, com poucas especialidades e uma equipe pequena, mas sempre com a certeza de que poderíamos fazer a diferença. Com o tempo, a clínica cresceu, ganhou novos profissionais e ampliou sua atuação até alcançar as 16 especialidades que atendemos hoje. Esse crescimento veio da confiança dos pacientes e do compromisso contínuo em oferecer teleconsultas gratuitas, seguras e acolhedoras para qualquer pessoa maior de idade. Nossa história é marcada por evolução, dedicação e pelo desejo de levar cuidado e informação a quem precisa, unindo tecnologia e empatia para tornar a saúde mais acessível e essencial para todos."}
                path={"/about"}
                maxWidth={"max-w-[700px]"}
            />
            <SectionWrapperA 
                theme={theme} 
                cloudinary={cloudinary} 
                h1={"Nossa Missão"} 
                text={"A missão da Clínica EssencialDEV é promover acesso universal, gratuito e humanizado à saúde, garantindo que qualquer pessoa maior de idade possa receber orientação e atendimento especializado com qualidade, agilidade e acolhimento. Nosso compromisso é romper barreiras — sejam financeiras, geográficas ou emocionais — oferecendo teleconsultas que aproximam profissionais de saúde e pacientes de forma simples, segura e respeitosa. Trabalhamos para criar uma experiência de cuidado que vai além da consulta: queremos que cada paciente seja ouvido com atenção, tenha suas necessidades compreendidas e encontre na clínica um espaço de confiança, empatia e responsabilidade."}
                hasButton={false}
                path={"/about"}
                maxWidth={"max-w-[700px]"}
            />
            <div className="
                w-auto
                h-auto
                text-center
                mt-[32px]
                mb-[20px]
                px-[24px]
            ">
                <h1 className={`
                    text-[1.475rem]
                    leading-normal
                    ${validateTheme(theme, "text-[#404040]", "text-[#FFFAFE]")}
                    font-bold
                    font-DmSans
                    mb-[12px]
                `}>
                    Nossos Melhores Especialistas 
                </h1>
                <p className={`
                    text-[1.275rem]
                    leading-normal
                    ${validateTheme(theme, "text-[#585858]", "text-[#FFFAFE]")}
                    font-normal
                    font-DmSans
                    mb-[24px]
                `}>
                    Equipe qualificada para acompanhar você em cada etapa do cuidado com sua saúde.
                </p>
            </div>
            <div className="
                flex
                flex-row
                flex-wrap
                gap-[42px]
                items-center
                justify-center
                w-full
                h-auto
                mt-[70px]
                px-[32px]
                relative
            ">
                {
                    top ?
                    top.map((doc, index) => {
                        return <CardDoctor 
                            key={doc.id} 
                            name={doc.name} 
                            specialty={doc.specialty}
                            image={doctorsImages.top[index]}
                        />
                    }) : <SmallLoader />
                }

            </div>
            <div className="
                flex
                flex-row
                flex-wrap
                gap-[42px]
                items-center
                justify-center
                w-full
                h-auto
                mt-[70px]
                px-[32px]
            ">
                
                {
                    bottom &&
                    bottom.map((doc, index) => {
                        return <CardDoctor 
                            key={doc.id} 
                            name={doc.name} 
                            specialty={doc.specialty}
                            image={doctorsImages.bottom[index]}
                        />
                    })
                }

            </div>
        </div>
    )
}

export default About;