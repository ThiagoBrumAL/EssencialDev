import { validatorHandlersFinal } from "./handlingValidadorFinal";

export function handlingAnalyzeDatas(fields, setFields){

    let copyField = [...fields];

    let defaultFields = {
        role: "pacient",
        isValid: true
    };

    copyField = copyField.map((currentField) => {
        if(!(currentField.value.trim())){
            defaultFields.isValid = false;
            return {...currentField, hasErrorInField: true};
        }else{
            const validatedObject = validatorHandlersFinal(currentField.value, currentField, defaultFields, fields);
            defaultFields = validatedObject.data;
            return validatedObject.object;
        }

    })

    setFields(copyField)
    return defaultFields;
}