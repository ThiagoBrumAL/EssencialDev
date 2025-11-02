import { handlingFullName } from './handlingFullName'
import { handlingPassword } from './handlingPassword'
import { handlingWeight } from './handlingWeight'
import { handlingBornDate } from './handlingBornDate'
import { handlingEmail } from './handlingEmail'
import { handlingHeight } from './handlingHeight'


export function validatorHandlers(fieldValue, currentField){

    const dynamicsFunctions = {
        "email": handlingEmail,
        "password": handlingPassword,
        "birthday": handlingBornDate,
        "height": handlingHeight,
        "weight": handlingWeight,
        "name": handlingFullName
    }

    return dynamicsFunctions[currentField.id](fieldValue, currentField)
}
