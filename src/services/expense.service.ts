import Expenses from "../model/expense";
import { Iexpense } from "../interface/expense.interface";

export const saveExpense = async(expense:Iexpense):Promise<void| null> => {
    try{
        const newExpense = new Expenses({
            user:expense.user,
            category:expense.category,
            name:expense.name,
            totalUnit:expense.totalUnit,
            price:expense.price
        })
        await newExpense.save()
    }catch(error){
        console.error('Error occured while saving Expense', error)
        return null
    }
}

export const updateExpense = async(id:string, expense:Partial<Iexpense> ):Promise<Iexpense | null> => {
    try{
        const update = await Expenses.findByIdAndUpdate(id, expense, {new:true})
        return update
    }catch(error){
        console.error('An error occured while updating expense', error)
        return null
    }
}

export const deleteExpense = async(id:string):Promise<null> => {
    try{
        const deleteExpense = await Expenses.findByIdAndDelete(id)
        return null
    }catch(error){
        console.error('An error Occured while deleting expense', error)
        return null
    }

}

export const findingExpensesById = async(id:string): Promise<Iexpense|null> => {
    try{
        const cat = await Expenses.findOne({_id:id})
        return cat
    }catch(error){
        console.error('Error finding Category', error)
        return null
    }
}

export const findExpense = async(filter:Iexpense, skip:any, limit:number) => {
    try{
        const expenses = await Expenses.find(filter).skip(skip).limit(limit);
        return expenses
    }catch(error){
        console.error('An error occured while filting', error)
    }
}
export const findAllExpense = async(skip:any, limit:number) => {
    try{
        const expenses = await Expenses.find().skip(skip).limit(limit).populate('category');
        return expenses
    }catch(error){
        console.error('An error occured while filting', error)
    }
}

