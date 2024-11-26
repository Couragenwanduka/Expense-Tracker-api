import express from 'express';
import { validator } from '../middleware/validator';
import { createExpense, updateExpenses, deleteExpenses, filterExpense, getAllExpense  } from '../controllers/expense.controller';
import { expenseSchema } from '../schema/expense.schema';
import { customJoi } from '../schema/category.schema';
import Authorization from '../middleware/validateToken';
const expenseRoute = express.Router();

expenseRoute.post('/', Authorization,[validator(expenseSchema)],createExpense )
expenseRoute.get('/', Authorization, getAllExpense)
expenseRoute.patch('/update/:id', Authorization, updateExpenses )
expenseRoute.delete('/:id',Authorization,[validator(customJoi.objectId(), 'params')], deleteExpenses )
expenseRoute.get('/filter',Authorization, filterExpense)


export default expenseRoute