export function validatePassword(fieldValue, currentField){

    const ruleUpper = /^(?=.*[A-Z]).*$/
    const ruleLower = /^(?=.*[a-z]).*$/
    const ruleNumber = /^(?=.*\d).*$/
    const ruleSymbolCharacter = /^(?=.*[!@#$%^&*(),.?":{}|<>_\-+=~[\]\\;'/`]).*$/
    

    if(fieldValue.length < 7) return {...currentField, hasErrorInField: true, messageError: "A senha precisa ter no minímo 8 digitos"}

    if(!(ruleUpper.test(fieldValue))) return {...currentField, hasErrorInField: true, messageError: "A senha precisa ter ao menos uma letra maiúscula"}
    
    if(!(ruleLower.test(fieldValue))) return {...currentField, hasErrorInField: true, messageError: "A senha precisa ter ao menos uma letra minúscula"}

    if(!(ruleNumber.test(fieldValue))) return {...currentField, hasErrorInField: true, messageError: "A senha precisa ter ao menos um número"}

    if(!(ruleSymbolCharacter.test(fieldValue))) return {...currentField, hasErrorInField: true, messageError: "A senha precisa ter ao menos um caracter especial"}

    return {...currentField, hasErrorInField: false}
}