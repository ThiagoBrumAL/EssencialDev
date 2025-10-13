import { validateInputsFields, validateCheckbox } from "../handlings/functions";
import { ShieldOff } from 'lucide-react';

export async function sendDatasPost(event, object){
    event.preventDefault();
    let newData = validateInputsFields(object.fields, object.setFields);

    if(object.path === "/sign-up") newData = validateCheckbox(newData, object.isChecked, object.setCheckColor);

    try {
        if(newData.isValid){
            let user = {};
            for(let k in newData){
                if(k !== "isValid"){
                    user[k] = newData[k]
                }
            }

            const response =  await fetch(object.URL, {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(user)
            })

            if(response.status === 400){
                const message = await response.json();
                console.log(message);
            }

            if(response.status === 401){
                object.renderCardFeedbackError(<ShieldOff/>, "bg-red-400", "Acesso não autorizado", 5000)
            }

            if(response.ok){

                if(object.path === "/sign-in" && object.navigate) return object.navigate("/home")
                object.renderCardFeedbackOk()
            }
        }else{
            throw new Error("Invalid operation")
        }
    } catch (error) {
        console.log(error.message);
        return false;
    }
    
}