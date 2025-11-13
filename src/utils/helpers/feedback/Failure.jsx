import { ShieldOff } from "lucide-react"

export const badFeedback = (status, renderCardFeedback, path) => {

    const messages = {

        "/recover":{
            400: {
                icon: <ShieldOff />, 
                color: "bg-red-400",
                message:"",
                timeout: 5000
            },
            500: {
                icon: <ShieldOff />, 
                color: "bg-red-400",
                message:"Erro no servidor",
                timeout: 5000
            }
        },

        "/recover/confirm-password":{
            400: {
                icon: <ShieldOff />, 
                color: "bg-red-400",
                message:"",
                timeout: 5000
            },
            500: {
                icon: <ShieldOff />, 
                color: "bg-red-400",
                message:"Código inválido",
                timeout: 5000
            }
        },

        "/sign-in":{
            400: {
                icon: <ShieldOff />, 
                color: "bg-red-400",
                message:"Nome ou senha incorretos",
                timeout: 5000
            },
            500: {
                icon: <ShieldOff />, 
                color: "bg-red-400",
                message:"Erro no servidor",
                timeout: 5000
            }
        },

        "/sign-up":{
            400: {
                icon: <ShieldOff />, 
                color: "bg-red-400",
                message:"E-mail já em uso",
                timeout: 5000
            },
            500: {
                icon: <ShieldOff />, 
                color: "bg-red-400",
                message:"Erro no servidor",
                timeout: 5000
            }
        }
        
    }

    const code = messages[path][status]

    return renderCardFeedback(code.icon, code.color, code.message, code.timeout)
}
