import { handlingFullName } from './handlingFullName'
import { handlingPassword } from './handlingPassword'
import { handlingWeight } from './handlingWeight'
import { handlingBornDate } from './handlingBornDate'
import { handlingEmail } from './handlingEmail'
import { handlingHeight } from './handlingHeight'
import { handlingConfirmCode } from './handlingConfirmCode'


export function validatorHandlers(fieldValue, currentField){

    const dynamicsFunctions = {
        "email": handlingEmail,
        "password": handlingPassword,
        "birthday": handlingBornDate,
        "height": handlingHeight,
        "weight": handlingWeight,
        "name": handlingFullName,
        "confirm-password": handlingConfirmCode
    }

    return dynamicsFunctions[currentField.id](fieldValue, currentField)
}
