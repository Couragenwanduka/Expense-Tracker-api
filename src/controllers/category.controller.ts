import {saveCategory, findingCategory, updateCategory, deleteCategory, findingCategoryById, findAllCategories }from '../services/category.service';
import { Response, Request, NextFunction } from 'express';
import BadRequest from '../error/error';
import {Icategory} from "../interface/category.interface"

// Create Category
export const createCategory = async(req:Request, res:Response, next:NextFunction) => {
   try{
    const {name, description, isDefault} = req.body;

    const exisitingCategoryName = await findingCategory(name)
    if(exisitingCategoryName){
        throw new BadRequest('Category already exists')
    }
    const category: Icategory = {
        name,
        description,
        isDefault
    }
    await saveCategory(category)
    res.status(200).send({message:'Category saved successfully', success: true})
   }catch(error){
    next(error)
   }
}

export const getAllCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Parse skip and limit from query, default to 0 and 20 respectively
      const { skip = 0, limit = 20 } = req.query;
  
      const parsedSkip = parseInt(skip as string);
      const parsedLimit = parseInt(limit as string);
  
      // Fetch categories using the skip and limit values
      const categories = await findAllCategories(parsedSkip, parsedLimit);
  
      // Send response with pagination data
      res.status(200).json({
        success: true,
        page: Math.ceil(parsedSkip / parsedLimit) + 1,  // Calculate current page
        limit: parsedLimit,
        data: categories,  // Return categories data
      });
    } catch (error) {
      next(error);
    }
  };
  
export const updateCategories = async(req:Request, res:Response, next:NextFunction): Promise<void> => {
    try{
        const {id} = req.params;
        const {name, description, isDefault} = req.body;

        const category = await findingCategoryById(id)
        if(!category){
            throw new BadRequest('category not found')
        }

        const updatedData: Partial<Icategory> = {}; // Use Partial to only update the fields that are provided
        if (name) updatedData.name = name;
        if (description) updatedData.description = description;
        if (isDefault !== undefined) updatedData.isDefault = isDefault;

        await updateCategory(id,updatedData)

        res.status(201).send({message:'update successfull'})
    }catch(error){
        next(error)
    }
}

export const deleteACategory = async(req:Request, res:Response, next:NextFunction): Promise<void> => {
    try{
        const {id} = req.params;

        const category = await findingCategoryById(id)
        if(!category){
            throw new BadRequest('category not found')
        }

        if(category.isDefault === true){
            throw new BadRequest('Category can not be deleted')
        }

        await deleteCategory(id)
        
        res.status(200).send({mesaage:'Category deleted successfully'})
    }catch(error){
        next(error)
    }

}