export function validateBornDate(fieldValue, currentField){

    const date = new Date();

    function validateAge(month, year){
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth() + 1;
        
        let currentAge = currentYear - year;
        if(currentMonth < month){
            currentAge -=1
        }

        return currentAge >= 18 ? true : false;
    }


    const userBornDate = fieldValue.split("/")

    const userBornMonth = userBornDate[1]
    const userBornYear = userBornDate[2]

    if(fieldValue.length <= 9) return {...currentField, hasErrorInField: true, messageError: "Formato inválido"}

    if(userBornYear > date.getFullYear() || userBornYear < 1950) return {...currentField, hasErrorInField: true, messageError: "Ano inválido"}

    if(userBornMonth <= 0 || userBornMonth > 12) return {...currentField, hasErrorInField: true, messageError: "Mês inválido"}

    if(!validateAge(userBornMonth, userBornYear)) return {...currentField, hasErrorInField: true, messageError: "A idade miníma é de 18 anos"}

    return {...currentField, hasErrorInField: false}
}