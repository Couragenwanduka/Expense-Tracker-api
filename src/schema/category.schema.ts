import Joi from 'joi'
import mongoose from 'mongoose'

export const createCategorySchema = Joi.object({
    name: Joi.string().required().messages({
         "string.base": "name should be a string",
        "string.empty": "name is required"
    }),
    description:Joi.string().required().min(2).max(100).messages({
        "string.base": "Description should be a string",
        "string.empty": "Description is required",
        "string.min": "Description should have at least 2 characters",
        "string.max": "Description should have a maximum of 100 characters"
    }),
    isDefault:Joi.boolean()
})

export const customJoi = Joi.extend((joi) => ({
  type: 'objectId',
  base: joi.object({
    id: joi.string()  // Ensure the nested 'id' is a string
  }),
  messages: {
    'objectId.base': '{{#label}} must be a valid ObjectId',
  },
  validate(value, helpers) {
    // Ensure the 'id' field is a string and check if it's a valid ObjectId
    if (typeof value.id !== 'string') {
      return { value, errors: helpers.error('objectId.base') };
    }

    if (!mongoose.isValidObjectId(value.id)) {
      console.log('Invalid ObjectId:', value.id);  // Debug invalid ObjectId case
      return { value, errors: helpers.error('objectId.base') };
    }

    return { value };
  },
}));

