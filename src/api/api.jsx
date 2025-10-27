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

export async function sendDatasPost(event, object){
    event.preventDefault();
    let newData = validateInputsFields(object.fields, object.setFields);

    if(object.path === "/sign-up") newData = validateCheckbox(newData, object.isChecked, object.setCheckColor);

    try {
        if(newData.isValid){
            let user = {};
            for(let k in newData) if(k !== "isValid") user[k] = newData[k]

            const response =  await fetch(object.URL, {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(user)
            })

            if(response.ok){

                const body = await response.json()
                const token = await body.accessToken

                switch(object.path){
                    case "/sign-in":
                        object.login(token, () => object.navigate("/home"))
                        break
                    case "/sign-up":
                        object.renderCardFeedback(<UserRoundCheck />, "bg-green-400", "Usuário cadastrado", 5000)
                        break
                    case "/recover":
                        recoverEmail(object);
                        break
                }
            }else{

                switch(response.status){
                    case 401:
                        object.renderCardFeedback(<ShieldOff />, "bg-red-400", "Acesso não autorizado", 5000)
                        break
                    case 409:
                        object.renderCardFeedback(<MailWarning  />, "bg-red-400", "E-mail já registrado", 5000)
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