const Joi = require('joi');
const validator = (scheme)=> (payload)=>{
    return scheme.validate(payload, { abortEarly: false });
}
const authorScheme = Joi.object({
    authorName : Joi.string().required()
})

module.exports = validator(authorScheme)