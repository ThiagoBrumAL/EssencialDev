import { validadeHeight } from "./handlingHeight";
import { validateBornDate } from "./handlingBornDate";
import { validateWeight } from "./handlingWeight";
import { validateFullName } from "./handlingFullName";
import { validatePassword } from "./handlingPassword";
import { validateEmail } from "./handlingEmail";

export function validator(fieldValue, currentField, defaultFields){

    const dynamicsFunctions = {
        "email": validateEmail,
        "password": validatePassword,
        "birthday": validateBornDate,
        "height": validadeHeight,
        "weight": validateWeight,
        "name": validateFullName
    }

    const result = dynamicsFunctions[currentField.id](fieldValue, currentField)

    const returnStructure = {
        data: defaultFields,
        object: result
    }

    if(!result.hasErrorInField){

        returnStructure.data[currentField.id] = 
            currentField.id === "height" || currentField.id === "weight"
            ? parseFloat(fieldValue) 
            : fieldValue;

        return returnStructure

    }else{

        returnStructure.data.isValid = false;
        return returnStructure

    } 
}
