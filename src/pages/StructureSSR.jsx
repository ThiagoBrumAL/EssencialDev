
// Components.
import ButtonTheme from "../components/login/ButtonTheme.jsx";
import Title from "../components/login/Title.jsx";
import CardFeedback from "../components/login/CardFeedback.jsx";
import { Sun, Moon } from "lucide-react";

// Hooks.
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";


// Contexts.
import { ScreenContext } from "../contexts/ScreenContext.jsx";
import { AuthProvider } from "../contexts/AuthContext.jsx";
import { GlobalContext } from "../contexts/GlobalContext.jsx";
import Loader from "../components/loader/Loader.jsx";


// Cloud for images.
import { cloudinary } from "../cloud/cloudinary.js";


// SSF - Sign-in / Sign-up / Recover.
function ScreenSSR({ children }) {

    // State para simular o comportamento de loading.
    const [load, setLoad] = useState(true)
    const [userOpacity, setUserOpacity] = useState(0);

    const locale = useLocation()

    // Variáveis criadas no contexto, e utilizada para renderizar a mensagem de feedback para o usuário.
    const {

        messageFeedback, // messageFeedback = Estado (State) que irá exibir qual é a mensagem correspondente para a determinada ação.

        colorFeedback, // colorFeedback = Estado (State) que armazena a cor do elemento a ser exibido.

        iconFeedback, // iconFeedback = Estado (State) que armazena qual ícone deve ser mostrado para o usuário.

        titles, // titles = Este estado (State) é um array de objetos que guarda o titulo correspondente para cada página.

        showMessage

    } = useContext(ScreenContext) // useContext é um hook utilizado para transmitir informações para outros componentes sem o uso de props. Dentro dele você deve indicar qual contexto irá ser utilizado.


    const { 
        theme, // Estado (State) que contém qual é o tema que está sendo utilizado pelo usuário.

        changeTheme, // Função que iverte o tema.

        validateTheme, // Função que valida e troca o tema.

    } = useContext(GlobalContext) // useContext é um hook utilizado para transmitir informações para outros componentes sem o uso de props. Dentro dele você deve indicar qual contexto irá ser utilizado.


    // useEffect é um hook utilizado para ser executado toda vez que o parametro [param] passado sofrer alteração. Nesta situação foi passado um array vazio, sem parametro, isso significa que ele irá executar está função a **primeira** vez que a tela ser renderizada.
    useEffect(() => {

        // setTimeout está sendo utilizado para deixar o load por 3 segundos e tirá-lo após.
        const timer = setTimeout(() => {
            setLoad(false)
            setUserOpacity(1)
        }, 3000)

        return (() => clearTimeout(timer))

    }, [])


    // Img é um componente de função que espera 2 parametros, o tema e o caminho. Ele renderiza a imagem do site story set
    const Img = ({ path, theme }) => {

        const [imageIsVisible, setImageIsVisible] = useState(false)

        // Se o theme for true, o valor do target será "light". Caso contrário, será "dark".
        const targetTheme = theme ? "light" : "dark"

        useEffect(() => {

            setImageIsVisible(false)
            const timer = setTimeout(() => setImageIsVisible(true), 50)
            return () => clearTimeout(timer)

        }, [theme, path])

        return (
            <img
                id="logo"
                className={`}
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
                src={cloudinary[path][targetTheme]}
                alt="Essecial Dev Logo"
            />
        )
    }

    return (

        <div
        id="login-screen"
        className={`
            w-full 
            min-h-dvh
            flex md:flex-row
            flex-col
            overflow-x-hidden
            relative
            ${validateTheme(theme,"bg-[#FFFAFE]","bg-slate-900")}
            z-[1]
            ${load ? "overflow-y-hidden" : "overflow-y-scroll"}
        `}>

            {/* Se o load for verdadeiro, renderize o componente. Caso contrário, tire-o */}
            {load && <Loader />}

            <div 
            style={{ opacity: userOpacity }} 
            className={`
                flex
                sm:flex-row
                flex-col
                transition 
                duration-1000
                ease-in-out
                ${load ? "opacity-0 h-0 w-0" : "opacity-100 w-full h-full "}
            `}>
                <section
                    id="login-screen-section-one"
                    className={`  
                        ${validateTheme(theme, "from-teal-400 to-indigo-400 ", "from-indigo-900 to-slate-950")} 
                        flex
                        flex-col
                        justify-center
                        items-center
                        w-full 
                        min-h-full 
                        bg-gradient-to-tr
                        py-6 
                        px-[32px]
                `}>

                    <div>
                        <div className=" 
                            w-full 
                            flex 
                            justify-center
                            relative
                        ">
                            <Title 
                                path={locale.pathname} 
                                titles={titles}
                            />
                        </div>

                        <div className="
                            w-full 
                            flex 
                            justify-center"
                        >
                            <Img 
                                path={locale.pathname} 
                                theme={theme}
                            />
                        </div>
                    </div>
                </section>

                <section
                    id="login-screen-div-two"
                    className={`
                        ${validateTheme(theme,"bg-[#FFFAFE]","bg-slate-900")} 
                        w-full 
                        min-h-dvh 
                        flex 
                        items-center 
                        justify-between 
                        py-4 
                        flex-col 
                        px-[32px] 
                        relative
                    `}>

                    <AuthProvider>
                        { children }
                    </AuthProvider>

                    <div
                        id="container-theme"
                        className="
                        flex 
                        flex-col 
                        gap-4 
                        items-center
                        sm:gap-12 
                        sm:flex-row"
                    >
                        <div className="
                            flex 
                            gap-1 
                            items-center"
                        >
                            {theme ? <Moon color="#64748b"/> : <Sun color="#64748b"/>}

                            <p className="m-0 p-0 text-slate-500 font-[600] font-Inter">
                            {validateTheme(theme, "Modo escuro", "Modo claro")}
                            </p>
                        </div>

                        <div className="
                            h-[20px]
                            w-auto
                        ">
                            <ButtonTheme theme={theme} changeTheme={changeTheme} />
                        </div>
                        
                    </div>
                </section>

                {messageFeedback && 
                    <CardFeedback 
                        theme={theme} 
                        object={{message: messageFeedback, show: showMessage, color: colorFeedback, icon: iconFeedback}}
                    />
                }
            </div>
        </div>
    );
}

export default ScreenSSR;
