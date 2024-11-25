import express from 'express';
import { validator } from '../middleware/validator';
import { createCategorySchema, customJoi } from '../schema/category.schema'
import { createCategory, updateCategories, deleteACategory } from '../controllers/category.controller';

const categoryRouter = express.Router();

categoryRouter.post('/', [validator(createCategorySchema)] ,createCategory);
categoryRouter.patch('/:id', [validator(customJoi, 'params')], updateCategories)
categoryRouter.delete('/:id', [validator(customJoi, 'params')], deleteACategory)

export default categoryRouter