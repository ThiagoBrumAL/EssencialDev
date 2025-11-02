export function showMessageRecoverEmail(fields, setFields){

    const field = fields[0];
    let time = 60

    setFields([{
        ...field, 
        hasErrorInField: true, 
        disabled: true, 
        messageError: `Aguarde ${time}s para enviar outra solicitação`
    }])

    let interval = setInterval(() => {

        time--

        if(time > 0){

            setFields([{
                ...field,
                hasErrorInField: true, 
                disabled: true, 
                messageError: `Aguarde ${time}s para enviar outra solicitação`
            }])

        }else{

            clearInterval(interval);
            setFields([{
                ...field, 
                hasErrorInField: false, 
                disabled: false,
                messageError: ""
            }])

        }
    }, 1000)
} 