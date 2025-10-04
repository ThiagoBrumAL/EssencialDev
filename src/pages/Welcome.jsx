import { useNavigate } from "react-router-dom";

function Welcome({theme, validateTheme}){

    const navigate = useNavigate();

    function renderSignIn(){
        setTimeout(() => {
            navigate('/sign-in')
        }, 5000)
    }

    return (
        <div>
            <h1 className={`lg:text-[48px] md:text-[32px] text-[28px] mt-[80px] font-bold ${validateTheme(theme, "text-slate-950", "text-slate-300")}`}>Seja Bem vindo!</h1>
            {renderSignIn()}
        </div>
        
        
    )
}

export default Welcome;