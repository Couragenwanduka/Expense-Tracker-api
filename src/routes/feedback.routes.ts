import express from 'express'
import { getFeedback } from '../controllers/algorithm.controller';
const feedbackRoute = express.Router()
import Authorization from '../middleware/validateToken';

feedbackRoute.get('/', Authorization,getFeedback)

export default feedbackRoute