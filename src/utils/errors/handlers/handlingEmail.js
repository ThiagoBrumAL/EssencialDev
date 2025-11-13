export function handlingEmail(fieldValue, currentField, fields = null){

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
        "@tutanota.com",
        "@a.fecaf.com.br"
    ]

    let symbolCharacter = fieldValue.indexOf("@");
    let currentProvider = fieldValue.slice(symbolCharacter, fieldValue.length);

    if(!providers.includes(currentProvider)) return {...currentField, hasErrorInField: true, messageError: "Provedor inválido"};

    return {...currentField, hasErrorInField: false, messageError: ""}
}