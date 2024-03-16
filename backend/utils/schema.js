const joi = require("joi");

module.exports ={
    RegisterSchema: joi.object({
        name: joi.string().required(),
        email: joi
          .string()
          .email()
          .required(),
        passward: joi.string().required(),
      }),
}