import { validatorHandlers } from "./handlingValidador";

export function handlingInput(fields){
    return fields.map(currentField => {
        if(!currentField.value.trim()){
            return {...currentField, hasErroInField: true};
        }else{
            return validatorHandlers(currentField.value, currentField, fields)
        }
    })
}