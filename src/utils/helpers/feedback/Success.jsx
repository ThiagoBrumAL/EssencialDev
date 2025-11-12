
//Icons
import { UserRoundCheck, Send, ShieldOff } from 'lucide-react';

export const goodFeedback = (status, renderCardFeedback, path) => {

    const messages = {
        // Sucessful

        "/recover":{
            200: {
                icon: <Send />, 
                color: "bg-green-400",
                message: "Mensagem enviada com sucesso",
                timeout: 5000
            },
        },

        "/recover/confirm-password":{
            200: {
                icon: <Send />, 
                color: "bg-green-400",
                message: "Senha alterada com sucesso",
                timeout: 5000
            },
        },

        "/sign-in":{
            200: {
                icon: <ShieldOff />, 
                color: "bg-red-400",
                message: "Mensagem enviada com sucesso",
                timeout: 5000
            },
        },

        "/sign-up":{
            201: {
                icon: <UserRoundCheck />, 
                color: "bg-green-400",
                message: "Usuário cadastrado com sucesso",
                timeout: 5000
            },
        }
        

    }

    const code = messages[path][status]

    return renderCardFeedback(code.icon, code.color, code.message, code.timeout)
}
