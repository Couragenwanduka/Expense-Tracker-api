import { saveExpense,  updateExpense, deleteExpense, findExpense, findingExpensesById, findAllExpense } from '../services/expense.service';
import { Response, Request, NextFunction } from 'express';
import BadRequest from '../error/error';
import { Iexpense } from '../interface/expense.interface';
import { findingCategoryById } from '../services/category.service';
import { UserRequest } from '../interface/customType';


export const createExpense = async(req: UserRequest, res:Response, next:NextFunction):Promise<void> => {
    try{
        const {category, name, totalUnit, price , date} = req.body;
        const userId = req.user?.user_id as any

        if (!userId) {
         throw new BadRequest('User not found or token is invalid');
        }

        const categoryFound = await findingCategoryById(category)
        if(!categoryFound){
            throw new BadRequest('Invalid category')
        }

        const expense:Iexpense = {
            user: userId,
            category,
            name,
            totalUnit,
            price,
            date
        }
        await saveExpense(expense)
        res.status(200).send({message:"Expense saved successfully"})
    }catch(error){
        next(error)
    }
} 

export const updateExpenses = async(req:Request, res:Response, next:NextFunction):Promise<void> => {
    try{
        const {id} =  req.params
        const {category, name, totalUnit, price , date} = req.body;
        console.log(category, name, totalUnit, price)
      
        const expense = await findingExpensesById(id)
        if(!expense){
            throw new BadRequest('Unable to find expense')
        }

        const upatedExpense: Partial<Iexpense> = {}

        if(category) upatedExpense.category = category
        if(name)upatedExpense.name = name
        if(totalUnit) upatedExpense.totalUnit = totalUnit
        if(price) upatedExpense.price = price
        if(date) upatedExpense.date = date
 
        await updateExpense(id,upatedExpense)
        
        res.status(201).send({message:"update successful"})
    }catch(error){
        next(error)
    }
}

export const deleteExpenses = async(req:Request, res:Response, next:NextFunction):Promise<void> => {
    try{
        const {id} = req.params

        await deleteExpense(id)
        res.status(201).send({
            message:"expense deleted successfully"
        })
    }catch(error){
        next(error)
    }
}

export const filterExpense = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { category, minAmount, maxAmount, startDate, endDate, limit = 20, page = 1 } = req.query;
  
      // Build dynamic filter object
      const filter: any = {};
  
      if (category) {
        filter.category = category;
      }
  
      if (minAmount || maxAmount) {
        filter.price = {};
        if (minAmount) filter.price.$gte = parseFloat(minAmount as string);
        if (maxAmount) filter.price.$lte = parseFloat(maxAmount as string);
      }
  
      if (startDate || endDate) {
        filter.date = {};
        if (startDate) filter.date.$gte = new Date(startDate as string);
        if (endDate) filter.date.$lte = new Date(endDate as string);
      }
  
      // Parse pagination parameters
      const parsedLimit = Math.max(1, parseInt(limit as string)); // Ensure at least 1 item per page
      const parsedPage = Math.max(1, parseInt(page as string));   // Ensure page is at least 1
      const skip = (parsedPage - 1) * parsedLimit;
  
      // Fetch filtered expenses with pagination
      const expenses = await findExpense(filter, skip, parsedLimit);
  
      res.status(200).json({
        success: true,
        page: parsedPage,
        limit: parsedLimit,
        data: expenses,
      });
    } catch (error) {
      next(error);
    }
  };

  export const getAllExpense = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const {limit = 20, page = 1 } = req.query;

        const parsedLimit = Math.max(1, parseInt(limit as string)); // Ensure at least 1 item per page
        const parsedPage = Math.max(1, parseInt(page as string));   // Ensure page is at least 1
        const skip = (parsedPage - 1) * parsedLimit;

        const list = await findAllExpense(skip, parsedLimit);
        
        res.status(200).send({data:list, success:true})
    }catch(error){
        next(error)
    }
  }
  