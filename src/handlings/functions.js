//Máscaras
export function maskFullName(value){
    value = value.replace(/[0-9]/g, "");
    return value.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1, word.length)).join(" ")
}

export function maskPassword(value){
    if(value.length > 20) return value.slice(0, 20);
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

function validatePassword(value, object){
    const role = /^(?=.*[A-Za-z])(?=.*\d).+$/;

    if(value.length < 5) return {...object, hasErrorInField: true, messageError: "A senha precisa ter no minímo 5 digitos"}
    if(!(role.test(value))) return {...object, hasErrorInField: true, messageError: "A senha precisa ter letras e números"}

    return {...object, hasErrorInField: false}
}

function validadeHeightAndWeight(value, object){
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

function validateBornDate(value, object){

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

function validateFullName(value, object){
    if(value.length <= 2) return {...object, hasErrorInField: true, messageError: "O deve ter no minímo 3 caracteres"}
    return {...object, hasErrorInField: false}
}

export function validateCheckbox(newData, isChecked, setCheckColor){
    if(!isChecked){
        setCheckColor("text-red-500")
        return newData.isValid = false 
    }else{
        setCheckColor("text-slate-500")
        newData["authorized"] = true
        return newData
    }
}

function validator(fieldValue, field, data){
    const funcs = {
        "email": validateEmail(fieldValue, field),
        "password": validatePassword(fieldValue, field),
        "birthday": validateBornDate(fieldValue, field),
        "height": validadeHeightAndWeight(fieldValue, field),
        "weight": validadeHeightAndWeight(fieldValue, field),
        "name": validateFullName(fieldValue, field)
    }

    const object = funcs[field.id];

    const box = {
        data: data,
        object: object
    }

    if(!object.hasErrorInField){
        box.data[field.id] = field.id === "height" || field.id === "weight" ? parseFloat(fieldValue) : fieldValue;
        return box
    }else{
        box.data.isValid = false;
        return box
    } 
}

export function validateInputsFields(fields, setFields){
    let newFields = [...fields];
    let data = {
        role: "pacient",
        isValid: true
    };

    newFields = newFields.map((f) => {
        const field = document.getElementById(`${f.id}`);

        if(!(field.value.trim())){
            data.isValid = false;
            return {...f, hasErrorInField: true};
        }else{
            const object = validator(field.value, f, data);
            data = object.data;
            return object.object;
        }
    })

    setFields(newFields)
    return data;
}
