export function maskFullName(value){
    value = value.replace(/[0-9]/g, "");
    return value.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1, word.length)).join(" ")
}