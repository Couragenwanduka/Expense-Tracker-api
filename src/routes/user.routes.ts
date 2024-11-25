import express from 'express';
import { validator } from '../middleware/validator';
import { SignupSchema, loginSchema } from '../schema/user.schema';
import { createUser, login } from '../controllers/user.controller';


const userRoute = express.Router();

userRoute.post('/', [validator(SignupSchema)],createUser);
userRoute.post('/login', [validator(loginSchema)],login);

export default userRoute;
