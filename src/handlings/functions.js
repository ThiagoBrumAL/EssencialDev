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
    if(userYear > date.getFullYear()) return {...object, hasErrorInField: true, messageError: "Ano inválido"}
    if(userMonth < 0 || userMonth > 12) return {...object, hasErrorInField: true, messageError: "Mês inválido"}
    if(!validateAge(userMonth, userYear)) return {...object, hasErrorInField: true, messageError: "A idade miníma é de 18 anos"}

    return {...object, hasErrorInField: false}
}