export function maskPassword(value){
    if(value.length > 20) return value.slice(0, 20);
    return value;
}
