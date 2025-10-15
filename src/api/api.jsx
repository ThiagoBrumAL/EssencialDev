import { validateInputsFields, validateCheckbox } from "../handlings/functions";
import { ShieldOff, MailWarning  } from 'lucide-react';


function recoverEmail(object){
    
    object.renderCardFeedbackOk()
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

                if(object.path === "/sign-in" && object.navigate) return object.navigate("/home")
                if(object.path === "/recover") return recoverEmail(object);

            }else{

                switch(response.status){
                    case 401:
                        object.renderCardFeedbackError(<ShieldOff />, "bg-red-400", "Acesso não autorizado", 5000)
                        break
                    case 409:
                        object.renderCardFeedbackError(<MailWarning  />, "bg-red-400", "Este e-mail já registrado", 5000)
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