export function maskConfirmCode(value){

    value = value.replace(/\D/g, "")
    if(value.length > 6) return value.slice(0, 6);

    return value;
}
