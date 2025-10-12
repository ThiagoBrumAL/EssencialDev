//Máscaras
export function maskFullName(value){
    value = value.replace(/[0-9]/g, "");
    return value.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1, word.length)).join(" ")
}

export function maskPassword(value){
    if(value > 10) return value.slice(0, 10);
    return value;
}

export function maskEmail(value){
    return value;
}

export function maskHeightWeightDate(value, fieldId){
    value = value.replace(/\D/g, "");
    if(fieldId === "height" || fieldId === "weight"){

        if(fieldId === "height"){
            if(value.length > 3) value = value.slice(0, 3);
        }else{
            if(value.length > 5) value = value.slice(0, 5);
        }
        if(value.length >= 2){
            value = value.replace(/(\d)(\d{2})$/, "$1.$2")
        }

    }else{
        if(value.length > 8) value = value.slice(0, 8);
        value = value.replace(/(\d)(\d{2})(\d{4})$/, "$1/$2/$3")
    }        
    
    return value;
}



//Validações
export function validateEmail(value, object){
        const providers = [
            "@gmail.com",
            "@outlook.com",
            "@outlook.pt",
            "@hotmail.com",
            "@yahoo.com",
            "@protonmail.com",
            "@zoho.com",
            "@icloud.com",
            "@aol.com",
            "@gmx.com",
            "@yandex.com",
            "@mail.com",
            "@fastmail.com",
            "@tutanota.com"
        ]

        let index = value.indexOf("@");
        let provider = value.slice(index, value.length);

        if(!providers.includes(provider)){
            return {...object, hasErrorInField: true, messageError: "Provedor inválido"};
        }

        return {...object, hasErrorInField: false}
}

export function validadeHeightAndWeight(value, object){
    const array = [];
    for(let l in value){
        array.push(value.charAt(l));
    }
    
    if(object.id === "height"){
        if(array.length <= 2){
            return {...object, hasErrorInField: true, messageError: "Formato inválido"}
        }
        return {...object, hasErrorInField: false}
    }else{
        if(array.length <= 4){
            return {...object, hasErrorInField: true, messageError: "Formato inválido"}
        }
        return {...object, hasErrorInField: false}
    }
}

export function validateBornDate(value, object){

    function validateAge(month, year){
        const date = new Date();
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth() + 1;
        
        let currentAge = currentYear - year;
        if(currentMonth < month){
            currentAge -=1
        }

        return currentAge >= 18 ? true : false;
    }


    const date = new Date();
    const array = value.split("/")

    const userMonth = array[1]
    const userYear = array[2]

    if(value.length <= 9) return {...object, hasErrorInField: true, messageError: "Formato inválido"}
    if(userYear > date.getFullYear() || userYear < 1950) return {...object, hasErrorInField: true, messageError: "Ano inválido"}
    if(userMonth <= 0 || userMonth > 12) return {...object, hasErrorInField: true, messageError: "Mês inválido"}
    if(!validateAge(userMonth, userYear)) return {...object, hasErrorInField: true, messageError: "A idade miníma é de 18 anos"}

    return {...object, hasErrorInField: false}
}

export function validateInputsFieldsSingUp(fields, setFields, isChecked, setCheckColor){
    let newFields = [...fields];
    let data = {
        role: "pacient",
        isValid: true
    };
    
    newFields = newFields.map((f) => {
        const field = document.getElementById(`${f.id}`);

        if(!(field.value.trim())){
            data.isValid = false;
            return {...f, hasErrorInField: true}
        }else{
            data.isValid = true;

            if(f.id === "email"){
                const object = validateEmail(field.value, f);
                if(!object.hasErrorInField){
                    data[f.id] = field.value;
                    return object
                }else{
                    data.isValid = false;
                    return object
                } 
            }

            if(f.id === "birthday"){
                const object = validateBornDate(field.value, f);
                if(!object.hasErrorInField){
                    data[f.id] = field.value;
                    return object
                }else{
                    data.isValid = false;
                    return object
                } 
            }

            if(f.id === "height" || f.id === "weight"){
                const object = validadeHeightAndWeight(field.value, f);
                if(!object.hasErrorInField){
                    data[f.id] = parseFloat(field.value);
                    return object
                }else{
                    data.isValid = false;
                    return object
                }
            }

            data[f.id] =  field.value;
            return {...f, hasErrorInField: false}
        }
    })

    if(!isChecked){
        data.isValid = false;
        setCheckColor("text-red-500")
    }else{
        data["authorized"] = true
        setCheckColor("text-slate-500")
    }

    setFields(newFields)
    return data;
}

export function validateInputsFieldsSingIn(fields, setFields,){
    let newFields = [...fields];
    let data = {
        isValid: true
    };
    
    newFields = newFields.map((f) => {
        const field = document.getElementById(`${f.id}`);

        if(!(field.value.trim())){
            data.isValid = false;
            return {...f, hasErrorInField: true}
        }else{
            data.isValid = true;

            if(f.id === "email"){
                const object = validateEmail(field.value, f);
                if(!object.hasErrorInField){
                    data[f.id] = field.value;
                    return object
                }else{
                    data.isValid = false;
                    return object
                } 
            }

            data[f.id] =  field.value;
            return {...f, hasErrorInField: false}
        }
    })

    setFields(newFields)
    return data;
}