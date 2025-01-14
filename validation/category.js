const Joi = require("joi");
const validator = (schema)=>(payload)=>{
    return schema.validate(payload, { abortEarly: false });
}
const categorySchema = Joi.object({
    categoryName : Joi.string().required()

})
module.exports = validator(categorySchema)