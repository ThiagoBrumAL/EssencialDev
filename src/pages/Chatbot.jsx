import { useTheme } from "../contexts/theme/useTheme";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useApi } from "../api/api";
import SmallLoader from "../components/loaders/SmallLoader";

function Chatbot() {
    const api = useApi();
    const { theme, validateTheme } = useTheme();

    const [user, setUser] = useState(null);
    const [isTyping, setIsTyping] = useState(false);

    const messagesContainerRef = useRef(null);

    const [messages, setMessages] = useState([
        { author: "bot", text: "Olá! Como posso ajudar?" }
    ]);

    const [ask, setAks] = useState([
        { 
            ask: "Como faço para agenda minha consulta?", 
            response: "Primero retorne para a o inicio e clique no primeiro botão agendar consulta" 
        },

        { 
            ask: "Como posso consultar meus dados?", 
            response: "No menu superior, olhe para o canto direito e clique no ícone de usuário. Assim que clicar você terá acesso aos recursos do usuário" 
        },
        { 
            ask: "Existem quantas especialidades atualmente?", 
            response: `Atualmente existem 16 especialidades. Psiquiatria, Psicologia, Neurologia, Geriatria, Cardiologia, Clinica Geral, Pneumologia, Infectologia, Endocrinologia Nutrologia, Ortopedia, Reumatologia, Dermatologia, Alergogia, Ginecologia e Urologia` },
        { 
            ask: "Como posso encerrar minha sessão?", 
            response: "No menu superior, olhe para o canto direito e clique no ícone de usuário. Assim que clicar você terá acesso aos recursos do usuário. Clique na opção 'Sair', lá você poderá se deslogar da aplicação." 
        },
        { 
            ask: "Como alterar a temática da aplicação?", 
            response: "No menu superior, olhe para o canto direito e clique no ícone de usuário. Assim que clicar você terá acesso aos recursos do usuário. Clique na opção 'Tema', lá você poderá se deslogar da aplicação." 
        },
        { 
            ask: "Essa aplicação foi desenvolvida utilizando quais tecnologias?", 
            response: "Esta aplicação foi desenvolvida com Typescript, Javascript, React, Tailwindcss, Cognito AWS, Google Firebase e dentre outras tecnologias e frameworks :)" 
        },
    ]);

    const handleOptionClick = (question) => {
        setMessages(prev => [...prev, { author: "user", text: question }]);

        const found = ask.find(item => item.ask === question);

        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [
                ...prev,
                { author: "bot", text: found?.response || "Não encontrei essa resposta :(" }
            ]);
        }, 1000);
    };

    useEffect(() => {
        api("get", "/info", { setUser });
    }, []);

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages, isTyping]);


    const Option = ({ text, onClick }) => (
        <motion.button
            onClick={onClick}
            whileTap={{ scale: 0.9 }}
            className={`
            border-[2px] 
            ${validateTheme(theme, "text-slate-950 border-slate-300", "text-slate-500 border-slate-500")}
            h-[36px] 
            px-[10px] 
            rounded-xl 
            flex 
            items-center 
            text-[0.8rem] 
            md:text-[1rem]
            
        `}>
            {text}
        </motion.button>
    );

    const Ask = ({ ask }) => (
        <motion.div className="flex flex-row gap-[12px] md:gap-[24px]">
            <img
                src="https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763819326/ChatbotImg_j1t1sl.png"
                className="h-[34px] w-[34px]"
            />
            <div className={`
                ${validateTheme(theme, "text-slate-950 border-slate-300 bg-slate-200", "text-slate-400 border-slate-500 bg-slate-800")}
                px-[24px] 
                py-[16px] 
                rounded-lg 
                max-w-[500px]
                border-[2px]
            `}>
                {ask}
            </div>
        </motion.div>
    );

    const Response = ({ response }) => (
        <div className="flex flex-row gap-[12px] md:gap-[18px] justify-end w-full">
            <div className={`
                ${validateTheme(theme, "text-slate-950 border-slate-300 bg-slate-200", "text-slate-400 border-slate-500 bg-slate-800")}
                px-[24px] 
                py-[16px] 
                rounded-lg 
                max-w-[500px]
                border-[2px]
            `}>
                {response}
            </div>
            <div className="min-h-[34px] min-w-[34px] max-w-[34px] max-h-[34px] rounded-full bg-yellow-400 flex justify-center items-center font-bold text-[#FFFAFE]">
                {user?.name?.charAt(0)}
            </div>
        </div>
    );

    const TypingIndicator = () => (
        <div className="flex flex-row gap-[12px] md:gap-[24px] opacity-80">
            <img
                src="https://res.cloudinary.com/essencialdev-cloudinary/image/upload/v1763819326/ChatbotImg_j1t1sl.png"
                className="h-[34px] w-[34px]"
            />
            <div className={`${validateTheme(theme,"bg-slate-200", "bg-slate-600")} px-[20px] py-[12px] font-bold rounded-lg max-w-[300px] animate-pulse`}>
                ...
            </div>
        </div>
    );

    return (
        <div 
        className={
            `w-full 
            min-h-[100dvh] 
            flex justify-center 
            items-start 
            px-[24px] 
            ${validateTheme(theme, "bg-[#FAFAFA]", "bg-slate-900")}
        `}>
            <section 
            className="
                w-full 
                flex 
                justify-center 
                md:pt-[80px]
            ">

                {user ? (
                    <div 
                    className={`
                        w-full 
                        max-w-[1200px] 
                        shadow-lg 
                        rounded-2xl 
                        border-[2px] 
                        ${validateTheme(theme, "border-slate-200", "border-slate-500")} 
                    `}>

                        <div 
                        className={`
                            w-full 
                            border-b-[2px] 
                            ${validateTheme(theme, "border-slate-200", "border-slate-500")} 
                            px-[32px] 
                            py-[24px]
                        `}>
                            <h1 
                            className={`
                                text-[1rem] 
                                md:text-[1.175rem] 
                                font-DmSans
                                ${validateTheme(theme, "text-black", "text-slate-400")}
                                font-bold
                            `}>
                                Assistente Virtual
                            </h1>
                        </div>

                        <div 
                        className={`
                            w-full 
                            md:px-[32px] 
                            px-[24px] 
                            md:py-[42px] 
                            py-[32px] 
                            ${validateTheme(theme, "bg-white text-slate-950", "bg-slate-900 text-slate-300")}
                        `}>

                            <div
                                ref={messagesContainerRef}
                                className="h-[400px] overflow-y-auto scrollbar-none"
                                style={{ scrollbarWidth: "none" }}
                            >
                                {messages.map((msg, i) => (
                                    <div key={i} className="mb-[28px]">
                                        {msg.author === "bot" && <Ask ask={msg.text} />}
                                        {msg.author === "user" && <Response response={msg.text} />}
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="mb-[28px]">
                                        <TypingIndicator />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={`w-full border-t-[2px] ${validateTheme(theme, "border-slate-200", "border-slate-500")}  px-[32px] py-[24px] flex flex-wrap gap-[20px]`}>
                            {ask.map(item => (
                                <Option key={item.ask} onClick={() => handleOptionClick(item.ask)} text={item.ask} />
                            ))}
                        </div>

                    </div>
                ) : (
                    <SmallLoader />
                )}

            </section>
        </div>
    );
}

export default Chatbot;
