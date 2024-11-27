import { algorithm } from "../algorithm";
import { Request, Response, NextFunction } from "express";
import BadRequest from "../error/error";
import { UserRequest } from "../interface/customType";
import { findExpenseByUserId } from "../services/expense.service";

export const getFeedback = async(req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try{
        const userId = req.user?.user_id as any

        if (!userId) {
         throw new BadRequest('User not found or token is invalid');
        }
        const expenses = await findExpenseByUserId(userId)
        const feedback = await algorithm(expenses);
        res.status(200).send({ message:"success", feedback})
    }catch(error){
        next(error)
    }
}