export function validateWeight(fieldValue, currentField){

    const array = [];
    for(let pos in fieldValue) array.push(fieldValue.charAt(pos));
    
    if(array.length <= 4) return {...currentField, hasErrorInField: true, messageError: "Formato inválido"}
    return {...currentField, hasErrorInField: false}
}