import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
import 'express-async-errors'; 
import errorHandling from './error/asyncError';
import router from './routes';
import cookieparser from 'cookie-parser';
import connectDb from './config/mongodb';
const app = express();
dotenv.config();
connectDb();

const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use(router);

app.use(errorHandling as (err: any, req: Request, res: Response, next: NextFunction) => void);

app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`);
})