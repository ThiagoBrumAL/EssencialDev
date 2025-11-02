import { validator } from "./handlingValidador";

export function validateInput(field, setFields){

    let copyField = [...field];

    let defaultFields = {
        role: "pacient",
        isValid: true
    };

    copyField = copyField.map((currentField) => {
        const field = document.getElementById(`${currentField.id}`);

        if(!(field.value.trim())){

            defaultFields.isValid = false;
            return {...currentField, hasErrorInField: true};
        }else{
            
            const validatedObject = validator(field.value, currentField, defaultFields);
            defaultFields = validatedObject.data;
            return validatedObject.object;
        }

    })

    setFields(copyField)
    return defaultFields;
}