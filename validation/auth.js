const Joi = require('joi'); 
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);

const validator = (schema)=>(payload)=>{
    return schema.validate(payload, { abortEarly: false });
}

const singupSchema = Joi.object({
    f_name : Joi.string().required(),
    l_name : Joi.string().required(),
    email : Joi.string().email().required(),
    password  : joiPassword.required(),
    //password :  joiPassword.string().minOfSpecialCharacters(2).minOfLowercase(2).minOfUppercase(2).minOfNumeric(2).noWhiteSpaces().onlyLatinCharacters().doesNotInclude(['password']).required(),
    // confirm_password :  joiPassword.string().minOfSpecialCharacters(2).minOfLowercase(2).minOfUppercase(2).minOfNumeric(2).noWhiteSpaces().onlyLatinCharacters().doesNotInclude(['password']).required()
})
const singinSchema= Joi.object({
    email : Joi.string().required(),
    password : Joi.string().required()
})

module.exports ={vSignup :  validator(singupSchema) , vSignin :   validator(singinSchema)}