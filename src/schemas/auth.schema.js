import joi from "joi";

const schemaSignUp = joi.object({
    name: joi.string().max(15).empty().trim().required(),
    email: joi.string().email().empty().trim().required(),
    password: joi.string().alphanum().required().min(4).empty().required(),
    confirmPassword: joi.ref("password"),
    cpf: joi.number().empty().required(),
    address: joi.string().empty().trim().required()
})

const schemaSignIn = joi.object({
  email: joi.string().email().empty().trim().required(),
  password: joi.string().alphanum().required().min(4).empty().required(),
});

export { schemaSignUp, schemaSignIn };
