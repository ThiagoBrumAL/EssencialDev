import { validateInputsFields, validateCheckbox  } from "../handlings/functions";
import { ShieldOff, MailWarning, Send, UserRoundCheck } from 'lucide-react';


function recoverEmail(object){
    
    object.renderCardFeedback(<Send />, "bg-green-400", "E-mail enviado com sucesso", 5000)
    let counter = 60;

    const field = object.fields[0];
    object.setFields([{
        ...field, 
        hasErrorInField: true, 
        disabled: true, 
        messageError: `Aguarde ${counter}s para enviar outra solicitação`
    }])

    let interval = setInterval(() => {
        counter--;
        if(counter > 0){
            object.setFields([{
                ...field,
                hasErrorInField: true, 
                disabled: true, 
                messageError: `Aguarde ${counter}s para enviar outra solicitação`
            }])
        }else{
            clearInterval(interval);
            object.setFields([{
                ...field, 
                hasErrorInField: false, 
                disabled: false,
                messageError: ""
            }])
        }
    }, 1000)
} 

export async function sendDatasPost(event, user){

    // Evitar o envio do formulário
    event.preventDefault();

    
    let newData = validateInputsFields(user.fields, user.setFields);

    if(user.path === "/sign-up") newData = validateCheckbox(newData, user.isChecked, user.setCheckColor);

    try {
        if(newData.isValid){
            let userForSend = {};
            for(let k in newData) if(k !== "isValid") user[k] = newData[k]

            const response =  await fetch(user.URL, {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(userForSend)
            })

            if(response.ok){

                const body = await response.json()
                const token = await body.accessToken

                switch(user.path){
                    case "/sign-in":
                        user.login(token, () => user.navigate("/home"))
                        break
                    case "/sign-up":
                        user.renderCardFeedback(<UserRoundCheck />, "bg-green-400", "Usuário cadastrado", 5000)
                        break
                    case "/recover":
                        recoverEmail(user);
                        break
                }
            }else{

                switch(response.status){
                    case 401:
                        user.renderCardFeedback(<ShieldOff />, "bg-red-400", "Acesso não autorizado", 5000)
                        break
                    case 409:
                        user.renderCardFeedback(<MailWarning  />, "bg-red-400", "E-mail já registrado", 5000)
                        break
                }
            }
        }else{
            throw new Error("Invalid operation")
        }
    } catch (error) {
        console.log(error.message);
        return false;
    }
}