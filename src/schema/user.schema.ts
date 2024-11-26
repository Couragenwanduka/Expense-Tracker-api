import Joi from 'joi'

export const SignupSchema = Joi.object({
    firstName: Joi.string().required().messages({
        "string.base": "First name should be a string",
        "string.empty": "First name is required"
    }),
    lastName: Joi.string().required().messages({
        "string.base": "Last name should be a string",
        "string.empty": "Last name is required"
    }),
    email: Joi.string().email().required().messages({
        "string.base": "Email should be a string",
        "string.empty": "Email is required",
        "string.email": "Email is not valid"
    }),
    password: Joi.string().min(8).required().messages({
        "string.base": "Password should be a string",
        "string.empty": "Password is required",
        "string.min": "Password should have at least 8 characters"
    }),
    country:Joi.string().required().messages({
        "string.base": "Country should be a string",
        "string.empty": "Country is required"
    }),
    age: Joi.number().integer().min(10).messages({
        "number.base": "Age should be a number",
        "number.integer": "Age should be an integer",
        "number.min": "Age should be at least 10"
    }),
    gender: Joi.string().valid('Male', 'Female').required().messages({
        "string.base": "Gender should be a string",
        "string.empty": "Gender is required",
        "string.pattern.base": "Gender should be either male or female"
    }),
    dateofbirth: Joi.date().messages({
        "date.base": "Date of birth should be a date",
        "date.invalid": "Date of birth is not valid"
    }),
    yearlyIncome: Joi.number().messages({
        "number.base": "Yearly income should be a number",
        "number.invalid": "Yearly income should be a positive number"
    })
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.base": "Email should be a string",
        "string.empty": "Email is required",
        "string.email": "Email is not valid"
    }),
    password: Joi.string().min(8).required().messages({
        "string.base": "Password should be a string",
        "string.empty": "Password is required",
        "string.min": "Password should have at least 8 characters"
    })
})