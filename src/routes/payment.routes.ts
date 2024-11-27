import express from 'express';
import { createPaymentIntent, success, failure } from '../controllers/payment.controller';
import { AuthorizationPremium } from '../middleware/validateToken';
const paymentRouter = express.Router();

paymentRouter.post('/', AuthorizationPremium,  createPaymentIntent);
paymentRouter.get('/success', success);
paymentRouter.get('/failure', failure);

export default paymentRouter;
