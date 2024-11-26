import express from 'express';
import { validator } from '../middleware/validator';
import { createCategorySchema, customJoi } from '../schema/category.schema'
import { createCategory, updateCategories, deleteACategory, getAllCategories } from '../controllers/category.controller';
import Authorization from '../middleware/validateToken';

const categoryRouter = express.Router();

categoryRouter.post('/', Authorization,[validator(createCategorySchema)] ,createCategory);
categoryRouter.get('/', getAllCategories)
categoryRouter.patch('/update/:id',Authorization, [validator(customJoi.objectId(), 'params')], updateCategories)
categoryRouter.delete('/:id', Authorization,[validator(customJoi.objectId(), 'params')], deleteACategory)

export default categoryRouter