
import joi from 'joi'
export const signup = {
    body:joi.object().required().keys({
        userName:joi.string().required().messages({
            'any.required':"plz enter your user name",
            'string.empty':"username can not be empty"
        }),
        email:joi.string().email().required(),
        password:joi.string().required(),
        // cpassword:joi.string().valid(joi.ref('password')).required(),
    })

}
export const signin = {
    body:joi.object().required().keys({
        email:joi.string().email().required(),
        password:joi.string().required(),
    })

}