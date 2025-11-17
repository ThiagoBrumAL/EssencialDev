export function handlingConfirmCode(fieldValue, currentField, fields = null){

    const rule = /\D+$/

    if(fieldValue.length != 6) return {...currentField, hasErrorInField: true, messageError: "O código precisa ter 6 digitos"}
    
    return {...currentField, hasErrorInField: false, messageError: ""}
}