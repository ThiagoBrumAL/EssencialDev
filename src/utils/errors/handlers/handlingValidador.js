import { handlingFullName } from './handlingFullName'
import { handlingPassword } from './handlingPassword'
import { handlingWeight } from './handlingWeight'
import { handlingBornDate } from './handlingBornDate'
import { handlingEmail } from './handlingEmail'
import { handlingHeight } from './handlingHeight'
import { handlingConfirmCode } from './handlingConfirmCode'
import { handlingConfirmPassword } from './handlingConfirmPassword'


export function validatorHandlers(fieldValue, currentField, fields){

    const dynamicsFunctions = {
        "email": handlingEmail,
        "password": handlingPassword,
        "birthday": handlingBornDate,
        "height": handlingHeight,
        "weight": handlingWeight,
        "name": handlingFullName,
        "confirmationCode": handlingConfirmCode,
        "newPassword": handlingConfirmPassword
    }

    return dynamicsFunctions[currentField.id](fieldValue, currentField, fields)
}
