function firstName(name){
    const firstletter = name.charAt(0).toUpperCase();
    const restname = name.slice(1);
    return firstletter+restname;
}
export function handlingFullname(fullname){
    const arr = fullname.split(" ");
    let text = "";
    for(let i in arr){
        text += firstName(arr[i]);
    }
    return text.replace(/([A-Z])/g, " $1").trim();
}

export function maskFullName(value){
    value.trim();
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
