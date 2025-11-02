export function maskDate(value, fieldId){
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
