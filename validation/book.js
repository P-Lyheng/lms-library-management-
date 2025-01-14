const Joi = require(`joi`);
    const validator = (schema) => (payload) =>
        schema.validate(payload, { abortEarly: false });
    const bookSchema = Joi.object({
        bookName: Joi.string().required()
        });
module.exports = validator(bookSchema);
