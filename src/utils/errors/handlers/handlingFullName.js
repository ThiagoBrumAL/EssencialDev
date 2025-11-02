export function handlingFullName(fieldValue, currentField){

    if(fieldValue.length <= 2) return {...currentField, hasErrorInField: true, messageError: "O deve ter no minímo 3 caracteres"}
    return {...currentField, hasErrorInField: false, messageError: ""}

}
