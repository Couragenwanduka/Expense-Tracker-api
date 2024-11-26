import express from 'express';
import userRoute from './user.routes';
import categoryRouter from './category.routes';
import expenseRouter from './expense.routes'
const router = express.Router();

// Mount user routes
router.use('/user', userRoute);
router.use('/category', categoryRouter);
router.use('/expense', expenseRouter);

export default router;
