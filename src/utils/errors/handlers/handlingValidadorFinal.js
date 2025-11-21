import { handlingFullName } from './handlingFullName'
import { handlingPassword } from './handlingPassword'
import { handlingWeight } from './handlingWeight'
import { handlingBornDate } from './handlingBornDate'
import { handlingEmail } from './handlingEmail'
import { handlingHeight } from './handlingHeight'
import { handlingConfirmCode } from './handlingConfirmCode'
import { handlingConfirmPassword } from './handlingConfirmPassword'
import { handlingSub } from './handlingSub'


export function validatorHandlersFinal(fieldValue, currentField, defaultFields, fields){

    const dynamicsFunctions = {
        "email": handlingEmail,
        "password": handlingPassword,
        "birthday": handlingBornDate,
        "height": handlingHeight,
        "weight": handlingWeight,
        "name": handlingFullName,
        "confirmationCode": handlingConfirmCode,
        "newPassword": handlingConfirmPassword,
        "sub": handlingSub
    }

    const result = dynamicsFunctions[currentField.id](fieldValue, currentField, fields)

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
