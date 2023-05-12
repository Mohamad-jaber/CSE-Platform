
import joi from 'joi'
export const addcourse = {
    body:joi.object().required().keys({
        course_name:joi.string().required().messages({
            'any.required':"plz enter your course_name ",
            'string.empty':"course_name can not be empty"
        }),
        course_type:joi.string().required().messages({
            'any.required':"plz enter your course type",
            'string.empty':"course type can not be empty"
        }),
        course_description:joi.string(),
        
    })

}


export const updatecourse = {
    body:joi.object().required().keys({
        course_name:joi.string().required().messages({
            'any.required':"plz enter your course_name ",
            'string.empty':"course_name can not be empty"
        }),
        course_type:joi.string().required().messages({
            'any.required':"plz enter your course type",
            'string.empty':"course type can not be empty"
        }),
        course_des:joi.string(),
        
    })

}



