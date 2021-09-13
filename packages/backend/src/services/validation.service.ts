import Ajv,{Schema} from "ajv"

const validator = new Ajv()

function validate (schema: Schema, data : any): boolean {

  return validator.validate(schema,data)
}

export {validate};