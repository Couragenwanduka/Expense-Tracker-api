import Joi from 'joi';

export const expenseSchema = Joi.object({
    category:Joi.string().required().messages({
        "string.base": "Category should be a string",
        "string.empty": "Category is required"
    }),
    name: Joi.string().required().messages({
        "string.base": "Name should be a string",
        "string.empty": "Name is required"
    }),
    totalUnit: Joi.number().required().messages({
        'number.base': "Total Unit should be a number ",
        'number.empty': "Total Unit is required"
    }),
    price: Joi.number().required().messages({
        'number.base': "Price should be a number ",
        'number.empty': "Price is required"
    }),
    date: Joi.date().messages({
        'date.base': "Date should be a valid date",
        'date.empty': "Date is required"
    })
})